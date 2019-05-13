//the player is playing
const GAMEING = 0;
//already over, not started
const GAMEOVER = 1;
//not started yet
const GAMEPENDING = 2;
//viewing description
const GAMESETSUMEI = 3;
export default class gamestatue{
    constructor(){
        this.at = GAMEPENDING;
    }
    start(){
        this.score = 0;
        this.at = GAMEING;
    }
} ;
