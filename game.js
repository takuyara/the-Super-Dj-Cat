//Pionniers du TJ, benissiez-moi par votre Esprits Saints!
//var score = 0;
//wx.alert("Here we go");
//console.log("Here we go");
/*
wx.showToast({
    title: "记录上传成功",
    icon: "success",
    duration: 4000
});
*/
const LOADINGIMGSRC = "loading.jpg";
const CARPETIMGSRC = "carpet.png";
const LOADINGTIME = 200;
import pic from "js/picture.js";
const canvas = wx.createCanvas();
const context = canvas.getContext("2d");
//const carpetImg = new pic(CARPETIMGSRC, context, 2);
//setTimeout(function(){
context.fillStyle = "#a3cde8";
context.fillRect(0, 0, 1000, 1000);
const loadingImg = new pic(LOADINGIMGSRC, context, canvas);
//function prepareRecord() {
    const opd = wx.getOpenDataContext();
    opd.postMessage({command: "firstget"});
//}
//}, LOADINGTIME);
//console.log("drawDone");
import cat from "js/cat.js";
import pool from "js/pool.js";
import YDJ from "js/YDJ.js";
import gamestatue from "js/km.js";
const player = new cat();
const fxtID = "OhqXipUUR724aPl8dLlMqg";
const fxtURL = "https://mmocgame.qpic.cn/wechatgame/EEuzoR12fqnibtkuFtSxfYMYj2nM77YYg0iajjus7rUhL0M8X5WIVcuMe6t2icnkroH/0";
/*
wx.shareAppMessage({
  imageUrlId: fxtID,
  imageUrl: fxtURL
});
*/
wx.onShareAppMessage(function(){
  return {
    imageUrlId: fxtID,
    imageUrl: fxtURL
  };
});
wx.showShareMenu({
  withShareTicket: true
});

//console.log("ALLINALL");
//wx.alert("Here we go");
//console.log("Here we go");
/*
const bag = wx.createImage();
bag.src = "/js/background.jpg";
context.drawImage(bag, 0, 0);
*/
const pooL = new pool();
const statue = new gamestatue();
const main = new YDJ(canvas, context, player, statue);
//main.startGame();
