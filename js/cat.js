import baseC from "baseclass.js";
import pic from "picture.js";
//var width = wx.getSystemInfoSync().screenWidth;
//var height = wx.getSystemInfoSync().screenHeight;
const width = 320, height = 580;
//wx.showShareMenu();
//console.log("WDD   "  + width + " " + height);
const CATWIDTH = 100;
const CATHEIGHT = 163;
const TIMELIM = 100;
const DELTALIM = 5;
//console.log("CAT " + CATWIDTH + "  " + CATHEIGHT)
const CATSRC = "cat.jpg";
const CATSPSRC = "cat.jpg";
const catImage = new pic(CATSRC);
const catImageSP = new pic(CATSPSRC);
export default class Cat extends baseC{
    constructor(){
        super(catImage, CATWIDTH, CATHEIGHT);
        this.y = height - this.h;
        this.imageSP = catImageSP;
        this.reset();
        this.addEvent();
        this.startT = 0;
    }
    reset(){
        this.pos = 1, this.generateX();
        this.ontouch = false;
        this.startT = new Date();
    }
    draw(ctx){
        if (!this.ontouch) this.image.draw(ctx, this.x, this.y);
            else this.imageSP.draw(ctx, this.x, this.y);
    }
    generateX(){
        this.x = this.pos * width / 3;
    }
    /*
    ckTouched(x, y){
        return (this.x <= x && x <= this.x + this.w
             && this.y <= y && y <= this.y + this.h);
    }
    cgpos(x, y){
        let dltx = x - this.startX;
        this.x += dltx;
        if (this.x < 0) this.x = 0;
        if (this.x > width - CATWIDTH) this.x = width - CATWIDTH;
        this.pos = Math.trunc(this.x / (width / 3));
    }
    */
    cgPos1(){
 //       console.log(this.startX, this.lastX);
        if (this.startX < this.lastX)
            if (++this.pos == 3) this.pos = 2;
        if (this.startX > this.lastX)
            if (--this.pos == -1) this.pos = 0;
        this.generateX();
    }
    addEvent(cvs){
        wx.onTouchStart(((e) => {
//            e.preventDefault();
            this.startX = e.touches[0].clientX;
//            this.startY = e.touches[0].clientY;
//            console.log("touch " + x + " " + y);
//            if (this.ckTouched(x, y)){
                this.ontouch = true;
//                console.log("dzl!");
//            }
        }).bind(this));
        wx.onTouchMove(((e) => {
//            e.preventDefault();
            if (this.ontouch){
//                console.log("ctqw");
//                this.cgpos(e.touches[0].clientX, e.touches[0].clientY);
//                console.log("catds");
//                ontouch = false;
                this.lastX = e.touches[0].clientX;
            }
        }).bind(this));
        wx.onTouchEnd(((e) => {
            let curT = new Date();
            this.ontouch = false;
            if (curT - this.startT < TIMELIM) return;
            if (Math.abs(this.lastX - this.startX) < DELTALIM) return ;
            this.cgPos1();
        }).bind(this));
    }
}
