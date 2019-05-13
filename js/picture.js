const scoreWidth = 132;
const scoreHeight = 49;
const gameWidth = 320;
const gameHeight = 580;
function adj(x){ if (x < 0) return -x; return x; }
const xdlt = Math.trunc(adj(wx.getSystemInfoSync().screenWidth - gameWidth) / 2);
const ydlt = Math.trunc(adj(wx.getSystemInfoSync().screenHeight - gameHeight) / 2);
export default class pic{
    constructor(src, ctx, cvs){
        this.img = wx.createImage();
        this.ready = false;
        this.img.src = src;
        //this.fl = fl;
        this.ctx = ctx;
        this.cvs = cvs;
        this.img.onload = (function(){
//            console.log("log out " + this.img.src);
            this.ready = true;
            if (this.cvs != undefined){
                this.ctx.drawImage(this.cvs, 0, 0);
                this.drawBG(this.ctx, 0, 0);
            }
            /*
            if (this.fl == 2){
                this.drawCPT(this.ctx, 0, 0);
                wx.showToast({
                    title: "ResumeWithoutPause",
                    icon: "wrong",
                    duration: 4000
                });
            }
            */
            /*
            if (this.fl != 0){
                
            }
            */
        }).bind(this);
    }
    draw(ctx, x, y){
//        console.log(x + xdlt + " " + y + ydlt);
        if (x < scoreWidth && y < scoreHeight) return ;
//        while (!this.ready) console.log("loading");
//        console.log("print " + this.img.src);
        ctx.drawImage(this.img, x + xdlt, y + ydlt);
        //console.log("OYUT");
    }
    drawBG(ctx, x, y){
//        while (!this.ready) console.log("loading");
//        console.log("drawout");
/*
        if (this.img.src.indexOf("ranking.jpg") != -1){
            wx.showToast({
                title: "rkbgprt",
                icon: "success",
                duration: 1000
            })
        }
*/        
        //console.log(this.img.src);
        ctx.drawImage(this.img, x + xdlt, y + ydlt);
    }
    drawCPT(ctx, x, y){
//        while (!this.ready) console.log("loading");
        ctx.drawImage(this.img, x, y);
    }
}
