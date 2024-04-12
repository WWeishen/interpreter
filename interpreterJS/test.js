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


global.sigma = new Map();

//function declare

sigma.set("Variable0_0_0_10currentValue",1);
//console.log(sigma.get("Variable0_0_0_10currentValue"));

//function assignment
let functionName= "function20accessVarRef";
let functionParamList=[];
let functionBody=[
  "let VarRef2_5_2_71579 = new Number(sigma.get(\"Variable0_0_0_10currentValue\"));//currentValue}",
  "let VarRef2_5_2_7terminates =  VarRef2_5_2_71579;",
  "return VarRef2_5_2_7terminates;",
]
callFunction(functionName,functionParamList,functionBody);

let f = defineFunction("zaza",[],['return 1'])
let n = f();
console.log(n)
/*
function anonymous() {
  let VarRef3_5_3_71579 = new Number(sigma.get("Variable0_0_0_10currentValue"));
  let VarRef3_5_3_7terminates =  VarRef3_5_3_71579;
  return VarRef3_5_3_7terminates;//a number
  
}
console.log(anonymous())*/
