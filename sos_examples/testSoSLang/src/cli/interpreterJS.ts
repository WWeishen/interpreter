import fs from 'fs';
import {  CompositeGeneratorNode, toString } from 'langium';
import path from 'path';
import { Model } from '../language-server/generated/ast';
import { extractDestinationAndName } from './cli-util';
import { CCFGVisitor } from './generated/testFSE';
import { CCFG, ContainerNode, Node, TypedElement } from '../ccfg/ccfglib';
import { CoupleList } from './coupleList';
//import chalk from 'chalk';


let cl = new CoupleList();
cl.addCouple()

class Memory {
    //numberOfParam: number
    fork: number[]
    resRight : number
    coupleN1N2 : CoupleList;

    constructor() {
        //return this;
        //this.numberOfParam= 1;
        this.fork = [];
        this.resRight = NaN;
        this.coupleN1N2 = new CoupleList();
    }
}

export function interpretfromCCFG(model: Model, filePath: string, targetDirectory: string | undefined): string{
    const data = extractDestinationAndName(filePath, targetDirectory);

    const generatedDotFilePath = `${path.join(data.destination, data.name)}.dot`;
    const dotFile = new CompositeGeneratorNode();

    let ccfg = doGenerateCCFG(dotFile, model);

    const sigma: Map<string, any> = new Map<string, any>();
    const memory= new Memory();
    if(ccfg.initialState){
        visitAllNodes(ccfg.initialState,sigma,memory);
    } 
    console.log(sigma);
    console.log(memory);
    
    if (!fs.existsSync(data.destination)) {
        fs.mkdirSync(data.destination, { recursive: true });
    }
    fs.writeFileSync(generatedDotFilePath, toString(dotFile));
    return generatedDotFilePath;
}


function doGenerateCCFG(codeFile: CompositeGeneratorNode, model: Model): CCFG {
    var visitor = new CCFGVisitor();
    let [res] = visitor.visit(model);

    var ccfg = (res as ContainerNode).internalccfg;
   
    ccfg.addSyncEdge()

    ccfg.detectCycles();
    ccfg.collectCycles()

    codeFile.append(ccfg.toDot());
    return ccfg;
}

// browse the ccfg sart with a given node

function visitAllNodes(initialState : Node , sigma: Map<string, any>, memory: Memory):void{
        var currentNode : Node = initialState;
        //while|| (currentNode.outputEdges[1] && currentNode.outputEdges[1].to)
        while(currentNode.outputEdges && ((currentNode.outputEdges[0] && currentNode.outputEdges[0].to) || (currentNode.outputEdges[1] && currentNode.outputEdges[1].to))){
        let node = currentNode;
        switch(node.getType()){
            case "Step":{
                console.log(node.uid+": ("+ node.getType() + ")->");
                if(node.functionsDefs.length > 0){
                    stepNode(node,sigma,memory);
                }
                currentNode = node.outputEdges[0].to;
                break;
            }
            case "Fork":{//uid=15;
                console.log(node.uid+": ("+ node.getType() + ")->");
                let children = currentNode.outputEdges;
                memory.coupleN1N2.addCouple();
                memory.fork.push(children.length);
                //console.log("the length of the current fork:"+ forkList[forkList.length-1]); //nombre of the children which are not executed of the current fork
                forkNode(currentNode,sigma,memory);// visit children nodes
                return;
                //break;
            }
            case "AndJoin":{
                console.log(node.uid+": ("+ node.getType() + ")->");
                let forkList : number[] = memory.fork;
                forkList[forkList.length-1] --;
                //console.log("#rest of current fork'children"+ forkList[forkList.length-1]);//nombre of the children which are not executed of the current fork
                if(forkList[forkList.length-1]==0 ){
                    forkList.pop();
                    if(node.functionsDefs.length!=0){
                        joinNode(node, sigma, memory);//assg of resRight
                    }
                    memory.coupleN1N2.reduce();
                    currentNode = node.outputEdges[0].to;
                    //return ;
                }
                else{
                    return;
                }
                break;
            }

            case "Choice":{
                console.log(node.uid+": ("+ node.getType() + ")->");
                // have to verify the true node and false node
                let nodeTrue : Node | undefined;
                let nodeFalse : Node | undefined;
                node.outputEdges.forEach(edge => {
                    let edgeLable = edge.guards;
                    if (edgeLable[0].includes("true")) {
                        nodeTrue = edge.to;
                    } 
                    else {
                        nodeFalse = edge.to;
                    }
                }); 

                //get value in memory.resRight :
                if(nodeTrue && nodeFalse){
                    if (isNaN(memory.resRight)){//false
                        currentNode = nodeFalse;//next node is the false node
                    }
                    else{
                        currentNode = nodeTrue;//next node is the true node
                    }
                    memory.resRight = NaN;
                } 

                break;
            }
            case "OrJoin":{
                console.log(node.uid+": ("+ node.getType() + ")->");
                currentNode = node.outputEdges[0].to;
                break;
            }
            //break;
        }
        
    }
}

//evaluate the functions that are in the nodes
function defineFunction(functionName :string ,functionParamList : TypedElement[] ,functionBody:string[], sigma: Map<any, any>): (...args: any[]) => any {
    let params = functionParamList.map(item => item.name);
    return new Function('sigma',...params,`return function  ${functionName} (${params}) {\n
        ${functionBody.join('\n')}
        \n}`)(sigma);
}

//Node type
function stepNode(node:Node,sigma:Map<string,any>,memory:Memory):void{
    let functionName="function" + node.functionsNames[0];
            if(node.returnType!= "void"){
                let f = defineFunction(functionName,node.params,node.functionsDefs,sigma);
                let couplel = memory.coupleN1N2;
                if(couplel.length == 0){ //when we are not in a fork
                    memory.resRight=f();
                }
                else if(!couplel.isNull()){//when we are in a fork, all the children are executed
                    memory.resRight=f();
                }
                else{//when we are in the children of a fork
                    if(!couplel.last().n1){//children left
                        couplel.last().n1=f();
                    }
                    else{//children right
                        couplel.last().n2=f();
                        //console.log(couplel.list);
                    }
                }
            }
            else{
                let f = defineFunction(functionName,node.params,node.functionsDefs,sigma);  
                let parm = memory.resRight;
                memory.resRight = NaN;
                console.log(f(parm));
            }
}

function forkNode(currentNode:Node,sigma:Map<string,any>,memory:Memory): void{
    currentNode.outputEdges.forEach(element => {
        let nextNode = element.to; 
        visitAllNodes(nextNode,sigma,memory);
    });
    return ;
}

function joinNode(node:Node,sigma:Map<string,any>,memory:Memory):void{
    let functionName="function" + node.functionsNames[0];
    let f = defineFunction(functionName,node.params,node.functionsDefs,sigma);  
    let parm1 = memory.coupleN1N2.last().n1;
    let parm2 = memory.coupleN1N2.last().n2;
    memory.resRight=f(parm1,parm2);
    //console.log("value resRight:"+memory.resRight);
    return ;
}
