import coll from "coll.js";
import pic from "picture.js";
const NOTESRC = "note5.png";
import gamestatue from "km.js";
const NOTEWIDTH = 100;
const NOTEHEIGHT = 83;
const NOTESCORE = 1;
const noteImage = new pic(NOTESRC);
export default class note5 extends coll{
    constructor(poz){
        super(noteImage, NOTEWIDTH, NOTEHEIGHT, poz);
    }
    collide(km){
        this.ava = false;
        km.score += NOTESCORE;
    }
}
