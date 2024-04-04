import ccfg from './generateJSON.js';

// browse the ccfg
function visitAllNodes(ccfg){
    let currentNode = ccfg. initialState;
    while(currentNode.outputEdges && currentNode.outputEdges[0] && currentNode.outputEdges[0].to){
        let node = currentNode;
        if(node.functionsDefs.length >0){
            callFunction(node.functionsNames,node.params,node.functionsDefs);
            //console.log(sigma);
        }
        currentNode = currentNode.outputEdges[0].to;
    }
}

//interpret 
function interpret(ccfg){
    global.sigma = new Map();
    visitAllNodes(ccfg);
    return ;
}


//evaluate the functions that are in the nodes
function defineFunction(functionName,functionParamList,functionBody){
    var params = functionParamList.join(', ');
    let s = functionBody.join('');
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


