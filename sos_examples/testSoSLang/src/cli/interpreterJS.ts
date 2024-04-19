import fs from 'fs';
import {  CompositeGeneratorNode, toString } from 'langium';
import path from 'path';
import { Model } from '../language-server/generated/ast';
import { extractDestinationAndName } from './cli-util';
import { CCFGVisitor } from './generated/testFSE';
import { CCFG, ContainerNode, Node, TypedElement } from '../ccfg/ccfglib';
//import chalk from 'chalk';

class ExecutionState {
    numberOfParam: number = 1
    fork: number[] = []
    resRight : number = NaN
    n1 : number = NaN
    n2 : number = NaN 

    constructor() {
        return this;
    }
}

export function interpretfromCCFG(model: Model, filePath: string, targetDirectory: string | undefined): string{
    const data = extractDestinationAndName(filePath, targetDirectory);

    const generatedDotFilePath = `${path.join(data.destination, data.name)}.dot`;
    const dotFile = new CompositeGeneratorNode();

    let ccfg = doGenerateCCFG(dotFile, model);

    const sigma: Map<string, any> = new Map<string, any>();
    const executionState= new ExecutionState();
    //const executionState : Map <string, any> =new Map<string, any>();
    //executionState.set("numberOfParam", 1);
    if(ccfg.initialState){
        visitAllNodes(ccfg.initialState,sigma,executionState);
    } 
    console.log(sigma);
    
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
function visitAllNodes(initialState : Node , sigma: Map<string, any>, executionState: ExecutionState):void{
        var currentNode : Node = initialState;
        while(currentNode.outputEdges && currentNode.outputEdges[0] && currentNode.outputEdges[0].to){
        let node = currentNode;
        switch(node.getType()){
            case "Step":{
                if(node.functionsDefs.length > 0){
                    stepNode(node,sigma,executionState);
                }
                currentNode = currentNode.outputEdges[0].to;
                break;
            }
            case "Fork":{//uid=18;
                let children = currentNode.outputEdges;
                executionState.numberOfParam = children.length;
                executionState.fork.push(children.length);
                let forkList : number[] = executionState.fork;
                console.log("the length of the current fork:**"+ forkList[forkList.length-1]); //nombre of the children which are not executed of the current fork
                forkNode(currentNode,sigma,executionState);// visit all children node
                return;
                //break;

            }
            case "AndJoin":{
                //let forkList : number[] = executionState.get("fork");
                let forkList : number[] = executionState.fork;
                forkList[forkList.length-1] --;
                console.log(forkList[forkList.length-1]);//nombre of the children which are not executed of the current fork
                if(forkList[forkList.length-1]==0){
                    forkList.pop();
                    if(executionState.fork.length<1){
                        joinNode(node,sigma,executionState);
                        executionState.numberOfParam=1;
                        currentNode= currentNode.outputEdges[0].to;
                    }
                    //return ;
                }
                else{
                    return;
                }
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
function stepNode(node:Node,sigma:Map<string,any>,executionState:ExecutionState){
    let functionName="function" + node.functionsNames[0];
            if(node.returnType!= "void"){
                let f = defineFunction(functionName,node.params,node.functionsDefs,sigma);
                if(executionState.numberOfParam==1){
                    executionState.resRight=f() ;
                }
                else{//nombre of the param >= 2
                    if(!executionState.n1){
                        executionState.n1=f();
                    }
                    else{
                        executionState.n2=f();
                    }
                }
                //let n = sigma.get("resRight");
                //console.log(n);
            }
            else{
                let f = defineFunction(functionName,node.params,node.functionsDefs,sigma);  
                //console.log(f(...liste));
                let parm = executionState.resRight;
                sigma.delete("resRight");
                console.log(f(parm));
            }
}

function forkNode(currentNode:Node,sigma:Map<string,any>,executionState:ExecutionState): void{
    currentNode.outputEdges.forEach(element => {
        let nextNode = element.to; 
        visitAllNodes(nextNode,sigma,executionState);
    });
    return ;
}

function joinNode(node:Node,sigma:Map<string,any>,executionState:ExecutionState):void{
    let functionName="function" + node.functionsNames[0];
    let f = defineFunction(functionName,node.params,node.functionsDefs,sigma);  
    let parm1 = executionState.n1;
    let parm2 = executionState.n2;
    executionState.n1 = NaN;
    executionState.n2 = NaN;
    executionState.resRight=f(parm1,parm2);
    return ;
}
/*
async function forkNode(sigma:Map<string,any>,currentNode:Node): Promise<void> {
    await Promise.all([
        new Promise<void>((resolve) => {
            // branch left
            if (sigma.get("n1") !== undefined) {
                currentNode = currentNode.outputEdges[1].to;
                resolve();
            } else {
                // branch left
                const interval1 = setInterval(() => {
                    if (sigma.get("n1") !== undefined) {
                        clearInterval(interval1);
                        currentNode = currentNode.outputEdges[1].to;
                        resolve();
                    }
                }, 100);
            }
        }),
        new Promise<void>((resolve) => {
            // branch right
            if (sigma.get("n2") !== undefined) {
                resolve();
            } else {
                // brach right
                const interval2 = setInterval(() => {
                    if (sigma.get("n2") !== undefined) {
                        clearInterval(interval2);
                        resolve();
                    }
                }, 100);
            }
        })
    ]);
    console.log("All children fork are executed.");
}
*/

//main
//interpret(ccfg);
//console.log(sigma);

/*****test***
async function stepNode1(node:Node, temp:Map<string,any>, sigma:Map<string,any>) {
    let functionName = "function" + node.functionsNames[0];
    if (node.returnType !== "void") {
        let f = defineFunction(functionName, node.params, node.functionsDefs, sigma);
        if (temp.get("numberOfParam") === 1) {
            temp.set("resRight", f());
        } else {
            if (!temp.get("n1")) {
                const listener = () => {
                    temp.set("n1", f());
                    emitter.removeListener("n1", listener);
                };
                emitter.once("n1", listener);
            } else {
                temp.set("n2", await f()); 
            }
        }
    } else {
        let f = defineFunction(functionName, node.params, node.functionsDefs, sigma);
        let parm = temp.get("resRight");
        temp.delete("resRight");
        console.log(f(parm));
    }
}

async function forkNode1(temp:Map<string,any>, currentNode:Node ) {
    await Promise.all([
        new Promise<void>((resolve) => {
            if (temp.get("n1") !== undefined) {
                currentNode = currentNode.outputEdges[1].to;
                resolve();
            } else {
                emitter.once("n1", () => {
                    currentNode = currentNode.outputEdges[1].to;
                    resolve();
                });
            }
        }),
        new Promise<void>((resolve) => {
            if (temp.get("n2") !== undefined) {
                resolve();
            } else {
                emitter.once("n2", () => {
                    resolve();
                });
            }
        })
    ]);
    console.log("All children fork are executed.");
}*/