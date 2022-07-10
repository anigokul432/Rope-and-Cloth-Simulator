class Point{
    constructor(pos){
        this.pos = pos.copy();
        this.prevPos = pos.copy();
        this.locked = false;
        this.r = 7;
    }

    show(){
        if(this.locked) {
            fill(255,100,100);
        }
        else{
            fill(255);
        }
        noStroke();
        circle(this.pos.x,this.pos.y,2*this.r);
    }
}