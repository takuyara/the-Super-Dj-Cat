import coll from "coll.js";
import pic from "picture.js";
import gamestatue from "km.js";
const FISHSRC = "fish.png";
const FISHWIDTH = 100;
const FISHHEIGHT = 74;
const FISHSCORE = 5;
const DLTX = 30;
const DLTY = 60;
const fishImage = new pic(FISHSRC);
export default class fish extends coll {
    constructor(poz) {
        super(fishImage, FISHWIDTH, FISHHEIGHT, poz);
    }
    collide(km) {
        this.ava = false;
        km.score += FISHSCORE;
        return {x: this.x + DLTX, y: this.y - DLTY};
    }
}
