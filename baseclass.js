import printpicture from "picture.js";
const height = 580;
const YMAXLIMIT = height - 103;
export default class baseC{
    constructor (imgSrc, w, h, x, y){
 //       console.log("x = " + x + " y = " + y);
        this.image = imgSrc;
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.ava = true;
    }
    draw(ctx){
        if (!this.ava) return ;
//        if (this.image == "NaN") console.log("fuck");
        this.image.draw(ctx, this.x, this.y);
    }
    isCollideWith(sp){
        if (this.y > YMAXLIMIT){
            this.ava = false;
            return false;
        }
/*
        let spX = sp.x + sp.w / 2;
        let spY = sp.y + sp.h / 2;
        if (!this.ava || !sp.ava) return false;
        return !!(this.x <= spX && spX <= this.x + this.w
              && this.y <= spY && spY <= this.y + this.h);
*/
        let LFT, RIG;
        if (this.x < sp.x){
            LFT = this, RIG = sp;
        } else {
            LFT = sp, RIG = this;
        }
        if (LFT.x + LFT.w < RIG.x) return false;
        if (this.y < sp.y){
            LFT = this, RIG = sp;
        } else {
            LFT = sp, RIG = this;
        }
        if (LFT.y + LFT.h < RIG.y) return false;
        return true; 
    }
}
