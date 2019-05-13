export default class button{
    constructor(x1, y1, x2, y2, fr, tw){
        this.x1 = x1, this.y1 = y1;
        this.x2 = x2, this.y2 = y2;
        this.fr = fr, this.tw = tw;
    }
    check(x, y){
        if (this.x1 <= x && x <= this.x2)
            if (this.y1 <= y && y <= this.y2){
                this.fr.calloff();
                this.tw.callout();
            }
    }
}
