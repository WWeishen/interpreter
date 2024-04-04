
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
Number function29accessVarRef(){
	let VarRef4_18_4_201579 = new Number(sigma.get("Variable0_0_0_10currentValue");//currentValue}
	VarRef4_18_4_20terminates =  VarRef4_18_4_201579;
	return VarRef4_18_4_20terminates;
}
Number function32accessVarRef(){
	let VarRef4_13_4_151579 = new Number(sigma.get("Variable0_0_0_10currentValue");//currentValue}
	VarRef4_13_4_15terminates =  VarRef4_13_4_151579;
	return VarRef4_13_4_15terminates;
}
Number function34finishPlus(Number n2, Number n1){
	Plus4_12_4_214267 = n2;
	Plus4_12_4_214292 = n1;
	let  Plus4_12_4_214411 = n1; // was Plus4_12_4_214292; but using the parameter name now
	let  Plus4_12_4_214416 = n2; // was Plus4_12_4_214267; but using the parameter name now
	Plus4_12_4_214410 = Plus4_12_4_214411 + Plus4_12_4_214416;
	Plus4_12_4_21terminates =  Plus4_12_4_214410;
	return Plus4_12_4_21terminates;
}
void function35executeAssignment2(Number resRight){
	let  Assignment4_7_4_212520 = resRight; // was Assignment4_7_4_212354; but using the parameter name now
	                                 
                sigma.set("Variable1_0_1_10currentValue", new Number(Assignment4_7_4_212520))
}
Number function44accessVarRef(){
	let VarRef5_18_5_201579 = new Number(sigma.get("Variable1_0_1_10currentValue");//currentValue}
	VarRef5_18_5_20terminates =  VarRef5_18_5_201579;
	return VarRef5_18_5_20terminates;
}
Number function47accessVarRef(){
	let VarRef5_13_5_151579 = new Number(sigma.get("Variable1_0_1_10currentValue");//currentValue}
	VarRef5_13_5_15terminates =  VarRef5_13_5_151579;
	return VarRef5_13_5_15terminates;
}
Number function49finishPlus(Number n2, Number n1){
	Plus5_12_5_214267 = n2;
	Plus5_12_5_214292 = n1;
	let  Plus5_12_5_214411 = n1; // was Plus5_12_5_214292; but using the parameter name now
	let  Plus5_12_5_214416 = n2; // was Plus5_12_5_214267; but using the parameter name now
	Plus5_12_5_214410 = Plus5_12_5_214411 + Plus5_12_5_214416;
	Plus5_12_5_21terminates =  Plus5_12_5_214410;
	return Plus5_12_5_21terminates;
}
void function50executeAssignment2(Number resRight){
	let  Assignment5_7_5_212520 = resRight; // was Assignment5_7_5_212354; but using the parameter name now
	                                 
                sigma.set("Variable1_0_1_10currentValue", new Number(Assignment5_7_5_212520))
}
Number function56accessVarRef(){
	let VarRef7_4_7_61579 = new Number(sigma.get("Variable0_0_0_10currentValue");//currentValue}
	VarRef7_4_7_6terminates =  VarRef7_4_7_61579;
	return VarRef7_4_7_6terminates;
}
Number function71accessVarRef(){
	let VarRef9_15_9_171579 = new Number(sigma.get("Variable0_0_0_10currentValue");//currentValue}
	VarRef9_15_9_17terminates =  VarRef9_15_9_171579;
	return VarRef9_15_9_17terminates;
}
Number function74accessVarRef(){
	let VarRef9_10_9_121579 = new Number(sigma.get("Variable1_0_1_10currentValue");//currentValue}
	VarRef9_10_9_12terminates =  VarRef9_10_9_121579;
	return VarRef9_10_9_12terminates;
}
Number function76finishPlus(Number n2, Number n1){
	Plus9_9_9_184267 = n2;
	Plus9_9_9_184292 = n1;
	let  Plus9_9_9_184411 = n1; // was Plus9_9_9_184292; but using the parameter name now
	let  Plus9_9_9_184416 = n2; // was Plus9_9_9_184267; but using the parameter name now
	Plus9_9_9_184410 = Plus9_9_9_184411 + Plus9_9_9_184416;
	Plus9_9_9_18terminates =  Plus9_9_9_184410;
	return Plus9_9_9_18terminates;
}
void function77executeAssignment2(Number resRight){
	let  Assignment9_4_9_182520 = resRight; // was Assignment9_4_9_182354; but using the parameter name now
	                                 
                sigma.set("Variable1_0_1_10currentValue", new Number(Assignment9_4_9_182520))
}
Number function91accessVarRef(){
	let VarRef12_15_12_171579 = new Number(sigma.get("Variable0_0_0_10currentValue");//currentValue}
	VarRef12_15_12_17terminates =  VarRef12_15_12_171579;
	return VarRef12_15_12_17terminates;
}
Number function94accessVarRef(){
	let VarRef12_10_12_121579 = new Number(sigma.get("Variable1_0_1_10currentValue");//currentValue}
	VarRef12_10_12_12terminates =  VarRef12_10_12_121579;
	return VarRef12_10_12_12terminates;
}
Number function96finishPlus(Number n2, Number n1){
	Plus12_9_12_184267 = n2;
	Plus12_9_12_184292 = n1;
	let  Plus12_9_12_184411 = n1; // was Plus12_9_12_184292; but using the parameter name now
	let  Plus12_9_12_184416 = n2; // was Plus12_9_12_184267; but using the parameter name now
	Plus12_9_12_184410 = Plus12_9_12_184411 + Plus12_9_12_184416;
	Plus12_9_12_18terminates =  Plus12_9_12_184410;
	return Plus12_9_12_18terminates;
}
void function97executeAssignment2(Number resRight){
	let  Assignment12_4_12_182520 = resRight; // was Assignment12_4_12_182354; but using the parameter name now
	                                 
                sigma.set("Variable0_0_0_10currentValue", new Number(Assignment12_4_12_182520))
}
Boolean function109evalBooleanConst(){
	sigma.set("BooleanConst16_6_16_10constantValue",new Boolean(true));//A1
	let BooleanConst16_6_16_104630 = new Boolean(sigma.get("BooleanConst16_6_16_10constantValue");//constantValue}
	BooleanConst16_6_16_10terminates =  BooleanConst16_6_16_104630;
	return BooleanConst16_6_16_10terminates;
}
Boolean function112evalBooleanConst(){
	sigma.set("BooleanConst16_14_16_19constantValue",new Boolean(false));//A1
	let BooleanConst16_14_16_194630 = new Boolean(sigma.get("BooleanConst16_14_16_19constantValue");//constantValue}
	BooleanConst16_14_16_19terminates =  BooleanConst16_14_16_194630;
	return BooleanConst16_14_16_19terminates;
}
Boolean function114evaluateConjunction2(){
	Conjunction16_5_16_20terminates =  false;
	return Conjunction16_5_16_20terminates;
}
Boolean function115evaluateConjunction3(){
	Conjunction16_5_16_20terminates =  false;
	return Conjunction16_5_16_20terminates;
}
Boolean function117evaluateConjunction4(){
	Conjunction16_5_16_20terminates =  true;
	return Conjunction16_5_16_20terminates;
}
void function118executeAssignment2(Number resRight){
	let  Assignment16_0_16_202520 = resRight; // was Assignment16_0_16_202354; but using the parameter name now
	                                 
                sigma.set("Variable2_0_2_10currentValue", new Number(Assignment16_0_16_202520))
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

            LockingQueue<Number> queue34;
            std::thread thread29([&](){
Number result29accessVarRef = function29accessVarRef();
{

            queue34.push(result29accessVarRef);
                }

            });
            thread29.detach();
                
            std::thread thread32([&](){
Number result32accessVarRef = function32accessVarRef();
{

            queue34.push(result32accessVarRef);
                }

            });
            thread32.detach();
                
        //start of and join node
        
        Number AndJoinPopped_34_0;
        queue34.waitAndPop(AndJoinPopped_34_0);
            
        Number AndJoinPopped_34_1;
        queue34.waitAndPop(AndJoinPopped_34_1);
            Number result34finishPlus = function34finishPlus(AndJoinPopped_34_0, AndJoinPopped_34_1);

        //end of and join node
        function35executeAssignment2(result34finishPlus);
{

            Void fakeParam20;
            queue20.push(fakeParam20);
                }

            });
            thread22.detach();
                
            std::thread thread37([&](){

            LockingQueue<Number> queue49;
            std::thread thread44([&](){
Number result44accessVarRef = function44accessVarRef();
{

            queue49.push(result44accessVarRef);
                }

            });
            thread44.detach();
                
            std::thread thread47([&](){
Number result47accessVarRef = function47accessVarRef();
{

            queue49.push(result47accessVarRef);
                }

            });
            thread47.detach();
                
        //start of and join node
        
        Number AndJoinPopped_49_0;
        queue49.waitAndPop(AndJoinPopped_49_0);
            
        Number AndJoinPopped_49_1;
        queue49.waitAndPop(AndJoinPopped_49_1);
            Number result49finishPlus = function49finishPlus(AndJoinPopped_49_0, AndJoinPopped_49_1);

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
        Number result56accessVarRef = function56accessVarRef();

        LockingQueue<Void> queue99;
            
        Number VarRef7_4_7_6terminates = result56accessVarRef;//Choice node
        if((VarRef7_4_7_6terminates == true)){
            LockingQueue<Number> queue76;
            std::thread thread71([&](){
Number result71accessVarRef = function71accessVarRef();
{

            queue76.push(result71accessVarRef);
                }

            });
            thread71.detach();
                
            std::thread thread74([&](){
Number result74accessVarRef = function74accessVarRef();
{

            queue76.push(result74accessVarRef);
                }

            });
            thread74.detach();
                
        //start of and join node
        
        Number AndJoinPopped_76_0;
        queue76.waitAndPop(AndJoinPopped_76_0);
            
        Number AndJoinPopped_76_1;
        queue76.waitAndPop(AndJoinPopped_76_1);
            Number result76finishPlus = function76finishPlus(AndJoinPopped_76_0, AndJoinPopped_76_1);

        //end of and join node
        function77executeAssignment2(result76finishPlus);
{

            Void fakeParam99;
            queue99.push(fakeParam99);
                }

            //END IF (VarRef7_4_7_6terminates == true)
        }
            //Choice node
        if((VarRef7_4_7_6terminates == false)){
            LockingQueue<Number> queue96;
            std::thread thread91([&](){
Number result91accessVarRef = function91accessVarRef();
{

            queue96.push(result91accessVarRef);
                }

            });
            thread91.detach();
                
            std::thread thread94([&](){
Number result94accessVarRef = function94accessVarRef();
{

            queue96.push(result94accessVarRef);
                }

            });
            thread94.detach();
                
        //start of and join node
        
        Number AndJoinPopped_96_0;
        queue96.waitAndPop(AndJoinPopped_96_0);
            
        Number AndJoinPopped_96_1;
        queue96.waitAndPop(AndJoinPopped_96_1);
            Number result96finishPlus = function96finishPlus(AndJoinPopped_96_0, AndJoinPopped_96_1);

        //end of and join node
        function97executeAssignment2(result96finishPlus);
{

            Void fakeParam99;
            queue99.push(fakeParam99);
                }

            //END IF (VarRef7_4_7_6terminates == false)
        }
             //or join node
        Void OrJoinPopped_99;
        queue99.waitAndPop(OrJoinPopped_99);
        
            LockingQueue<Boolean> queue106;
            LockingQueue<Boolean> queue116;
            std::thread thread109([&](){
Boolean result109evalBooleanConst = function109evalBooleanConst();
{

            queue116.push(result109evalBooleanConst);
                }

                {
        Boolean BooleanConst16_6_16_10terminates = result109evalBooleanConst;//Choice node
        if((BooleanConst16_6_16_10terminates == false)){Boolean result114evaluateConjunction2 = function114evaluateConjunction2();
{

            queue106.push(result114evaluateConjunction2);
                }

            //END IF (BooleanConst16_6_16_10terminates == false)
        }
            
                }
                
                {
                }
                
            });
            thread109.detach();
                
            std::thread thread112([&](){
Boolean result112evalBooleanConst = function112evalBooleanConst();
{

            queue116.push(result112evalBooleanConst);
                }

                {
        Boolean BooleanConst16_14_16_19terminates = result112evalBooleanConst;//Choice node
        if((BooleanConst16_14_16_19terminates == false)){Boolean result115evaluateConjunction3 = function115evaluateConjunction3();
{

            queue106.push(result115evaluateConjunction3);
                }

            //END IF (BooleanConst16_14_16_19terminates == false)
        }
            
                }
                
                {
                }
                
            });
            thread112.detach();
                
        //start of and join node
        
        Boolean AndJoinPopped_116_0;
        queue116.waitAndPop(AndJoinPopped_116_0);
            
        Boolean AndJoinPopped_116_1;
        queue116.waitAndPop(AndJoinPopped_116_1);
            
        //end of and join node
        
        Boolean BooleanConst16_6_16_10terminates = AndJoinPopped_116_0;
        Boolean BooleanConst16_14_16_19terminates = AndJoinPopped_116_1;//Choice node
        if((BooleanConst16_6_16_10terminates == true) && (BooleanConst16_14_16_19terminates == true)){Boolean result117evaluateConjunction4 = function117evaluateConjunction4();
{

            queue106.push(result117evaluateConjunction4);
                }

            //END IF (BooleanConst16_6_16_10terminates == true) && (BooleanConst16_14_16_19terminates == true)
        }
             //or join node
        Boolean OrJoinPopped_106;
        queue106.waitAndPop(OrJoinPopped_106);
        function118executeAssignment2(OrJoinPopped_106);

    //WARNING !! temporary code to test
    for(auto entry : sigma){
        std::cout << entry.first << " : " << *((int*)entry.second) << std::endl;
    }
}
    