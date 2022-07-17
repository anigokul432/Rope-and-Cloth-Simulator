const ipoints = [];
const segments = [];
var gravity = 0.0004;
var numOfIterations = 5;  
let pointsAreSet;
let visualize = false;

let simButton;
let resetButton;
let pauseButton;
let CF1Button;
let CF2Button;
let iButton;

let fps;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  modal.style.display = "block";

  let bWidth = 120;
  let bOffset = 15;
  simButton = createButton("Simulate").size(bWidth,30);
  simButton.style('border', 0);
  simButton.style('background-color', '#146dcc');
  simButton.style('color', 'whitesmoke');
  simButton.style('border-radius', '5px');
  simButton.style('box-shadow', '0px 0px 5px 0 #111');
  simButton.style('font-family', "'Roboto', sans-serif");
  simButton.style('transition-duration', '0.15s');
  simButton.position(windowWidth/2 - (bWidth + bOffset/2) - 15,0 + bOffset);
  simButton.mouseOver(function changeColor() { simButton.style('background-color', '#277dd9'); });
  simButton.mouseOut(function changeColor() { simButton.style('background-color', '#146dcc'); });
  simButton.mousePressed(function changeColor() { simButton.style('background-color', '#175ba3') });
  simButton.mouseReleased(function isSetPoints() { 
    pointsAreSet = true; 
    simButton.style('background-color', '#146dcc');
  });

  resetButton = createButton("Reset").size(bWidth,30);
  resetButton.style('border', 0);
  resetButton.style('background-color', '#555');
  resetButton.style('color', 'whitesmoke');
  resetButton.style('border-radius', '5px');
  resetButton.style('box-shadow', '0px 0px 5px 0 #111');
  resetButton.style('font-family', "'Roboto', sans-serif");
  resetButton.style('transition-duration', '0.15s');
  resetButton.position(windowWidth/2 + bOffset/2 + 15,0 + bOffset);
  resetButton.mouseOver(function changeColor() { resetButton.style('background-color', '#666'); });
  resetButton.mouseOut(function changeColor() { resetButton.style('background-color', '#555'); });
  resetButton.mouseReleased(function changeColor() { resetButton.style('background-color', '#555');});
  resetButton.mousePressed(function ResetPoints() { 
    ipoints.splice(0, ipoints.length);
    segments.splice(0, segments.length);
    pointsAreSet = false; 
    resetButton.style('background-color', '#444');
  });

  pauseButton = createButton("| |").size(30,30);
  pauseButton.style('border', 0);
  pauseButton.style('background-color', '#555');
  pauseButton.style('color', 'whitesmoke');
  pauseButton.style('border-radius', '5px');
  pauseButton.style('box-shadow', '0px 0px 5px 0 #111');
  pauseButton.style('font-family', "'Work Sans', sans-serif");
  pauseButton.style('font-weight', "900");
  pauseButton.style('transition-duration', '0.15s');
  pauseButton.position(windowWidth/2-15,0 + bOffset);
  pauseButton.mouseOver(function changeColor() { pauseButton.style('background-color', '#666'); });
  pauseButton.mouseOut(function changeColor() { pauseButton.style('background-color', '#555'); });
  pauseButton.mouseReleased(function changeColor() { pauseButton.style('background-color', '#555');});
  pauseButton.mousePressed(function ResetPoints() { 
    pointsAreSet = false; 
    pauseButton.style('background-color', '#444');
  });

  CF1Button = createButton("Configuration 1").size(bWidth,30);
  CF1Button.style('border', 0);
  CF1Button.style('background-color', '#EEE');
  CF1Button.style('color', '#111');
  CF1Button.style('border-radius', '5px');
  CF1Button.style('box-shadow', '0px 0px 5px 0 #111');
  CF1Button.style('font-family', "'Roboto', sans-serif");
  CF1Button.style('transition-duration', '0.15s');
  CF1Button.position(windowWidth - bWidth - bOffset, bOffset);
  CF1Button.mouseOver(function changeColor() { CF1Button.style('background-color', '#DDD'); });
  CF1Button.mouseOut(function changeColor() { CF1Button.style('background-color', '#EEE'); });
  CF1Button.mouseReleased(function changeColor() { CF1Button.style('background-color', '#EEE');});
  CF1Button.mousePressed(function changeColor() { CF1Button.style('background-color', '#AAA'); });
  CF1Button.mouseClicked(Configuration1);

  CF2Button = createButton("Configuration 2").size(bWidth,30);
  CF2Button.style('border', 0);
  CF2Button.style('background-color', '#EEE');
  CF2Button.style('color', '#111');
  CF2Button.style('border-radius', '5px');
  CF2Button.style('box-shadow', '0px 0px 5px 0 #111');
  CF2Button.style('font-family', "'Roboto', sans-serif");
  CF2Button.style('transition-duration', '0.15s');
  CF2Button.position(windowWidth - bWidth - bOffset, 1.5*bOffset + 30);
  CF2Button.mouseOver(function changeColor() { CF2Button.style('background-color', '#DDD'); });
  CF2Button.mouseOut(function changeColor() { CF2Button.style('background-color', '#EEE'); });
  CF2Button.mouseReleased(function changeColor() { CF2Button.style('background-color', '#EEE');});
  CF2Button.mousePressed(function changeColor() { CF2Button.style('background-color', '#AAA'); });
  CF2Button.mouseClicked(Configuration2);

  iButton = createButton("i").size(30,30);
  iButton.style('border-radius', "15px");
  iButton.style('font-size', "20px");
  iButton.style('background-color', '#000');
  iButton.style('border', 0);
  iButton.style('color', 'whitesmoke');
  iButton.style('font-weight', 'bold');
  iButton.style('opacity', '0.5');
  iButton.style('font-family', "'Roboto', serif");
  iButton.style('transition-duration', '0.15s');
  iButton.position(bOffset, bOffset);
  iButton.mouseOver(function changeColor() { iButton.style('opacity', '0.9'); });
  iButton.mouseOut(function changeColor() { iButton.style('opacity', '0.5'); });
  iButton.mouseReleased(function changeColor() { iButton.style('background-color', '#000');});
  iButton.mousePressed(function changeColor() { iButton.style('background-color', '#333'); });
  iButton.mouseClicked(function display() { modal.style.display = "block"; });

}

function draw() {
  background(40);

  if(pointsAreSet){
    Simulate();
  }else{
    DrawGrid();
  }

  for(let i = 0; i < segments.length; i++){
    segments[i].show();
  }

  for(let i = 0; i < ipoints.length; i++){
    ipoints[i].show();
  }

  if(!pointsAreSet && visualize){
    fill(255,50);
    noStroke();
    circle(start.x, start.y, 14);
    circle(mouseX, mouseY, 14);
    stroke(200,50);
    strokeWeight(3);
    line(start.x,start.y,mouseX, mouseY);
  }

  //draw fps
  fps = frameRate();
  fill(255);
  stroke(0);
  text("FPS: " + fps.toFixed(2), 10, height - 10);

}

let start;
let end;
let startIndex = 0;
let endIndex;
let spFound;

function mousePressed() {
  if(pointsAreSet) return;
  start = createVector(mouseX, mouseY);

  for(let i = 0; i < ipoints.length; i++){
    if(dist(start.x, start.y, ipoints[i].pos.x, ipoints[i].pos.y) <= ipoints[i].r){
      spFound = true;
      start = ipoints[i].pos;
      startIndex = i;
      break;
    }
  }

  visualize = true;
}

function mouseClicked(){
  if(pointsAreSet) return;

  end = createVector(mouseX, mouseY);

  appropriateSize = dist(start.x, start.y, end.x, end.y) > 10;

  if(appropriateSize){
    let startP = new Point(start.copy());
    let endP = new Point(end.copy());

    if(ipoints.length == 0 || !spFound){
      ipoints.push(startP);
      startIndex = ipoints.length - 1;
    }

    let pointFound;
    for(let i = 0; i < ipoints.length; i++){
      if(dist(end.x, end.y, ipoints[i].pos.x, ipoints[i].pos.y) <= ipoints[i].r){
        pointFound = true;
        endIndex = i;
        break;
      }
    }

    if(!pointFound){
      ipoints.push(endP);
      endIndex = ipoints.length - 1;
    }

    segments.push(new Segment(ipoints[startIndex], ipoints[endIndex]));
  }else{
    for(let i = 0; i < ipoints.length; i++){
      if(dist(mouseX, mouseY, ipoints[i].pos.x, ipoints[i].pos.y) <= ipoints[i].r){
        ipoints[i].locked = !ipoints[i].locked;
        break;
      }
    }
  }

  spFound = false;
  visualize = false;
}

function Simulate() {
  const points = shuffle(ipoints);
  for(let i = 0; i < points.length; i++){
    if(!points[i].locked){
      let initPos = points[i].pos.copy();
      points[i].pos.add(points[i].pos.copy().sub(points[i].prevPos.copy()));
      points[i].pos.add(createVector(0,1).mult(gravity * deltaTime * deltaTime));
      points[i].prevPos = initPos.copy();
    }
  }
  for(let iter = 0; iter < numOfIterations; iter++){
    for(let i = 0; i < segments.length; i++){
      let segmentCenter = segments[i].a.pos.copy().add(segments[i].b.pos.copy()).mult(0.5);
      let segmentDir = segments[i].a.pos.copy().sub(segments[i].b.pos.copy()).copy().normalize();
      if(!segments[i].a.locked){
        segments[i].a.pos = segmentCenter.copy().add(segmentDir.copy().mult(segments[i].length/2));
      }
      if(!segments[i].b.locked){
        segments[i].b.pos = segmentCenter.copy().sub(segmentDir.copy().mult(segments[i].length/2));
      }
    }
  }

  //scissor mouse
  if(mouseIsPressed){
    for(var i = 0; i < segments.length; i++){
      let segmentCenter = segments[i].a.pos.copy().add(segments[i].b.pos.copy()).mult(0.5);
      if(dist(mouseX,mouseY,segmentCenter.x,segmentCenter.y) < 16){
        segments.splice(i,1);
      }
    }
  }

  for(let i = 0; i < points.length; i++){
    points[i].show();
  }
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    //swap
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function DrawGrid(){
  let gridSize = 25;
  
  strokeWeight(2);
  for(let i = 0; i < windowWidth; i += gridSize) {
    if(i%2==0) stroke(255,20);
    else stroke(255,10);
    line(i,0,i,windowHeight);
  }
  for(let i = 0; i < windowHeight; i+= gridSize) {
    if(i%2==0) stroke(255,20);
    else stroke(255,10);
    line(0,i,windowWidth,i);
  }
}
