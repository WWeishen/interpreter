
#include <string>
#include <unordered_map>
#include <thread>
#include <mutex>
#include <iostream>
#include <chrono>
#include "../utils/LockingQueue.hpp"

using namespace std::chrono_literals;

class Void{
};

std::unordered_map<std::string, void*> sigma;
std::mutex sigma_mutex;  // protects sigma

void functioninit5Variable(){
	sigma.set("Variable0_0_0_10currentValue",new Number());//A1
}
void function7initializeVar(){
	let Variable0_0_0_101376 = 1; //undefined
	
                sigma.set("Variable0_0_0_10currentValue", new Number(Variable0_0_0_101376))
}
void functioninit9Variable(){
	sigma.set("Variable1_0_1_10currentValue",new Number());//A1
}
void function11initializeVar(){
	let Variable1_0_1_101376 = 4; //undefined
	
                sigma.set("Variable1_0_1_10currentValue", new Number(Variable1_0_1_101376))
}
Number function16accessVarRef(){
	let VarRef2_5_2_71579 = new Number(sigma.get("Variable0_0_0_10currentValue"));//currentValue}
	VarRef2_5_2_7terminates =  VarRef2_5_2_71579;
	return VarRef2_5_2_7terminates;
}
void function18executeAssignment2(Number resRight){
	let  Assignment2_0_2_72520 = resRight; // was Assignment2_0_2_72354; but using the parameter name now
	                                 
                sigma.set("Variable1_0_1_10currentValue", new Number(Assignment2_0_2_72520))
}

int main() {
    functioninit5Variable();
function7initializeVar();
functioninit9Variable();
function11initializeVar();
Number result16accessVarRef = function16accessVarRef();
function18executeAssignment2(result16accessVarRef);

    //WARNING !! temporary code to test
    for(auto entry : sigma){
        std::cout << entry.first << " : " << *((int*)entry.second) << std::endl;
    }
}
    