import pic from "picture.js";
const numArr = new Array(10);
numArr[0] = new pic("0.png");
numArr[1] = new pic("1.png");
numArr[2] = new pic("2.png");
numArr[3] = new pic("3.png");
numArr[4] = new pic("4.png");
numArr[5] = new pic("5.png");
numArr[6] = new pic("6.png");
numArr[7] = new pic("7.png");
numArr[8] = new pic("8.png");
numArr[9] = new pic("9.png");
export default class resPrt{
    constructor (ctx, finish, dlt, y){
        this.fin = finish, this.dlt = dlt;
        this.y = y, this.ctx = ctx;
    }
    printNum(x){
        let curPos = this.fin;
        for (let i = 0; (i < 3) || x; ++i){
//          console.log(x % 10);
          numArr[x % 10].draw(this.ctx, curPos, this.y);
          x = Math.trunc(x / 10), curPos -= this.dlt;
        }
    }
}
