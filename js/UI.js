import button from "button.js";
const gameWidth = 320;
const gameHeight = 580;
function adj(x) { if (x < 0) return -x; return x; }
const xdlt = Math.trunc(adj(wx.getSystemInfoSync().screenWidth - gameWidth) / 2);
const ydlt = Math.trunc(adj(wx.getSystemInfoSync().screenHeight - gameHeight) / 2);
export default class userInterface{
    checkbutton(x, y) {
        if (!this.onshow) return;
        x -= xdlt, y -= ydlt;
        for (let i = 0; i < this.butArr.length; ++i)
            this.butArr[i].check(x, y);
    }
    constructor(cvs, ctx, image, cptimg, prtcpt, clfunc, bk_cvs){
        this.cvs = cvs;
        this.butArr = new Array();
        this.image = image;
        this.carpetImage = cptimg;
        this.ctx = ctx;
        this.onshow = false;
        this.calloutfunc = clfunc;
        this.f_cf = clfunc != undefined;
        //this.xpos = dtx, this.ypos = dty;
        this.bk_cvs = bk_cvs;
        this.prtcpt = prtcpt;
//        if (this.image != undefined) console.log("ok");
        wx.onTouchStart(((e) => {
            this.checkbutton(e.touches[0].clientX, e.touches[0].clientY);
        }).bind(this));
    }
    addButton(button){
        this.butArr.push(button);
    }
    callout(flag){
//        if (this.image == undefined) console.log("fuck");
//        console.log("call out");
        if (this.prtcpt) this.carpetImage.drawCPT(this.ctx, 0, 0);
//            else return;
           else this.ctx.drawImage(this.bk_cvs, 0, 0);
        this.image.drawBG(this.ctx, 0, 0);
        //if (!this.prtcpt) return ;
        this.onshow = true;
        if (this.f_cf && flag == undefined){
//            console.log("call out function " + this.calloutfunc);
            this.calloutfunc();
        }
    }
    calloff(){
        this.onshow = false;
    }
}
