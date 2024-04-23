
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
	sigma["Variable0_0_0_10currentValue"] = new int();
}
void function7initializeVar(){
	int Variable0_0_0_101376 = 1; //undefined
	//TODO: fix this and avoid memory leak by deleting, constructing appropriately
                const std::lock_guard<std::mutex> lock(sigma_mutex);
                (*((int*)sigma["Variable0_0_0_10currentValue"])) = Variable0_0_0_101376;
}
void functioninit9Variable(){
	sigma["Variable1_0_1_10currentValue"] = new int();
}
void function11initializeVar(){
	int Variable1_0_1_101376 = 0; //undefined
	//TODO: fix this and avoid memory leak by deleting, constructing appropriately
                const std::lock_guard<std::mutex> lock(sigma_mutex);
                (*((int*)sigma["Variable1_0_1_10currentValue"])) = Variable1_0_1_101376;
}
void functioninit13Variable(){
	sigma["Variable2_0_2_11currentValue"] = new int();
}
void function15initializeVar(){
	int Variable2_0_2_111376 = 42; //undefined
	//TODO: fix this and avoid memory leak by deleting, constructing appropriately
                const std::lock_guard<std::mutex> lock(sigma_mutex);
                (*((int*)sigma["Variable2_0_2_11currentValue"])) = Variable2_0_2_111376;
}
int function24accessVarRef(){
	const std::lock_guard<std::mutex> lock(sigma_mutex);
	int VarRef4_8_4_101579 = *(int *) sigma["Variable2_0_2_11currentValue"];//currentValue}
	int VarRef4_8_4_10terminates =  VarRef4_8_4_101579;
	return VarRef4_8_4_10terminates;
}
int function27accessVarRef(){
	const std::lock_guard<std::mutex> lock(sigma_mutex);
	int VarRef4_13_4_151579 = *(int *) sigma["Variable0_0_0_10currentValue"];//currentValue}
	int VarRef4_13_4_15terminates =  VarRef4_13_4_151579;
	return VarRef4_13_4_15terminates;
}
bool function29finishIntGreater(int n2, int n1){
	int IntGreater4_7_4_166996 = n2;
	int IntGreater4_7_4_167020 = n1;
	int IntGreater4_7_4_167148 = n1; // was IntGreater4_7_4_167020; but using the parameter name now
	int IntGreater4_7_4_167153 = n2; // was IntGreater4_7_4_166996; but using the parameter name now
	bool IntGreater4_7_4_167148 = IntGreater4_7_4_167148 > IntGreater4_7_4_167153;
	bool IntGreater4_7_4_16terminates =  IntGreater4_7_4_167148;
	return IntGreater4_7_4_16terminates;
}
int function39accessVarRef(){
	const std::lock_guard<std::mutex> lock(sigma_mutex);
	int VarRef6_9_6_111579 = *(int *) sigma["Variable1_0_1_10currentValue"];//currentValue}
	int VarRef6_9_6_11terminates =  VarRef6_9_6_111579;
	return VarRef6_9_6_11terminates;
}
void function41executeAssignment2(int resRight){
	int Assignment6_4_6_112520 = resRight; // was Assignment6_4_6_112354; but using the parameter name now
	//TODO: fix this and avoid memory leak by deleting, constructing appropriately
                const std::lock_guard<std::mutex> lock(sigma_mutex);                                    
                (*((int*)sigma["Variable0_0_0_10currentValue"])) = Assignment6_4_6_112520;
}
int function46accessVarRef(){
	const std::lock_guard<std::mutex> lock(sigma_mutex);
	int VarRef7_9_7_111579 = *(int *) sigma["Variable2_0_2_11currentValue"];//currentValue}
	int VarRef7_9_7_11terminates =  VarRef7_9_7_111579;
	return VarRef7_9_7_11terminates;
}
void function48executeAssignment2(int resRight){
	int Assignment7_4_7_112520 = resRight; // was Assignment7_4_7_112354; but using the parameter name now
	//TODO: fix this and avoid memory leak by deleting, constructing appropriately
                const std::lock_guard<std::mutex> lock(sigma_mutex);                                    
                (*((int*)sigma["Variable1_0_1_10currentValue"])) = Assignment7_4_7_112520;
}

int main() {
    functioninit5Variable();
function7initializeVar();
functioninit9Variable();
function11initializeVar();
functioninit13Variable();
function15initializeVar();

        LockingQueue<Void> queue50;
            {

            Void fakeParam50;
            queue50.push(fakeParam50);
                
           goto queue50;
            }
queue50: //or join node
        Void OrJoinPopped_50;
        queue50.waitAndPop(OrJoinPopped_50);
        
            LockingQueue<int> queue29;
            std::thread thread24([&](){
int result24accessVarRef = function24accessVarRef();
{

            queue29.push(result24accessVarRef);
                }

            });
            thread24.detach();
                
            std::thread thread27([&](){
int result27accessVarRef = function27accessVarRef();
{

            queue29.push(result27accessVarRef);
                }

            });
            thread27.detach();
                
        //start of and join node
        
        int AndJoinPopped_29_0;
        queue29.waitAndPop(AndJoinPopped_29_0);
            
        int AndJoinPopped_29_1;
        queue29.waitAndPop(AndJoinPopped_29_1);
            bool result29finishIntGreater = function29finishIntGreater(AndJoinPopped_29_0, AndJoinPopped_29_1);

        //end of and join node
        
        bool IntGreater4_7_4_16terminates = n2;//Choice node
        if((bool)IntGreater4_7_4_16terminates == true){int result39accessVarRef = function39accessVarRef();
function41executeAssignment2(result39accessVarRef);
int result46accessVarRef = function46accessVarRef();
function48executeAssignment2(result46accessVarRef);
{

            Void fakeParam50;
            queue50.push(fakeParam50);
                
           goto queue50;
            }

            //END IF (bool)IntGreater4_7_4_16terminates == true
        }
            //Choice node
        if((bool)IntGreater4_7_4_16terminates == false){
            //END IF (bool)IntGreater4_7_4_16terminates == false
        }
            
    //WARNING !! temporary code to test
    for(auto entry : sigma){
        std::cout << entry.first << " : " << *((int*)entry.second) << std::endl;
    }
}
    