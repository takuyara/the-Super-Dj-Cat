const gameWidth = 320;
const gameHeight = 580;
//const NUMBERHEIGHT = 15;
function adj(x) { if (x < 0) return -x; return x; }
const xdlt = Math.trunc(adj(wx.getSystemInfoSync().screenWidth - gameWidth) / 2);
const ydlt = Math.trunc(adj(wx.getSystemInfoSync().screenHeight - gameHeight) / 2);
export default class numberPrt{
    constructor (ctx, x, y, sz, num, col = "#000000"){
        ctx.fillStyle = col;
        ctx.font = sz + "px Arial";
//        console.log((x + xdlt) + " " + (y + ydlt));
        ctx.fillText(num, x + xdlt, y + ydlt);
    }
}
