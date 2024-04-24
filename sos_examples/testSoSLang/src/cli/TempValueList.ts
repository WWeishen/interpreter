export class TempValue {
    list : number[];
    length : number;

    constructor(n:number) {
        this.list = [];
        this.length = n;
    }

    last():number{
        let n = this.list.length;
        return this.list[n-1];
    }
}

export class TempValueList{
    list : TempValue[]
    length : number

    constructor(){
        this.list = [];
        this.length = this.list.length;
    }

    last():TempValue{
        return this.list[this.length-1];
    }

    addTempValue(n:number):void{
        let c = new TempValue(n);
        this.list.push(c);
        this.length ++;
    }

    addValueLast(n:number):void{
        let l = this.last();
        l.list.push(n);
    }

    reduce():void{
        this.list.pop();
        this.length--;
    }
    
    isWating():boolean{
        let last = this.last();
        let n = last.list.length;
        if( n < last.length){
            return true;
        }else{
            return false;
        }
    }
}