import fs from 'fs';
import {  CompositeGeneratorNode, toString } from 'langium';
import path from 'path';
import { Model } from '../language-server/generated/ast';
import { extractDestinationAndName } from './cli-util';
import { CCFGVisitor } from './generated/testFSE';
import { CCFG, ContainerNode, Edge, Node, TypedElement } from '../ccfg/ccfglib';
import { TempValueList } from './TempValueList';
//import chalk from 'chalk';

class Stack {
    fork: number[];
    forkName : number[];  //node uid
    resRight : number[];
    tempValueList : TempValueList<number>;
    tempPromiseFunction :  TempValueList<(()=>Promise<void>)>;

    constructor() {
        this.fork = [];
        this.forkName = [];
        this.resRight = [];
        this.tempValueList = new TempValueList<number>();
        this.tempPromiseFunction = new TempValueList<(()=>Promise<void>)>();
    }
}

export async function interpretfromCCFG(model: Model, filePath: string, targetDirectory: string | undefined): Promise<string>{
    const data = extractDestinationAndName(filePath, targetDirectory);

    const generatedDotFilePath = `${path.join(data.destination, data.name)}.dot`;
    const dotFile = new CompositeGeneratorNode();

    let ccfg = doGenerateCCFG(dotFile, model);

    const sigma: Map<string, any> = new Map<string, any>();
    const stack= new Stack();
    if(ccfg.initialState){
        visitAllNodes(ccfg.initialState,sigma,stack);
    } 
    console.log(sigma);
    console.log(stack);
    
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
async function visitAllNodes(initialState : Node , sigma: Map<string, any>, stack: Stack):Promise<void>{
        var currentNode : Node = initialState;
        while(currentNode.outputEdges && ((currentNode.outputEdges[0] && currentNode.outputEdges[0].to) || (currentNode.outputEdges[1] && currentNode.outputEdges[1].to))){
        let node = currentNode;
        switch(node.getType()){
            case "Step":{
                console.log(node.uid+": ("+ node.getType() + ")->");
                if((node.uid == stack.forkName[stack.forkName.length - 1 ] -1 )){//end fork node
                    if(stack.fork[stack.fork.length-1]==0){//have visited all children of the current fork
                        stack.forkName.pop();                //get out of the current fork
                        stack.fork.pop();                  //get out of the current fork
                    }
                    else{
                        return;
                    }
                }
                if(node.functionsDefs.length > 0){
                    stepNode(node,sigma,stack);
                }
                currentNode = node.outputEdges[0].to;
                break;
            }
            case "Fork":{
                console.log(node.uid+": ("+ node.getType() + ")->");
                let children = currentNode.outputEdges;
                stack.tempValueList.addTempValue(children.length);//reserve places in stack
                stack.tempPromiseFunction.addTempValue(children.length);//reserve places in stack : Proise
                stack.fork.push(children.length);                 // get in the fork
                //stack.forkName.push(extractBetween(node.value,"start","ForkNode"));   //Plus
                stack.forkName.push(node.uid);   //Plus
                //console.log("the length of the current fork:"+ forkList[forkList.length-1]); //nombre of the children which are not executed of the current fork
                forkNode(currentNode,sigma,stack);// visit children nodes
                return;
            }
            case "AndJoin":{
                console.log(node.uid+": ("+ node.getType() + ")->");
                let forkList : number[] = stack.fork;
                forkList[forkList.length-1] --;
                //console.log("#rest of current fork'children"+ forkList[forkList.length-1]);//nombre of the children which are not executed of the current fork
                if(forkList[forkList.length-1]==0 ){ //have visited all children of the current fork
                    //forkList.pop();                  //get out of the current fork
                    /*if(node.functionsDefs.length!=0){
                        await joinNode(node, sigma, memory).then(()=>{});//assg of resRight
                    }
                    memory.tempValueList.reduce(); //clean memory
                    currentNode = node.outputEdges[0].to;*/
                    if(node.functionsDefs.length!=0){
                        joinNode(node, sigma, stack);
                    }
                    stack.tempPromiseFunction.reduce();
                    stack.tempValueList.reduce();
                }
                currentNode = node.outputEdges[0].to; 
                break;
            }
            case "Choice":{
                console.log(node.uid+": ("+ node.getType() + ")->");
                let nodeTrue : Node | undefined;
                let nodeFalse : Node | undefined;
                //get resRight
                let resRight: number = stack.resRight[stack.resRight.length-1];
                //evaluation of each edge of choice
                node.outputEdges.forEach(edge => {
                    let bool: boolean = evaluateEdgeLable(edge,resRight);
                    if (bool) {
                        nodeTrue = edge.to;
                    } 
                    else {
                        nodeFalse = edge.to;
                    }
                });
                //decide what is the next node accroding to the value of resRight
                if(nodeTrue && nodeFalse){
                    if (stack.resRight[stack.resRight.length-1]){//if resRight
                        currentNode = nodeTrue;//next node is the false node
                    }
                    else {
                        currentNode = nodeFalse;//next node is the true node
                    }
                    stack.resRight.pop();
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
//define function; the defined function takes sigma and a list of number as parametre.
function defineFunction(functionName: string, functionParamList: TypedElement[], functionBody: string[], sigma: Map<any, any>): (...args: any[]) => any {
    return new Function('sigma', 'liste', `return function ${functionName}(liste) {
        ${functionParamList.reverse().map((param, index) => `let ${param.name} = liste[${index}];\n`).join('')}
        ${functionBody.join('\n')}
        \n}`)(sigma);
}

//define a async function
function definePromise(stack : Stack , f: () => any ): () => Promise<void>{
    return () => new Promise<void>((resolve) => {
        console.log("Promise return " + f());
        stack.tempValueList.addValueLast(f());
        resolve();
    });
}

/*async function defineAsyncFunction1(functionList: TempValueList<()=>Promise<void>>): Promise<void> {
    for (const fn of functionList.last().list) {
        await fn();
        //console.log("yes promise");
    }
}*/

function defineAsyncFunction(functionList: TempValueList<()=>Promise<void>>) {
    let promiseList = functionList.last().list
    return Promise.all(promiseList.map(promiseFn => promiseFn()));
}

//Node type
function stepNode(node:Node,sigma:Map<string,any>,stack:Stack):void{
    let functionName="function" + node.functionsNames[0];
            if(node.returnType!= "void"){//store the Temp Value 
                let f = defineFunction(functionName,node.params,node.functionsDefs,sigma);
                let tempValueL = stack.tempPromiseFunction;
                if(stack.fork.length ==0 || stack.fork[stack.fork.length-1]==0){//when we are not in a fork
                    console.log(functionName + " return " + f());
                    stack.resRight.push(f());
                }
                else if((tempValueL.getLength()!=0) && (!tempValueL.isWaiting())){//when we are in a fork, all the children are executed
                    console.log(functionName + " return " + f());
                    stack.resRight.push(f()); //valeur d'un "fork entire" donne à un autre fork
                }
                
                else{//when we are in the children of a fork
                    console.log("Promise : " + functionName + " return " + f());
                    let promise = definePromise(stack,f);
                    tempValueL.addValueLast(promise);
                }
            }
            else{
                let f = defineFunction(functionName,node.params,node.functionsDefs,sigma);  
                let parm = stack.resRight;//get value list from stack
                console.log(f(parm));
                stack.resRight.pop();//clean stack
            }
}

async function forkNode(currentNode:Node,sigma:Map<string,any>,stack:Stack): Promise<void>{
    currentNode.outputEdges.forEach(element => {
        let nextNode = element.to; 
        visitAllNodes(nextNode,sigma,stack);
    });
    return ;
}


function joinNode(node:Node,sigma:Map<string,any>,stack:Stack):void{
    let functionName="function" + node.functionsNames[0];
    let promiseList = stack.tempPromiseFunction;
    defineAsyncFunction(promiseList)
    let f = defineFunction(functionName,node.params,node.functionsDefs,sigma);
    let l = stack.tempValueList.last().list;
    stack.resRight.push(f(l))
    
}
/*
async function joinNode(node:Node,sigma:Map<string,any>,stack:Stack):Promise<void>{
    let functionName="function" + node.functionsNames[0];
    let promiseList = stack.tempPromiseFunction;
    
    await defineAsyncFunction(promiseList).then(()=>{
        let f = defineFunction(functionName,node.params,node.functionsDefs,sigma);
        let l = stack.tempValueList.last().list;
        stack.resRight.push(f(l))
        stack.tempPromiseFunction.reduce();
        stack.tempValueList.reduce();
        return ;
    });
}*/

function evaluateEdgeLable(edge : Edge, resRight:number):boolean{
    //get code from: "(VarRef3_4_3_6terminates == true)"
    let edgeLable: string = edge.guards[0];
    let match = edgeLable.match(/\((.*?)\)/);    //"VarRef3_4_3_6terminates == true"
    let code: string| null = match ? match[1] : null;
    let varName: string | null = null;
    //get variable name "VarRef3_4_3_6terminates"
    if (code) {
        let parts = code.split('==');
        if (parts[0]){
            varName = parts[0].trim();
        }
    }
    let bool : boolean = eval(`
        if(${resRight} > 0){
        ${varName} = 1;\n
        }else{
            ${varName} = 0;\n
        }\n
        ${code};
        `)
    return bool;
}

/*
function extractBetween(str: string, start: string, end: string): string {
    const startIndex = str.indexOf(start);
    const endIndex = str.indexOf(end, startIndex + start.length);
    return str.substring(startIndex + start.length, endIndex);
}*/