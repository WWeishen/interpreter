
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
void functioninit13Variable(){
	sigma.set("Variable2_0_2_10currentValue",new Number());//A1
}
void function15initializeVar(){
	let Variable2_0_2_101376 = 0; //undefined
	
                sigma.set("Variable2_0_2_10currentValue", new Number(Variable2_0_2_101376))
}

int main() {
    functioninit5Variable();
function7initializeVar();
functioninit9Variable();
function11initializeVar();
functioninit13Variable();
function15initializeVar();

    //WARNING !! temporary code to test
    for(auto entry : sigma){
        std::cout << entry.first << " : " << *((int*)entry.second) << std::endl;
    }
}
    