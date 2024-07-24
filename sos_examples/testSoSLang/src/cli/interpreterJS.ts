import fs from 'fs';
import {  CompositeGeneratorNode, toString } from 'langium';
import path from 'path';
import { Model } from '../language-server/generated/ast';
import { extractDestinationAndName } from './cli-util';
import { CCFGVisitor } from './generated/testFSE';
import { CCFG, ContainerNode,/* Edge,*/ Node, TypedElement } from '../ccfg/ccfglib';
import {  TempValueList/*,TempValue,StackTempList*/ } from './TempValueList';
//import chalk from 'chalk';

class Stack {
    fork: number[];                             //number of the fork children
    //resRight : number[];                        //value outside of a fork
    forkNode : Node[];                        //node uid
    tempValueList : TempValueList<number>;      //value inside of a fork
    tempPromiseFunction :  TempValueList<(()=>Promise<void>)>;
    tempChildren : TempValueList<Node>;          //node.uid
    tempFunction : TempValueList<(...args: any[]) => any>;
    

    constructor() {
        this.fork = [];
        this.forkNode = [];
        //this.resRight = [];
        this.tempValueList = new TempValueList<number>();
        this.tempPromiseFunction = new TempValueList<(()=>Promise<void>)>;
        this.tempChildren = new TempValueList<Node>();
        this.tempFunction = new TempValueList<(...args: any[]) => any>;
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
        await visitAllNodes(ccfg.initialState,sigma,stack);
    } 
    //console.log(sigma);
    //console.log(stack);
    
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
async function visitAllNodes(initialState : Node , sigma: Map<string, any>, stack: Stack){
    var currentNode : Node = initialState;
    while(currentNode.outputEdges && ((currentNode.outputEdges[0] && currentNode.outputEdges[0].to) || (currentNode.outputEdges[1] && currentNode.outputEdges[1].to))){
        let node = currentNode;
        if(node.uid == 27){
            console.log("hihi");
        }
        switch(node.getType()){
            case "Step":{
                console.log(node.uid + ": (" + node.getType() + ")->");
                if(node.functionsDefs.length > 0){
                    nodeCode(node,sigma,stack);//define function written in node; call function & store function value
                }
                currentNode = node.outputEdges[0].to;
                if((stack.forkNode.length!=0) && (node.uid == stack.forkNode[stack.forkNode.length-1].uid -1)){ //the end point of a fork
                    stack.tempChildren.last().list.pop();
                    if(stack.tempChildren.last().list.length > 0){//check if we are in a fork node
                        // go back to fork node
                        currentNode = stack.forkNode[stack.forkNode.length-1];
                        /*await visitAllNodes(stack.forkNode[stack.forkNode.length-1],sigma,stack).then(function(){
                            return;
                        });*/
                    }else{//check if we have visited all children of the current fork
                        stack.forkNode.pop();                       //if yes, get out of the current fork
                        stack.fork.pop();
                        stack.tempChildren.reduce();
                    }
                }
                /*
                else{
                    if(node.cycles.length!=0){
                        currentNode = node.outputEdges[0].to;
                    }
                }
                */
                break;
            }
            case "Fork":{//define forks' children
                console.log(node.uid + ": (" + node.getType() + ")->");
                
                //console.log("the length of the current fork:"+ forkList[forkList.length-1]); //nombre of the children which are not executed of the current fork
                let forklist = stack.forkNode;
                if( forklist[forklist.length-1] == undefined || stack.forkNode[forklist.length-1].uid != node.uid ){ //the 1st time to visit this fork node
                    let children = currentNode.outputEdges;
                    stack.tempValueList.addTempValue(children.length);         //reserve places in stack : value
                    stack.tempPromiseFunction.addTempValue(children.length);   //reserve places in stack : Promise
                    stack.tempFunction.addTempValue(children.length);          //reserve places in stack : Function
                    stack.tempChildren.addTempValue(children.length);
                    stack.fork.push(children.length);                          //get in the fork
                    stack.forkNode.push(node);                                 //start node's uid  

                    children.forEach(element => {                               //copy chidren list
                        let nextNode = element.to; 
                        stack.tempChildren.addValueLast(nextNode);
                    });
                }

                //visit children (sub-tree)
                if(stack.tempChildren.last().list.length != 0){
                    currentNode = stack.tempChildren.last().list[stack.tempChildren.last().list.length-1];
                }else{
                    return;
                }

                break;
            }
            case "AndJoin":{//reduce (fork children) & call function difined which are store in the stack
                console.log(node.uid + ": (" + node.getType() + ")->");
                await handleJoinNode(stack,node,sigma).then(function(){
                    currentNode = node.outputEdges[0].to;
                });
                break;
            }
            
            /*
            case "Choice":{
                console.log(node.uid + ": (" + node.getType() + ")->");
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
                console.log(node.uid + ": (" + node.getType() + ")->");
                let promiseList = stack.tempPromiseFunction;
                if(node.cycles.length!=0 && promiseList.getLength()!=0){
                    //let cycle = node.cycles;
                    //let next = cycle[0][1];// begin.uid = 39
                    //visitAllNodes(next,sigma,stack);
                    //let end = cycle[cycle.length-1];//end.uid = 18
                    defineAsyncFunction(promiseList);           //call promiseList 
                    stack.tempPromiseFunction.reduce();
                    stack.tempValueList.reduce();

                    stack.tempPromiseFunction.addTempValue(stack.fork[stack.fork.length-1]);
                    stack.tempValueList.addTempValue(stack.fork[stack.fork.length-1]);
                }
                currentNode = node.outputEdges[0].to;
                break;
            }*/
        }

    }
    console.log(sigma);
}

//evaluate the functions that are in the nodes
//define function; the defined function takes sigma and a list of number as parametre.
function defineFunction(functionName: string, functionParamList: TypedElement[], functionBody: string[], sigma: Map<any, any>): (...args: any[]) => any {
    return new Function('sigma', 'liste', `return function ${functionName}(liste) {
        ${functionParamList.reverse().map((param, index) => `let ${param.name} = liste[${index}];\n`).join('')}
        ${functionBody.join('\n')}
        \n}`)(sigma);
}

/*
//define a async function for Fork (return type is not void): add value in stack
function definePromise(stack : Stack , f: (param:number[]) => any , parm : number[] ): () => Promise<void>{
    return () => new Promise<void>((resolve) => {
        console.log("Promise created, it return " + f(parm));
        stack.tempValueList.addValueLast(f(parm));
        resolve();
    });
}

//define a async function for Fork (return type is void): evaluation function
function definePromiseVoid( f: (param:number[]) => void , parm : number[]): () => Promise<void>{
    console.log("param valeur: " + parm);
    let param = [...parm];
    return () => new Promise<void>((resolve) => {
        console.log("Promise created ");
        console.log("param valeur in promise: " + param);
        f(param);
        resolve();
    });
}


//lancer/call Promise obj(s) which are stored in a tempValueList
function defineAsyncFunction(functionList: TempValueList<(()=>Promise<void>)>) {
    let promiseList = functionList.last().list;
    console.log( promiseList.length + " Promise objects raised");
    //await Promise.all(promiseList.map(promiseFn => promiseFn()));
    return Promise.all(promiseList.map(promiseFn => promiseFn()));
}
*/   


//code: define function; decide where we store the value & how to call the functions : depends on (if node in a fork/ node is a joinNode)  
/*function nodeCode(node:Node,sigma:Map<string,any>,stack:Stack):void{
    let functionName="function" + node.functionsNames[0];
    let f = defineFunction(functionName,node.params,node.functionsDefs,sigma);
            if(node.returnType!= "void"){//store the Temp Value 
                let tempValueL = stack.tempPromiseFunction;
                if((stack.fork.length == 0) ){//when we are not in a fork   // && (stack.fork[stack.fork.length-1]==0)
                    console.log(functionName + " return " + f());
                    if(node.params.length < 1){
                        //stack.resRight.push(f());
                        stack.tempValueList.addTempValue(1);
                        stack.tempValueList.addValueLast(f());
                    }else{
                        console.log(f());
                    }
                }
                else if((node.getType() == "AndJoin") && (tempValueL.getLength()!=0) && (!tempValueL.isWaiting())){//when we are in a fork, all the children are executed
                    joinNode(node,sigma,stack);
                }
                else{//when we are in the children of a fork
                    //let promise = definePromise(stack,f,[]);
                    //tempValueL.addValueLast(promise);
                    stack.tempFunction.addValueLast(f);
                }
            }
            else{//return type is void
                let tempValueL = stack.tempPromiseFunction;
                if((stack.fork.length ==0) || (stack.fork[stack.fork.length-1]==0)){//when we are not in a fork
                    let parm = stack.tempValueList.last();//get value list from stack
                    console.log(f(parm));
                    stack.tempValueList.reduce();//clean stack
                }
                else if((tempValueL.getLength()!=0) && (!tempValueL.isWaiting())){//when we are in a fork, all the children are executed; node 31/46
                    joinNode(node,sigma,stack);
                }
                else{//when we are in the children of a fork
                    let parm = stack.tempValueList;//get value list from stack
                    stack.tempFunction.addValueLast(f(parm))
                    
                    //let promise = definePromiseVoid(f,parm);
                    //tempValueL.addValueLast(promise);
                    stack.tempValueList.reduce();//clean stack
                }

            }
}
*/


function nodeCode(node:Node,sigma:Map<string,any>,stack:Stack):void{
    let functionName="function" + node.functionsNames[0];
    let f = defineFunction(functionName,node.params,node.functionsDefs,sigma);
    let tempValueL = stack.tempFunction;

    if((stack.fork.length != 0) ){
        tempValueL.addValueLast(f);
    }else{
        //not in a fork, call function 
        if(node.params.length < 1){         //call function without params
            if(node.returnType == "void" ){
                console.log(f());
            }
        }
        else{                               //call function with params

            if(node.returnType == "void"){
                let param = stack.tempValueList.last().list;
                console.log(f(param));
                stack.tempValueList.reduce();
            }else{//store returned value
                stack.tempValueList.addTempValue(1);
                let param = stack.tempValueList.last();
                stack.tempValueList.addValueLast(f(param));
                stack.tempValueList.reduce();
            }
        }
    }
}

//If the Andjoin node in a fork or not!**********************************************************************
/*
function joinNode(node:Node,sigma:Map<string,any>,stack:Stack):void{
    if(node.functionsDefs.length!=0){
        let functionName="function" + node.functionsNames[0];
        let f = defineFunction(functionName,node.params,node.functionsDefs,sigma);
        let l = stack.tempValueList.last().list;
        console.log(functionName + " return " + f(l))
        stack.tempValueList.addValueLast(f(l))
    }
}

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

/**************************************Asycn********************************************/
/*
//When call function : no any parameter, function return type == void -> call function
function waitVoid(fList:TempValueList<(...args: any[]) => any>) {
    return new Promise<void>(function(resolve) {
        let flist = fList.last().list;
        flist.map((f => f()))
        resolve();
    });
}

//When call function : no any parameter, function return type != void -> call function; add function resultat in temp list
function wait(fList:TempValueList<(...args: any[]) => any>, tempParam:TempValueList<number>) {
    return new Promise<void>(function(resolve) {
        let flist = fList.last().list;
        flist.map((f => tempParam.addTempValue(f())))
        resolve();
    });
}

//When call function: with parametre which is a list, function return type == void -> call function
function waitParamVoid(fList:TempValueList<(...args: any[]) => any>, paramList: TempValueList<any>) {
    return new Promise<void>(function(resolve) {
        let list = fList.last().list;
        let plist = paramList.last().list;
        if (list.length !== plist.length) {
            throw new Error("Function definition list and parameter list must have the same length");
        }
        list.map((f, index) => f(plist[index]));
        resolve();
    });
}
*/
//When call function: with parametre which is a list, function return type != void -> call function; add function resultat in temp list
function waitParam(fList:TempValueList<(...args: any[]) => any>, paramList: number[][], tempfunctionValue:TempValueList<number>) {
    return new Promise<void>(function(resolve) {
        console.log("yes0");
        let list = fList.last().list;
        //list.map((f, index) => (tempfunctionValue.addValueLast(f(paramList[index]))));
        list.map((f, index) => {
            if(f(paramList[index]) != undefined){
                tempfunctionValue.addValueLast(f(paramList[index]));
                console.log("yes1 : function return "+ f(paramList[index]));
            }else{
                console.log(f(paramList[index]));
                console.log("yes2 : function type void");
            }   
        }
        );
        resolve();
    });
}

//with function list
async function handleJoinNode(stack:Stack,node:Node,sigma:Map<string,any>) {
    let forkList: number[] = stack.fork;
    forkList[forkList.length - 1]--;
    
    if(forkList[forkList.length-1]==0 ){//have visited all children of the current fork
        let functionList = stack.tempFunction;
        let paramListPromise:number[][]=[];
        stack.tempValueList.last().list.forEach(element => {
            paramListPromise.push([element]);
        });

        await waitParam(functionList, paramListPromise, stack.tempValueList).then(function(){//call children s fonctions; resultat stroed in stack
            console.log("yes3");
            stack.tempFunction.reduce();
            if (node.functionsDefs.length != 0){
                let functionName="function" + node.functionsNames[0];
                let f = defineFunction(functionName,node.params,node.functionsDefs,sigma);
                let paramList = [...stack.tempValueList.last().list];
                stack.tempValueList.reduce();
                if(f(paramList) != undefined){
                    //stack.tempValueList.addTempValue(1);
                    stack.tempValueList.addValueLast(f(paramList));
                }else{
                    console.log(f(paramList));
                }
            }
        });
    } 
}