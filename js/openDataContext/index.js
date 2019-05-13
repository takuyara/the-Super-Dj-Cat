const NETPING = 100;
const NRCX = 220;
const NRCY = 220;
//const HEADX = 0;
const NAMEX = 103;
const SCOREX = 210;
const SF_RKX = 124;
const SF_RKY = 425;
const SF_SCX = 202;
const SF_SCY = 425;
const DELTATIME = 500;
const RETRYTIME = 10;
const MAXUPLOAD = 20;
const DELAYTIME = 500;
const NAMELENLIM  = 9;
const NEWRCIMGSRC = "newrecord.jpg";
var strpos = new Array(200, 240, 280, 320, 350);
//var imgpos = new Array(0, 0, 0, 0, 0);
function adjScore(x){
    let str = x.toString();
    if (str.length < 3)
        for (let i = 0; i < 3 - str.length; ++i) str = "0" + str;
    return str;
}
function getScore(arr){
//    console.log("len = " + arr.length);
    for (let i = 0; i < arr.length; ++i)
        if (arr[i].key == "score") return Number(arr[i].value);
    return 0;
}
function drawStr(ctx, x, y, sz, str, col = "#000000"){
    ctx.fillStyle = col;
    ctx.font = sz + "px Arial";
    ctx.fillText(str, x, y);
}
function drawImg(ctx, x, y, url){
    const img = wx.createImage();
    img.src = url;
    img.onload = function (){
        ctx.drawImage(img, x, y);
    };
}
function adjustName(s){
//    console.log(s);
//    return s;
    var curID, sum = 0, curBytes;
    for (let i = 0; i < s.length; ++i){
        curID = s.charCodeAt(i);
//        console.log(s[i]);
        curBytes = 0;
        if (curID < 0x007f) curBytes = 1;
        if (0x0080 <= curID && curID <= 0x07ff) curBytes = 2;
        if (0x0800 <= curID && curID <= 0xffff) curBytes = 2;
        
        if (sum + curBytes > NAMELENLIM){
//            console.log("out " + i + " " + curBytes + " " + sum);
            return s.substr(0, i) + "...";
        }
        
        sum += curBytes;
    }
    return s;
}
var g_curScore, g_maxScore = 0, g_curData;
var g_timerID, g_localcvs, g_timer3ID, g_curOpenId, g_preMaxScore;
function getRanking(){
  wx.getFriendCloudStorage({
    keyList: new Array("score"),
    success: function (res){
      g_curData = res.data;
        //console.log("kewcl");
      /*
      wx.showToast({
        title: "hxkcl",
        icon: "success",
        duration: 4000
      });
      */
    },
    fail: function(res){
      /*
      let cvs = wx.getSharedCanvas();
      let ctx = cvs.getContext("2d");
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, 300, 300);
      */
      /*
      wx.showToast({
        title: "hxkcl",
        icon: "success",
        duration: 4000
      });
      */
    }
  });
}
function sort(arr){
  let len = arr.length;
  for (let i = 0; i < len; ++i)
    for (let j = 0; j < i; ++j)
      if (arr[j].score - arr[i].score < 0){
        let t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
      }
//  for (let i = 0; i < len - 1; ++i)
//    if (arr[i].score < arr[i + 1].score) console.log("fuck");
}
var g_timer1ID, g_timer2ID;
wx.onMessage((data) => {
    if (data.command == "firstget"){
        g_timer1ID = setInterval(function(){
        wx.getUserCloudStorage({
            keyList: new Array("score"),
            success: (data) => {
                
                g_maxScore = Math.max(g_maxScore, getScore(data.KVDataList));
                clearInterval(g_timer1ID);
            }
        });
        }, RETRYTIME);
        g_timer3ID = setInterval(function(){
            wx.getUserInfo({
                openIdList: new Array("selfOpenId"),
                success: (data) => {
                    //console.log("gotit");
                    g_curOpenId = data.data[0].nickName;
                    //console.log(data.data.length);
                    clearInterval(g_timer3ID);
                }
            });
        }, RETRYTIME);
        setInterval(getRanking, DELTATIME);
    }
    if (data.command == "upload&check"){
//        console.log("getting in~");
        g_curScore = data.score;
        //g_ctx = data.context;
        //console.log("i gwo in");
        //data.ctx.fillStyle = "red";
        //data.ctx.fillRect(0, 0, 100, 100);
        /*
        wx.getUserCloudStorage({
            keyList: new Array("score"),
            success: (data) => {
                  console.log("ffffff");
 //               console.log(g_ctx.__proto__);
 //               g_ctx.fillStyle = "green";
 //               g_ctx.fillRect(0, 0, 100, 100);
                
                let oriScore = getScore(data.KVDataList);
                console.log(oriScore);
                console.log("curscore = ", g_curScore);
                if (oriScore < g_curScore){
//                    wx.removeUserCloudStorage({
//                        keyList: new Array("score")
//                    });
                    console.log("zll");
                    let startT = new Date();
                    wx.setUserCloudStorage({
                        KVDataList: new Array({key : "score", value : g_curScore.toString()})
                    });
                    let finishT = new Date();
                    console.log(finishT - startT + "ms");
                    //drawStr(ctx, NRCX, NRCY, 30, "新纪录");
                    
                    //drawStr(ctx, 0, 0, 30, "New Record");
                    //ctx.fillStyle = 'red';
                    //ctx.fillText("xjl", 20, 20);
//                    console.log("aftr this");
                } else {
                    //
                }
                //const scvs = wx.getSharedCanvas();
                //const ctx = scvs.getContext("2d");
                //drawStr(ctx, 50, 50, 40, "最高纪录：" + Math.max(oriScore, g_curScore));
                //ctx.fillStyle = "blue";
                //ctx.fillRect(0, 0, 200, 200);
                //console.log("draw lo~");
            },
            fail: function(){
                console.log("fuck");
            }
            }
        );*/
        const scvs = wx.getSharedCanvas();
        const ctx = scvs.getContext("2d");
        if (g_curScore > g_maxScore){
            g_preMaxScore = g_maxScore;
            g_maxScore = g_curScore;
            drawImg(ctx, NRCX, NRCY, NEWRCIMGSRC);
//            drawStr(ctx, 236, 163, 50, "新纪录！", "red");
//            drawStr(ctx, 39, 502, 30, "个人纪录：" + g_maxScore, "red");
            for (let i = 0; i < MAXUPLOAD; ++i)
                wx.setUserCloudStorage({
                    KVDataList: new Array({key: "score", value: g_maxScore.toString()})
                });
            g_timer2ID = setInterval(function(){
            wx.setUserCloudStorage({
                KVDataList: new Array({ key: "score", value: g_maxScore.toString() }),
                success: function (){
//                    console.log("set finish");
                  clearInterval(g_timer2ID);
                },
                fail: function(){
//                    console.log("fuck wx nmsl");
                }
            });
            }, RETRYTIME);
        } //else drawStr(ctx, 27, 502, 20, "个人纪录：" + g_maxScore, "red");
        
//        console.log("finish");
    }
    if (data.command == "checkranking"){
      if (g_curData == undefined){
          /*
        g_timerID = setInterval(function (){
          if (g_curData != undefined) clearInterval(g_timerID);
        }, DELAYTIME);
        return ;
        */
        /*
        wx.showToast({
            title: "排行榜正在加载中 请稍后再试",
            icon: "success",
            duration: 2500
        });
        */
        //
          const scvs = wx.getSharedCanvas();
          const ctx = scvs.getContext("2d");
//        drawStr(ctx, 10, 10, 30, "cao NI MA WX");
          drawStr(ctx, NAMEX, strpos[0], 20, "排行榜加载失败");
          drawStr(ctx, NAMEX, strpos[1], 20, "  请稍后再试");
        return ;
      }
      /*
        wx.showToast({
            title: "排行榜jzwc",
            icon: "success",
            duration: 2500
        });
        */
//        g_ctx = data.context;
//        g_ctx.fillStyle = "white";
//        g_ctx.fillRect(0, 0, 100, 100);
        //let curScore = 0, userurl = "", username = "";
        /*wx.getUserCloudStorage({
                keyList: new Array("score"),
                success: (data) => { curScore = getScore(data); }
            }
        );
        /*
        wx.getUserInfo({
            withCredntials: false,
            lang: "zh_CN",
            success: function (res){
                console.log("success");
                userurl = res.userInfo.avatarUrl;
                username = res.userInfo.nickname;
            }
        });
        */
        //setTimeout(function(){
        
//        wx.getFriendCloudStorage({
//            keyList: new Array("score"),
//            success: (res) => {
//                console.log("getting in ~");
              let data = g_curData;
//                console.log(data.__proto__);
              var ar = new Array();
//                console.log(data.length);
                //console.log("id = " + g_curOpenId);
              for (let i = 0; i < data.length; ++i){
                  let cscore = getScore(data[i].KVDataList);
                  //console.log(data[i].openid);
                  if (data[i].nickname == g_curOpenId && cscore == g_preMaxScore){
                        cscore = g_maxScore;
//                        console.log("fffff");
                  }
                  ar.push({name : data[i].nickname, score : cscore});
              }
              sort(ar);
              let sfRank = ar.length;
              for (let i = 0; i < ar.length; ++i)
                  if (ar[i].score - g_maxScore <= 0){ sfRank = i; break; }
              ++sfRank;
              const scvs = wx.getSharedCanvas();
              const ctx = scvs.getContext("2d");
              let curlength = Math.min(5, ar.length);
                //ar[curlength++] = {url : "", name : "我", score : curScore};
                //var tmp = ar[0];
                //if (tmp == undefined) console.log("fuck");
              for (let i = 0; i < curlength; ++i){
                    //drawStr(ctx, RANKX, strpos[i], 30, i + 1);
                    //drawImg(ctx, HEADX, imgpos[i], ar[i].url);
                  drawStr(ctx, NAMEX, strpos[i], 20, adjustName(ar[i].name));
                  drawStr(ctx, SCOREX, strpos[i], 20, adjScore(ar[i].score));
              }
              drawStr(ctx, SF_RKX, SF_RKY, 20, sfRank, "black");
              drawStr(ctx, SF_SCX, SF_SCY, 20, adjScore(g_maxScore), "black");
            }
//            ,
//            fail: function(){
//                console.log("fuck wx nnnnmssssssssl");
//            }
//        });
        //}, NETPING);
//    }
});
