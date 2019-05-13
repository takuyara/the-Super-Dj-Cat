import pic from "picture.js";
const PLUS5SRC = "plus5.jpg";
const PRTTMS = 20;
const plus5img = new pic(PLUS5SRC);
export default class plus5{
  constructor(pos){
    this.x = pos.x, this.y = pos.y;
    this.count = 0;
  }
  draw(ctx){
    if (this.count++ > PRTTMS) return ;
    plus5img.draw(ctx, this.x, this.y);
  }
}
