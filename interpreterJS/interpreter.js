import ccfg from './generateJSON.js';

// browse the ccfg
function visitAllNodes(ccfg){
    let currentNode = ccfg. initialState;
    while(currentNode.outputEdges && currentNode.outputEdges[0] && currentNode.outputEdges[0].to){
        let node = currentNode;
        if(node.functionsDefs.length >0){
            if(node.returnType!= "void"){
                //stocker dans mémoire et passer pour un paramètre
                let f= defineFunction(node.functionsNames,node.params,node.functionsDefs); 
                temp.set("resRight",f()) ;
                //let n = temp.get("resRight");
                //console.log(n);
            }
            else{
                let f = defineFunction(node.functionsNames,node.params,node.functionsDefs);  
                //console.log(f(...liste));
                let parm = temp.get("resRight");
                temp.delete("resRight");
                console.log(f(parm));
            }
        }
        
        currentNode = currentNode.outputEdges[0].to;
    }
}

//interpret 
function interpret(ccfg){
    global.sigma = new Map();
    global.temp = new Map();
    visitAllNodes(ccfg);
    return ;
}


//evaluate the functions that are in the nodes
function defineFunction(functionName,functionParamList,functionBody){
    //var params = functionParamList.join(', ');
    let params = functionParamList.map(item => item.name);
    let s = functionBody.join('\n');
    functionName = new Function(params, s);
    return functionName;
}

function callFunction(functionName,functionParamList,functionBody){
    let f= defineFunction(functionName,functionParamList,functionBody);    
    console.log(f());
}

//main
interpret(ccfg);
console.log(sigma);




/*
//f = defineFunction("zaza",[],'return "toto"')
//console.log("zazazazazazazazazazaz    "+f())

//f = defineFunction("zaza",["str","str2"],'return "toto"+"str"+"str2"')
//console.log("zazazazazazazazazazaz    "+f("titi","toto"))

//f = defineFunction("zaza",["int1","int2"],'return int1+int2')
//console.log("zazazazazazazazazazaz    "+f(1,2))






/*var variables={};
function defineVariable(variableName) {
    variables[variableName] = undefined;
    //sigma.set(variableName,undefined);
}
    
function isVariableDefined(variableName) {
    return variables.hasOwnProperty(variableName);
    //return sigma.has(variableName);
}
    
function assignVariable(variableName, value) {
    if(isVariableDefined(variableName)){
        variables[variableName] = value;
    }
    else{
        console.log(variableName + " is not defined");
    }
}

function accessVariable(variableName){
    if(isVariableDefined(variableName)){
        return variables[variableName];
    }
    else{
        console.log(variableName + " is not defined");
    }
}*/


