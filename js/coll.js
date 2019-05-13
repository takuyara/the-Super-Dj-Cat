import baseC from "baseclass.js";
//var width = wx.getSystemInfoSync().screenWidth;
//var height = wx.getSystemInfoSync().screenHeight;
const width = 320, height = 580;
const SAFETY = 10;
function RateJYFunc(time){
    return Math.pow(time, 0.5) * 1.2;
}
export default class coll extends baseC{
    constructor(imgSrc, w, h, pos){
        super(imgSrc, w, h, pos * width / 3, 0);
//        console.log("log out " + this.x + " " + this.y);
    }
    collide(km){
        //do nothing
    }
    update(ctx, curT, player, km){
        let res;
        this.y += RateJYFunc(curT);
        if (this.ava && this.isCollideWith(player)){
            this.ava = false;
            res = this.collide(km);
        }
        if (this.y >= height - this.h - SAFETY){
            this.ava = false;
            //console.log("miss it");
        }
        this.draw(ctx);
        return res;
    }
}
