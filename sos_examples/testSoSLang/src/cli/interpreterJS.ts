import fs from 'fs';
import {  CompositeGeneratorNode, toString } from 'langium';
import path from 'path';
import { Model } from '../language-server/generated/ast';
import { extractDestinationAndName } from './cli-util';
import { CCFGVisitor } from './generated/testFSE';
import { CCFG, ContainerNode, Node, TypedElement } from '../ccfg/ccfglib';
//import chalk from 'chalk';

export function interpretfromCCFG(model: Model, filePath: string, targetDirectory: string | undefined): string{
    const data = extractDestinationAndName(filePath, targetDirectory);

    const generatedDotFilePath = `${path.join(data.destination, data.name)}.dot`;
    const dotFile = new CompositeGeneratorNode();

    let ccfg = doGenerateCCFG(dotFile, model);
    //interpret(ccfg);

    const sigma: Map<string, any> = new Map<string, any>();
    const temp: Map<string, any> = new Map<string, any>();
    visitAllNodes(ccfg,temp,sigma);
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

// browse the ccfg
function visitAllNodes(ccfg : CCFG, temp: Map<string, any>, sigma: Map<string, any>){

    if(ccfg.initialState){
        let currentNode : Node = ccfg. initialState;
        while(currentNode.outputEdges && currentNode.outputEdges[0] && currentNode.outputEdges[0].to){
        let node = currentNode;
        switch(node.getType()){
            case "Step":{
                if(node.functionsDefs.length > 0){
                    stepNode(node,temp,sigma);
                }
                break;
            }
            case "Fork":{//uid=18;
                //forkNode(node);
                break;
            }
            break;
        }
        currentNode = currentNode.outputEdges[0].to;
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
function stepNode(node:Node,temp:Map<string,any>,sigma:Map<string,any>){
    let functionName="function" + node.functionsNames[0];
            if(node.returnType!= "void"){
                let f = defineFunction(functionName,node.params,node.functionsDefs,sigma);
                if(!temp.get("resRight")){
                    temp.set("resRight",f()) ;
                } 
                else{
                    temp.set("resRight1",f());
                }
                //let n = temp.get("resRight");
                //console.log(n);
            }
            else{
                let f = defineFunction(functionName,node.params,node.functionsDefs,sigma);  
                //console.log(f(...liste));
                let parm = temp.get("resRight");
                temp.delete("resRight");
                console.log(f(parm));
            }
}


/*
async function forkNode(node:Node){
    //const resultat1 = await f();
    //console.log(resultat1);
    let functionName = "function"+ node.outputEdges[0].to.functionsNames;
    const res = await  eval(`${functionName}()`);
}

function f(){
    return ;
}*/



//main
//interpret(ccfg);
//console.log(sigma);