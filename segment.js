class Segment{
    constructor(a,b){
        this.a = a;
        this.b = b;
        this.length = dist(this.a.pos.x,this.a.pos.y,this.b.pos.x,this.b.pos.y);        ;
    }

    show(){
        stroke(200);
        strokeWeight(3);
        line(this.a.pos.x,this.a.pos.y,this.b.pos.x,this.b.pos.y);
    }

}