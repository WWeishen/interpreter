import fs from 'fs';
import {  CompositeGeneratorNode, toString } from 'langium';
import path from 'path';
import { Model } from '../language-server/generated/ast';
import { extractDestinationAndName } from './cli-util';
import { CCFGVisitor } from './generated/testFSE';
import { CCFG, ContainerNode, Node, TypedElement } from '../ccfg/ccfglib';
import { TempValueList } from './TempValueList';
//import chalk from 'chalk';

class Memory {
    fork: number[]
    resRight : number[]
    tempValueList : TempValueList;

    constructor() {
        this.fork = [];
        this.resRight = [];
        this.tempValueList = new TempValueList();
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
            case "Fork":{
                console.log(node.uid+": ("+ node.getType() + ")->");
                let children = currentNode.outputEdges;
                memory.tempValueList.addTempValue(children.length);
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
                    memory.tempValueList.reduce();
                    currentNode = node.outputEdges[0].to;
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
                    //get resRight
                    let resRight: number = memory.resRight[0];
                    //get code from: "(VarRef3_4_3_6terminates == true)"
                    let edgeLable: string = edge.guards[0];
                    let match = edgeLable.match(/\((.*?)\)/);    //"VarRef3_4_3_6terminates == true"
                    let code: string| null = match ? match[1] : null;
                    let varName: string | null = null;
                    //get variable name
                    if (code) {
                        let parts = code.split('==');
                        if (parts[0]){
                            //var varName : string = parts[0].trim();
                            varName = parts[0].trim();
                        }
                    }//                                                 let ${varName} = ${resRight};\n
                    let bool : boolean = eval(`
                                                if(${resRight} > 0){
                                                    ${varName} = 1;\n
                                                }else{
                                                    ${varName} = 0;\n
                                                }\n
                                              ${code};
                    `)
                    if (bool) {
                        nodeTrue = edge.to;
                    } 
                    else {
                        nodeFalse = edge.to;
                    }
                });
                //get value in memory.resRight :
                if(nodeTrue && nodeFalse){
                    if (memory.resRight[0]){//false
                        currentNode = nodeTrue;//next node is the false node
                    }
                    else {
                        currentNode = nodeFalse;//next node is the true node
                    }
                    memory.resRight.pop();
                }
                else{
                    console.log("trueNode | flaseNode doesn't existe at node.uid ="+ node.uid);
                    return;
                }
                break;
            }
            case "OrJoin":{
                console.log(node.uid+": ("+ node.getType() + ")->");
                currentNode = node.outputEdges[0].to;
                break;
            }
        }   
    }
}

//evaluate the functions that are in the nodes
/*
function defineFunction(functionName :string ,functionParamList : TypedElement[] ,functionBody:string[], sigma: Map<any, any>): (...args: any[]) => any {
    let params = functionParamList.map(item => item.name);
    return new Function('sigma',...params,`return function  ${functionName} (${params}) {\n
        ${functionBody.join('\n')}
        \n}`)(sigma);
}*/
function defineFunction(functionName: string, functionParamList: TypedElement[], functionBody: string[], sigma: Map<any, any>): (...args: any[]) => any {
    return new Function('sigma', 'liste', `return function ${functionName}(liste) {
        ${functionParamList.reverse().map((param, index) => `let ${param.name} = liste[${index}];\n`).join('')}
        ${functionBody.join('\n')}
        \n}`)(sigma);
}

//Node type
function stepNode(node:Node,sigma:Map<string,any>,memory:Memory):void{
    let functionName="function" + node.functionsNames[0];
            if(node.returnType!= "void"){
                let f = defineFunction(functionName,node.params,node.functionsDefs,sigma);
                let tempValueL = memory.tempValueList;
                if(memory.fork.length ==0 || memory.fork[memory.fork.length-1]==0){//when we are not in a fork
                    console.log(functionName + "return " + f());
                    memory.resRight.push(f());
                }
                else if((tempValueL.length!=0) && (!tempValueL.isWating())){//when we are in a fork, all the children are executed
                    console.log(functionName + "return " + f());
                    memory.resRight.push(f());
                }
                
                else{//when we are in the children of a fork
                    console.log(functionName + "return " + f());
                    //tempValueL.last
                    tempValueL.addValueLast(f());
                }
            }
            else{
                let f = defineFunction(functionName,node.params,node.functionsDefs,sigma);  
                let parm = memory.resRight;
                console.log(f(parm));
                memory.resRight.pop();
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
    let l = memory.tempValueList.last().list;
    memory.resRight.push(f(l));

    /*let n = l.list.length;
    let param = new Map<string,number>();
    for(let i=0;i<n;i++){
        let key:string = "n" + i+1;
        param.set(key,l.list[n]);
    }
    
        
        let parm1 = memory.tempValueList.last().last();
        memory.tempValueList.last().list.pop();
        let parm2 = memory.tempValueList.last().last();
    console.log(functionName + "return " + f(parm1,parm2));
    memory.resRight=f(parm1,parm2);*/

    //console.log("value resRight:"+memory.resRight);
    return ;
}