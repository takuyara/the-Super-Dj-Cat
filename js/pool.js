export default class pool{
    constructor(){
        this.arr = new Array();
    }
    add(newele, ctx){
        this.arr.push(newele);
        newele.draw(ctx);
    }
} ;
