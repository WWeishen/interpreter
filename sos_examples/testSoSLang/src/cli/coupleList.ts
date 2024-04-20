export class Couple {
    n1: number;
    n2: number;

    constructor() {
        this.n1 = NaN;
        this.n2 = NaN;
    }
}

export class CoupleList{
    list : Couple[]
    length : number

    constructor(){
        this.list = [];
        this.length = this.list.length;
    }

    last():Couple{
        return this.list[this.length-1];
    }

    addCouple():void{
        let c = new Couple();
        this.list.push(c);
        this.length ++;
    }

    reduce():void{
        this.list.pop();
        this.length--;
    }
    
    isNull():boolean{
        let last= this.last();
        return isNaN(last.n1) || isNaN(last.n2);
    }
}