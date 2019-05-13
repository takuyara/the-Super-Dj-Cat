const DELAY = 15;
const CPF = 200;
const BACKGROUNDSRC = "background.png";
const JUSTGOIMGSRC = "justgo.jpg";
const SEITSUMEIIMGSRC = "seitsumei.jpg";
const RANKINGIMGSRC = "ranking.jpg";
const GAMEOVERIMGSRC = "gameover.png";
const CARPETSRC = "carpet.png";
const GAMEOVER = 1;
const LOADTIME = 2000;
const NETPING = 100;
const NETPING_RKL = 50;
const NETPING_HJM = 500;
const SCX1 = 95;
const SCX2 = 140;
const SCX3 = 185;
const SCY = 260;
const PCTG = 5;
const gameWidth = 320;
const gameHeight = 580;
function adj(x) { if (x < 0) return -x; return x; }
const g_xdlt = Math.trunc(adj(wx.getSystemInfoSync().screenWidth - gameWidth) / 2);
const g_ydlt = Math.trunc(adj(wx.getSystemInfoSync().screenHeight - gameHeight) / 2);
//just go UI
//start, seitsumei, ranking
const B_JG_STARTx1 = 49;
const B_JG_STARTx2 = 270;
const B_JG_STARTy1 = 274;
const B_JG_STARTy2 = 335;
const B_JG_SEITSUMEIx1 = 196;
const B_JG_SEITSUMEIx2 = 251;
const B_JG_SEITSUMEIy1 = 465;
const B_JG_SEITSUMEIy2 = 508;
const B_JG_RANKINGx1 = 69;
const B_JG_RANKINGx2 = 120;
const B_JG_RANKINGy1 = 464;
const B_JG_RANKINGy2 = 511;
//seitusmei UI
//back
const B_SM_BACKx1 = 5;
const B_SM_BACKx2 = 50;
const B_SM_BACKy1 = 5;
const B_SM_BACKy2 = 50;
//ranking UI
//back
const B_RK_BACKx1 = 16;
const B_RK_BACKx2 = 52;
const B_RK_BACKy1 = 16;
const B_RK_BACKy2 = 52;
//gameover UI
const GO_DLTX = 100;
const GO_DLTY = 100;
const GO_SCOREX = 120;
const GO_SCOREY = 120;
//restart ranking
const B_GO_RESTARTx1 = 179;
const B_GO_RESTARTx2 = 236;
const B_GO_RESTARTy1 = 368;
const B_GO_RESTARTy2 = 422;
const B_GO_RANKINGx1 = 86;
const B_GO_RANKINGx2 = 144;
const B_GO_RANKINGy1 = 367;
const B_GO_RANKINGy2 = 422;
import pool from "pool.js";
import stone from "stone.js";
import note1 from "note1.js";
import note2 from "note2.js";
import note3 from "note3.js";
import note4 from "note4.js";
import note5 from "note5.js";
import fish from "fish.js";
import pic from "picture.js";
import userInterface from "UI.js";
import numberPrt from "numberprint.js";
import button from "button.js";
import resPrt from "result.js";
import plus5 from "plus5.js";
const backImage = new pic(BACKGROUNDSRC);
const carpetImage = new pic(CARPETSRC);
const jg_Img = new pic(JUSTGOIMGSRC);
const sm_Img = new pic(SEITSUMEIIMGSRC);
const go_Img = new pic(GAMEOVERIMGSRC);
const rk_Img = new pic(RANKINGIMGSRC);
var scorePrinter;
var justGoC, seitsumeiC, rankingC, gameOverC, gamingC;
var g_ctx, g_score, g_cvs, g_intTimer, g_prtCount, bk_cvs, pochu;
function random(x){
    return Math.trunc(Math.random() * x);
}
function JYGS(x){
    return Math.trunc(CPF / Math.pow(x, 0.5));
}
function JYGS_ST(x){
    return Math.min(Math.trunc(Math.pow(x, 0.35)), PCTG);
}
/*
function uploadScore(){
    console.log("uploading~");
}
*/
function upload(){
    //console.log("fuck wx");
    scorePrinter.printNum(g_score);
    const opd = wx.getOpenDataContext();
    const cvs = opd.canvas;
    cvs.width = gameWidth;
    cvs.height = gameHeight;
//    g_ctx.fillRect(0, 0, 100, 100);
//    const bkCanvas = wx.createCanvas();
//    const bkContext = bkCanvas.getContext("2d");
//    bkContext.drawImage(g_cvs, 0, 0);
    opd.postMessage({command : "upload&check", score : g_score});
    setTimeout(function (){
        //console.log("before print~");
        //const opd = wx.getOpenDataContext();
        //const cvs = opd.canvas;
        
        g_ctx.drawImage(g_cvs, 0, 0);
        g_ctx.drawImage(cvs, g_xdlt, g_ydlt);
        
//        g_ctx.drawImage(bkCanvas, 0, 0);
        
//        g_ctx.fillStyle = "red";
//        g_ctx.fillRect(0, 0, 100, 100);
//        const opd1 = wx.getOpenDataContext();
//        const cvs1 = opd.canvas;
//        g_ctx.drawImage(cvs, 0, 0);
    }, NETPING);
}
function prtlist(){
    const opd = wx.getOpenDataContext();
    const cvs = opd.canvas;
    cvs.width = gameWidth;
    cvs.height = gameHeight;
    opd.postMessage({command : "checkranking"});
    //g_prtCount = 0;
    /*
    g_intTimer = setInterval(function (){
        if (rankingC.onshow){
            g_ctx.drawImage(g_cvs, 0, 0);
            g_ctx.drawImage(cvs, g_xdlt, g_ydlt);
            if (++g_prtCount >= 5) clearInterval(g_intTimer);
        }
    }, NETPING);
    */
    let curPing = NETPING_RKL;
    /*
    if (pochu == undefined){
        pochu = true;
        curPing = NETPING_HJM;
    }
    */
    setTimeout(function () {
        /*
        wx.showToast({
            title: "排行榜prt",
            icon: "success",
            duration: 2500
        });
        */
        if (rankingC.onshow){
            g_ctx.drawImage(g_cvs, 0, 0);
            g_ctx.drawImage(cvs, g_xdlt, g_ydlt);
        }
    }, curPing);
}
var g_getPause;
export default class YDJ{
    constructor(cvs, ctx, player, km){
//        console.log("getin");
        bk_cvs = wx.createCanvas();
        this.cvs = g_cvs = cvs, this.ctx = g_ctx = ctx;
        this.player = player, this.km = km, this.paused = false;
        //prepareRecord();
        //scorePrinter = new resPrt(ctx, SCX1, SCX2, SCX3, SCY);
        scorePrinter = new resPrt(ctx, 185, 45, SCY);
        justGoC = new userInterface(cvs, ctx, jg_Img, carpetImage, true);
//        if (justGoC.image == undefined) console.log("ffff");
        seitsumeiC = new userInterface(cvs, ctx, sm_Img, carpetImage, true);
        rankingC = new userInterface(cvs, ctx, rk_Img, carpetImage, true, prtlist);
        gameOverC = new userInterface(cvs, ctx, go_Img, carpetImage, false, upload, bk_cvs);
        gamingC = new userInterface(cvs, ctx, backImage, carpetImage, true,this.startGame.bind(this));
        justGoC.addButton(new button(B_JG_STARTx1, B_JG_STARTy1, B_JG_STARTx2, B_JG_STARTy2, justGoC, gamingC));
        justGoC.addButton(new button(B_JG_SEITSUMEIx1, B_JG_SEITSUMEIy1, B_JG_SEITSUMEIx2, B_JG_SEITSUMEIy2, justGoC, seitsumeiC));
        justGoC.addButton(new button(B_JG_RANKINGx1, B_JG_RANKINGy1, B_JG_RANKINGx2, B_JG_RANKINGy2, justGoC, rankingC));
        seitsumeiC.addButton(new button(B_SM_BACKx1, B_SM_BACKy1, B_SM_BACKx2, B_SM_BACKy2, seitsumeiC, justGoC));
        rankingC.addButton(new button(B_RK_BACKx1, B_RK_BACKy1, B_RK_BACKx2, B_RK_BACKy2, rankingC, justGoC));
        gameOverC.addButton(new button(B_GO_RANKINGx1, B_GO_RANKINGy1, B_GO_RANKINGx2, B_GO_RANKINGy2, gameOverC, rankingC));
        gameOverC.addButton(new button(B_GO_RESTARTx1, B_GO_RESTARTy1, B_GO_RESTARTx2, B_GO_RESTARTy2, gameOverC, gamingC));
        wx.onShow(this.depause.bind(this));
        wx.onHide(this.pause.bind(this));
        setTimeout(function (){ justGoC.callout(); }, LOADTIME);
        //setTimeout(function(){
        //    carpetImage.drawCPT(ctx, 0, 0);
        //    go_Img.drawBG(ctx, 0, 0);
        //}, LOADTIME);
        //this.timer = setTimeout(function () { }, 100000);
        //this.poo = new pool();
        //this.gameOver();
    }
    pause(){
        //let ctx = bk_cvs.getContext("2d");
        //ctx.drawImage(g_cvs, 0, 0);
      //console.log("paused");
      //g_getPause = true;
      if (!gamingC.onshow) return ;
      this.paused = true;
      this.pauseT = new Date();
    }
    depause(){
        /*
        wx.showToast({
            title: "Resume",
            icon: "success",
            duration: 4000
        });
        */
      /*
      if (!g_getPause){
      wx.showToast({
        title: "ResumeWithoutPause",
        icon: "wrong",
        duration: 4000
      });
      } else {
        wx.showToast({
          title: "Resume",
          icon: "success",
          duration: 4000
        });
        g_getPause = false;  
      }
      */
      //console.log("depause");
      //g_ctx.drawImage(bk_cvs, 0, 0);
      
      if (!gamingC.onshow){
          /*
          wx.showToast({
              title: "RESHWO",
              icon: "success",
              duration: 1000
          })
          */
          if (gameOverC.onshow){ 
              /*
              wx.showToast({
                  title: "GAMEOVERRESHOW",
                  icon: "success",
                  duration: 1000
              });
              */
              //g_ctx.drawImage(bk_cvs, 0, 0);
            gameOverC.callout(); return ;
            }
          if (justGoC.onshow){
              /*
              wx.showToast({
                  title: "JUSTGORESHOW",
                  icon: "success",
                  duration: 1000
              });
              */

              justGoC.callout(); return ; 
          }
          if (rankingC.onshow){
              /*
              wx.showToast({
                  title: "rankingreshow",
                  icon: "success",
                  duration: 1000
              });
              */
              rankingC.callout(); return ;
            }
          if (seitsumeiC.onshow){
              /*
              wx.showToast({
                  title: "setsumeireshow",
                  icon: "success",
                  duration: 1000
              });
              */
              seitsumeiC.callout(); return ;
            }
      }
      if (!this.paused) return ;
      /*
      wx.showToast({
        title: "Resume",
        icon: "success",
        duration: 4000
      });
      */
      this.paused = false;
      let curT = new Date();
      this.pauseSum += (curT - this.pauseT);
    }
    startGame(){
        //gameOverC.image.drawBG(g_ctx, 0, 0);
        //return ;
        this.player.reset();
        this.startT = new Date();
        this.poo = new pool();
        this.pooP5 = new Array();
        this.count = 0;
        this.km.start();
        this.paused = false;
        this.pauseSum = 0;
//        this.player.pos = 1;
//        this.gameOver();
//        return ;

//        console.log("game start");
//        console.log(this.ctx.__proto__);
        this.timer = setInterval((function (){
 //           console.log("IN UPDATE");
            if (this.km.at == GAMEOVER){
                this.gameOver();
                return ;
            }
            if (this.paused) return ;
//            var x = wx.getSystemInfoSync().screenWidth;
//            var y = wx.getSystemInfoSync().screenHeight;
//            delete numP;
//            console.log("draw over");
            /*
          wx.showToast({
            title: "Still in love",
            icon: "success",
            duration: 4000
          });
          */
          /*
          wx.showToast({
            title: dlt.toString(),
            icon: "success",
            duration: 1000
          });
          */

            carpetImage.drawCPT(this.ctx, 0, 0);
            backImage.drawBG(this.ctx, 0, 0);
            var numP = new numberPrt(this.ctx, 63, 37, 20, this.km.score, "white");
            this.player.draw(this.ctx);
            let curT = new Date(), dlt = ((curT - this.startT) - this.pauseSum) / 1000;
            for (let i = 0; i < this.poo.arr.length; ++i){
                let pos = this.poo.arr[i].update(this.ctx, dlt, this.player, this.km);
                if (pos == undefined) continue;
                this.pooP5.push(new plus5(pos));
            }
            for (let i = 0; i < this.pooP5.length; ++i)
              this.pooP5[i].draw(this.ctx);
            let missP = Math.max(1 / dlt, 0.2);
//            console.log("generating");
            if ((++this.count % JYGS(dlt)) != 0) return ;
            if (Math.random() > missP) {
                //generate 1 or 2
                let speC = random(3), gen2 = random(3) == 0;
                for (let i = 0; i < 3; ++i)
                    if ((gen2 && i != speC) || (!gen2 && i == speC)) {
                        let id = random(PCTG + JYGS_ST(dlt));
                        if (id < PCTG){
                            let noteid = random(5);
                            if (noteid == 0) this.poo.add(new note1(i), this.ctx);
                            if (noteid == 1) this.poo.add(new note2(i), this.ctx);
                            if (noteid == 2) this.poo.add(new note3(i), this.ctx);
                            if (noteid == 3) this.poo.add(new note4(i), this.ctx);
                            if (noteid == 4) this.poo.add(new note5(i), this.ctx);
                        }
                        if (id == PCTG) this.poo.add(new fish(i), this.ctx);
                        if (id > PCTG) this.poo.add(new stone(i), this.ctx);
                    }
            }
            
        }).bind(this), DELAY);
    }
    gameOver(){
        let ctx = bk_cvs.getContext("2d");
        carpetImage.drawCPT(ctx, 0, 0);
        backImage.drawBG(ctx, 0, 0);
        var numP = new numberPrt(ctx, 63, 37, 20, this.km.score, "white");
        this.player.draw(ctx);
        for (let i = 0; i < this.poo.arr.length; ++i)
            this.poo.arr[i].draw(ctx);
        clearInterval(this.timer);
        for (let i = 0; i < this.poo.arr.length; ++i) delete this.poo.arr[i];
        this.poo.arr.splice(0, this.poo.arr.length);
        for (let i = 0; i < this.pooP5.length; ++i) delete this.pooP5[i];
        this.pooP5.splice(0, this.pooP5.length);
        g_score = this.km.score;
        gamingC.calloff();
        //let obj = g_ctx.getImageData(0, 0, 1000, 1000);
        //const ctx = bk_cvs.getContext("2d");
        //ctx.drawImage(g_cvs, 0, 0);
        gameOverC.callout();
        //gameOverC.image.drawBG(g_ctx, 0, 0);
        /*
        g_ctx.fillStyle = "black";
        g_ctx.fillRect(0, 0, 1000, 1000);
        g_ctx.putImageData(obj, 0, 0);
        */
        //setTimeout(function(){
        //g_ctx.drawImage(bk_cvs, 0, 0);
        //}, 1000);
    }
}
