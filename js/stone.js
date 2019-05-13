import coll from "coll.js";
import pic from "picture.js";
import gamestatue from "km.js";
const GAMEOVER = 1;
const STONEWIDTH = 100;
const STONEHEIGHT = 59;
const STONESRC = "stone.png";
const stoneImage = new pic(STONESRC);
export default class stone extends coll{
    constructor(pos){
        super(stoneImage, STONEWIDTH, STONEHEIGHT, pos);
    }
    collide(km){
        this.ava = false;
        km.at = GAMEOVER;
//        console.log("游戏结束，得分" + km.score);
    }
}
