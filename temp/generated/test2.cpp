
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
	int Variable1_0_1_101376 = 4; //undefined
	//TODO: fix this and avoid memory leak by deleting, constructing appropriately
                const std::lock_guard<std::mutex> lock(sigma_mutex);
                (*((int*)sigma["Variable1_0_1_10currentValue"])) = Variable1_0_1_101376;
}
void functioninit13Variable(){
	sigma["Variable2_0_2_10currentValue"] = new int();
}
void function15initializeVar(){
	int Variable2_0_2_101376 = 0; //undefined
	//TODO: fix this and avoid memory leak by deleting, constructing appropriately
                const std::lock_guard<std::mutex> lock(sigma_mutex);
                (*((int*)sigma["Variable2_0_2_10currentValue"])) = Variable2_0_2_101376;
}
int function29accessVarRef(){
	const std::lock_guard<std::mutex> lock(sigma_mutex);
	int VarRef4_18_4_201579 = *(int *) sigma["Variable0_0_0_10currentValue"];//currentValue}
	int VarRef4_18_4_20terminates =  VarRef4_18_4_201579;
	return VarRef4_18_4_20terminates;
}
int function32accessVarRef(){
	const std::lock_guard<std::mutex> lock(sigma_mutex);
	int VarRef4_13_4_151579 = *(int *) sigma["Variable0_0_0_10currentValue"];//currentValue}
	int VarRef4_13_4_15terminates =  VarRef4_13_4_151579;
	return VarRef4_13_4_15terminates;
}
int function34finishPlus(int n2, int n1){
	int Plus4_12_4_214267 = n2;
	int Plus4_12_4_214292 = n1;
	int Plus4_12_4_214411 = n1; // was Plus4_12_4_214292; but using the parameter name now
	int Plus4_12_4_214416 = n2; // was Plus4_12_4_214267; but using the parameter name now
	int Plus4_12_4_214410 = Plus4_12_4_214411 + Plus4_12_4_214416;
	int Plus4_12_4_21terminates =  Plus4_12_4_214410;
	return Plus4_12_4_21terminates;
}
void function35executeAssignment2(int resRight){
	int Assignment4_7_4_212520 = resRight; // was Assignment4_7_4_212354; but using the parameter name now
	//TODO: fix this and avoid memory leak by deleting, constructing appropriately
                const std::lock_guard<std::mutex> lock(sigma_mutex);                                    
                (*((int*)sigma["Variable1_0_1_10currentValue"])) = Assignment4_7_4_212520;
}
int function44accessVarRef(){
	const std::lock_guard<std::mutex> lock(sigma_mutex);
	int VarRef5_18_5_201579 = *(int *) sigma["Variable1_0_1_10currentValue"];//currentValue}
	int VarRef5_18_5_20terminates =  VarRef5_18_5_201579;
	return VarRef5_18_5_20terminates;
}
int function47accessVarRef(){
	const std::lock_guard<std::mutex> lock(sigma_mutex);
	int VarRef5_13_5_151579 = *(int *) sigma["Variable1_0_1_10currentValue"];//currentValue}
	int VarRef5_13_5_15terminates =  VarRef5_13_5_151579;
	return VarRef5_13_5_15terminates;
}
int function49finishPlus(int n2, int n1){
	int Plus5_12_5_214267 = n2;
	int Plus5_12_5_214292 = n1;
	int Plus5_12_5_214411 = n1; // was Plus5_12_5_214292; but using the parameter name now
	int Plus5_12_5_214416 = n2; // was Plus5_12_5_214267; but using the parameter name now
	int Plus5_12_5_214410 = Plus5_12_5_214411 + Plus5_12_5_214416;
	int Plus5_12_5_21terminates =  Plus5_12_5_214410;
	return Plus5_12_5_21terminates;
}
void function50executeAssignment2(int resRight){
	int Assignment5_7_5_212520 = resRight; // was Assignment5_7_5_212354; but using the parameter name now
	//TODO: fix this and avoid memory leak by deleting, constructing appropriately
                const std::lock_guard<std::mutex> lock(sigma_mutex);                                    
                (*((int*)sigma["Variable1_0_1_10currentValue"])) = Assignment5_7_5_212520;
}
int function60accessVarRef(){
	const std::lock_guard<std::mutex> lock(sigma_mutex);
	int VarRef7_5_7_71579 = *(int *) sigma["Variable0_0_0_10currentValue"];//currentValue}
	int VarRef7_5_7_7terminates =  VarRef7_5_7_71579;
	return VarRef7_5_7_7terminates;
}
int function63accessVarRef(){
	const std::lock_guard<std::mutex> lock(sigma_mutex);
	int VarRef7_11_7_131579 = *(int *) sigma["Variable2_0_2_10currentValue"];//currentValue}
	int VarRef7_11_7_13terminates =  VarRef7_11_7_131579;
	return VarRef7_11_7_13terminates;
}
bool function65finishIntEqual(int n2, int n1){
	int IntEqual7_4_7_146253 = n2;
	int IntEqual7_4_7_146277 = n1;
	int IntEqual7_4_7_146403 = n1; // was IntEqual7_4_7_146277; but using the parameter name now
	int IntEqual7_4_7_146409 = n2; // was IntEqual7_4_7_146253; but using the parameter name now
	bool IntEqual7_4_7_146403 = IntEqual7_4_7_146403 == IntEqual7_4_7_146409;
	bool IntEqual7_4_7_14terminates =  IntEqual7_4_7_146403;
	return IntEqual7_4_7_14terminates;
}
int function79accessVarRef(){
	const std::lock_guard<std::mutex> lock(sigma_mutex);
	int VarRef9_15_9_171579 = *(int *) sigma["Variable0_0_0_10currentValue"];//currentValue}
	int VarRef9_15_9_17terminates =  VarRef9_15_9_171579;
	return VarRef9_15_9_17terminates;
}
int function82accessVarRef(){
	const std::lock_guard<std::mutex> lock(sigma_mutex);
	int VarRef9_10_9_121579 = *(int *) sigma["Variable1_0_1_10currentValue"];//currentValue}
	int VarRef9_10_9_12terminates =  VarRef9_10_9_121579;
	return VarRef9_10_9_12terminates;
}
int function84finishPlus(int n2, int n1){
	int Plus9_9_9_184267 = n2;
	int Plus9_9_9_184292 = n1;
	int Plus9_9_9_184411 = n1; // was Plus9_9_9_184292; but using the parameter name now
	int Plus9_9_9_184416 = n2; // was Plus9_9_9_184267; but using the parameter name now
	int Plus9_9_9_184410 = Plus9_9_9_184411 + Plus9_9_9_184416;
	int Plus9_9_9_18terminates =  Plus9_9_9_184410;
	return Plus9_9_9_18terminates;
}
void function85executeAssignment2(int resRight){
	int Assignment9_4_9_182520 = resRight; // was Assignment9_4_9_182354; but using the parameter name now
	//TODO: fix this and avoid memory leak by deleting, constructing appropriately
                const std::lock_guard<std::mutex> lock(sigma_mutex);                                    
                (*((int*)sigma["Variable1_0_1_10currentValue"])) = Assignment9_4_9_182520;
}
int function99accessVarRef(){
	const std::lock_guard<std::mutex> lock(sigma_mutex);
	int VarRef12_15_12_171579 = *(int *) sigma["Variable0_0_0_10currentValue"];//currentValue}
	int VarRef12_15_12_17terminates =  VarRef12_15_12_171579;
	return VarRef12_15_12_17terminates;
}
int function102accessVarRef(){
	const std::lock_guard<std::mutex> lock(sigma_mutex);
	int VarRef12_10_12_121579 = *(int *) sigma["Variable1_0_1_10currentValue"];//currentValue}
	int VarRef12_10_12_12terminates =  VarRef12_10_12_121579;
	return VarRef12_10_12_12terminates;
}
int function104finishPlus(int n2, int n1){
	int Plus12_9_12_184267 = n2;
	int Plus12_9_12_184292 = n1;
	int Plus12_9_12_184411 = n1; // was Plus12_9_12_184292; but using the parameter name now
	int Plus12_9_12_184416 = n2; // was Plus12_9_12_184267; but using the parameter name now
	int Plus12_9_12_184410 = Plus12_9_12_184411 + Plus12_9_12_184416;
	int Plus12_9_12_18terminates =  Plus12_9_12_184410;
	return Plus12_9_12_18terminates;
}
void function105executeAssignment2(int resRight){
	int Assignment12_4_12_182520 = resRight; // was Assignment12_4_12_182354; but using the parameter name now
	//TODO: fix this and avoid memory leak by deleting, constructing appropriately
                const std::lock_guard<std::mutex> lock(sigma_mutex);                                    
                (*((int*)sigma["Variable0_0_0_10currentValue"])) = Assignment12_4_12_182520;
}
bool function117evalBooleanConst(){
	sigma["BooleanConst16_6_16_10constantValue"] = new bool(true);
	const std::lock_guard<std::mutex> lock(sigma_mutex);
	bool BooleanConst16_6_16_104630 = *(bool *) sigma["BooleanConst16_6_16_10constantValue"];//constantValue}
	bool BooleanConst16_6_16_10terminates =  BooleanConst16_6_16_104630;
	return BooleanConst16_6_16_10terminates;
}
bool function120evalBooleanConst(){
	sigma["BooleanConst16_14_16_19constantValue"] = new bool(false);
	const std::lock_guard<std::mutex> lock(sigma_mutex);
	bool BooleanConst16_14_16_194630 = *(bool *) sigma["BooleanConst16_14_16_19constantValue"];//constantValue}
	bool BooleanConst16_14_16_19terminates =  BooleanConst16_14_16_194630;
	return BooleanConst16_14_16_19terminates;
}
bool function122evaluateConjunction2(){
	bool Conjunction16_5_16_20terminates =  false;
	return Conjunction16_5_16_20terminates;
}
bool function123evaluateConjunction3(){
	bool Conjunction16_5_16_20terminates =  false;
	return Conjunction16_5_16_20terminates;
}
bool function125evaluateConjunction4(){
	bool Conjunction16_5_16_20terminates =  true;
	return Conjunction16_5_16_20terminates;
}
void function126executeAssignment2(int resRight){
	int Assignment16_0_16_202520 = resRight; // was Assignment16_0_16_202354; but using the parameter name now
	//TODO: fix this and avoid memory leak by deleting, constructing appropriately
                const std::lock_guard<std::mutex> lock(sigma_mutex);                                    
                (*((int*)sigma["Variable2_0_2_10currentValue"])) = Assignment16_0_16_202520;
}

int main() {
    functioninit5Variable();
function7initializeVar();
functioninit9Variable();
function11initializeVar();
functioninit13Variable();
function15initializeVar();
         
            LockingQueue<Void> queue20;
            std::thread thread22([&](){

            LockingQueue<int> queue34;
            std::thread thread29([&](){
int result29accessVarRef = function29accessVarRef();
{

            queue34.push(result29accessVarRef);
                }

            });
            thread29.detach();
                
            std::thread thread32([&](){
int result32accessVarRef = function32accessVarRef();
{

            queue34.push(result32accessVarRef);
                }

            });
            thread32.detach();
                
        //start of and join node
        
        int AndJoinPopped_34_0;
        queue34.waitAndPop(AndJoinPopped_34_0);
            
        int AndJoinPopped_34_1;
        queue34.waitAndPop(AndJoinPopped_34_1);
            int result34finishPlus = function34finishPlus(AndJoinPopped_34_0, AndJoinPopped_34_1);

        //end of and join node
        function35executeAssignment2(result34finishPlus);
{

            Void fakeParam20;
            queue20.push(fakeParam20);
                }

            });
            thread22.detach();
                
            std::thread thread37([&](){

            LockingQueue<int> queue49;
            std::thread thread44([&](){
int result44accessVarRef = function44accessVarRef();
{

            queue49.push(result44accessVarRef);
                }

            });
            thread44.detach();
                
            std::thread thread47([&](){
int result47accessVarRef = function47accessVarRef();
{

            queue49.push(result47accessVarRef);
                }

            });
            thread47.detach();
                
        //start of and join node
        
        int AndJoinPopped_49_0;
        queue49.waitAndPop(AndJoinPopped_49_0);
            
        int AndJoinPopped_49_1;
        queue49.waitAndPop(AndJoinPopped_49_1);
            int result49finishPlus = function49finishPlus(AndJoinPopped_49_0, AndJoinPopped_49_1);

        //end of and join node
        function50executeAssignment2(result49finishPlus);
{

            Void fakeParam20;
            queue20.push(fakeParam20);
                }

            });
            thread37.detach();
                
        //start of and join node
        
        Void AndJoinPopped_20_0;
        queue20.waitAndPop(AndJoinPopped_20_0);
            
        Void AndJoinPopped_20_1;
        queue20.waitAndPop(AndJoinPopped_20_1);
            
        //end of and join node
        
            LockingQueue<int> queue65;
            std::thread thread60([&](){
int result60accessVarRef = function60accessVarRef();
{

            queue65.push(result60accessVarRef);
                }

            });
            thread60.detach();
                
            std::thread thread63([&](){
int result63accessVarRef = function63accessVarRef();
{

            queue65.push(result63accessVarRef);
                }

            });
            thread63.detach();
                
        //start of and join node
        
        int AndJoinPopped_65_0;
        queue65.waitAndPop(AndJoinPopped_65_0);
            
        int AndJoinPopped_65_1;
        queue65.waitAndPop(AndJoinPopped_65_1);
            bool result65finishIntEqual = function65finishIntEqual(AndJoinPopped_65_0, AndJoinPopped_65_1);

        //end of and join node
        
        LockingQueue<Void> queue107;
            
        bool IntEqual7_4_7_14terminates = n2;//Choice node
        if((bool)IntEqual7_4_7_14terminates == true){
            LockingQueue<int> queue84;
            std::thread thread79([&](){
int result79accessVarRef = function79accessVarRef();
{

            queue84.push(result79accessVarRef);
                }

            });
            thread79.detach();
                
            std::thread thread82([&](){
int result82accessVarRef = function82accessVarRef();
{

            queue84.push(result82accessVarRef);
                }

            });
            thread82.detach();
                
        //start of and join node
        
        int AndJoinPopped_84_0;
        queue84.waitAndPop(AndJoinPopped_84_0);
            
        int AndJoinPopped_84_1;
        queue84.waitAndPop(AndJoinPopped_84_1);
            int result84finishPlus = function84finishPlus(AndJoinPopped_84_0, AndJoinPopped_84_1);

        //end of and join node
        function85executeAssignment2(result84finishPlus);
{

            Void fakeParam107;
            queue107.push(fakeParam107);
                }

            //END IF (bool)IntEqual7_4_7_14terminates == true
        }
            //Choice node
        if((bool)IntEqual7_4_7_14terminates == false){
            LockingQueue<int> queue104;
            std::thread thread99([&](){
int result99accessVarRef = function99accessVarRef();
{

            queue104.push(result99accessVarRef);
                }

            });
            thread99.detach();
                
            std::thread thread102([&](){
int result102accessVarRef = function102accessVarRef();
{

            queue104.push(result102accessVarRef);
                }

            });
            thread102.detach();
                
        //start of and join node
        
        int AndJoinPopped_104_0;
        queue104.waitAndPop(AndJoinPopped_104_0);
            
        int AndJoinPopped_104_1;
        queue104.waitAndPop(AndJoinPopped_104_1);
            int result104finishPlus = function104finishPlus(AndJoinPopped_104_0, AndJoinPopped_104_1);

        //end of and join node
        function105executeAssignment2(result104finishPlus);
{

            Void fakeParam107;
            queue107.push(fakeParam107);
                }

            //END IF (bool)IntEqual7_4_7_14terminates == false
        }
             //or join node
        Void OrJoinPopped_107;
        queue107.waitAndPop(OrJoinPopped_107);
        
            LockingQueue<bool> queue114;
            LockingQueue<bool> queue124;
            std::thread thread117([&](){
bool result117evalBooleanConst = function117evalBooleanConst();
{

            queue124.push(result117evalBooleanConst);
                }

                {
        bool BooleanConst16_6_16_10terminates = result117evalBooleanConst;//Choice node
        if((bool)BooleanConst16_6_16_10terminates == false){bool result122evaluateConjunction2 = function122evaluateConjunction2();
{

            queue114.push(result122evaluateConjunction2);
                }

            //END IF (bool)BooleanConst16_6_16_10terminates == false
        }
            
                }
                
                {
                }
                
            });
            thread117.detach();
                
            std::thread thread120([&](){
bool result120evalBooleanConst = function120evalBooleanConst();
{

            queue124.push(result120evalBooleanConst);
                }

                {
        bool BooleanConst16_14_16_19terminates = result120evalBooleanConst;//Choice node
        if((bool)BooleanConst16_14_16_19terminates == false){bool result123evaluateConjunction3 = function123evaluateConjunction3();
{

            queue114.push(result123evaluateConjunction3);
                }

            //END IF (bool)BooleanConst16_14_16_19terminates == false
        }
            
                }
                
                {
                }
                
            });
            thread120.detach();
                
        //start of and join node
        
        bool AndJoinPopped_124_0;
        queue124.waitAndPop(AndJoinPopped_124_0);
            
        bool AndJoinPopped_124_1;
        queue124.waitAndPop(AndJoinPopped_124_1);
            
        //end of and join node
        
        bool BooleanConst16_6_16_10terminates = AndJoinPopped_124_0;
        bool BooleanConst16_14_16_19terminates = AndJoinPopped_124_1;//Choice node
        if((bool)BooleanConst16_6_16_10terminates == true && (bool)BooleanConst16_14_16_19terminates == true){bool result125evaluateConjunction4 = function125evaluateConjunction4();
{

            queue114.push(result125evaluateConjunction4);
                }

            //END IF (bool)BooleanConst16_6_16_10terminates == true && (bool)BooleanConst16_14_16_19terminates == true
        }
             //or join node
        bool OrJoinPopped_114;
        queue114.waitAndPop(OrJoinPopped_114);
        function126executeAssignment2(OrJoinPopped_114);

    //WARNING !! temporary code to test
    for(auto entry : sigma){
        std::cout << entry.first << " : " << *((int*)entry.second) << std::endl;
    }
}
    