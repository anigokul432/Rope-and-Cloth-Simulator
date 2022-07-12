const ipoints = [];
const segments = [];
var gravity = .0004;
var numOfIterations = 5;  
let simButton;
let resetButton;
let pointsAreSet;
let visualize = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  let bWidth = 125;
  let bOffset = 15;
  simButton = createButton("Simulate").size(bWidth,30);
  simButton.style('border', 5);
  simButton.style('background-color', '#146dcc');
  simButton.style('color', 'whitesmoke');
  simButton.style('border-radius', '15px');
  simButton.style('box-shadow', '0px 0px 8px 0 #111')
  simButton.position(windowWidth/2 - (bWidth + bOffset),0 + bOffset);
  simButton.mouseReleased(function isSetPoints() { pointsAreSet = true; });

  resetButton = createButton("Reset").size(bWidth,30);
  resetButton.style('border', 5);
  resetButton.style('background-color', '#555');
  resetButton.style('color', 'whitesmoke');
  resetButton.style('border-radius', '15px');
  resetButton.style('box-shadow', '0px 0px 8px 0 #111')
  resetButton.position(windowWidth/2 + bOffset,0 + bOffset);
  resetButton.mousePressed(function isSetPoints() { 
    ipoints.splice(0, ipoints.length);
    segments.splice(0, segments.length);
    pointsAreSet = false; 
  });

  //Case 1
  // let spacing = 25;
  // for(let i = 0; i < 20; i++){
  //   ipoints[i] = new Point(createVector(50 + i * spacing, 50));
  // }
  // ipoints[11].locked = true;
  // ipoints[0].locked = true;

  // for(let i = 0; i < ipoints.length - 1; i++){
  //   segments[i] = new Segment(ipoints[i], ipoints[i+1]);
  // }

  //Case 2
  let spacing = 28;
  let gridSize = 22;
  for(let i = 0; i < gridSize * gridSize; i++){
    ipoints[i] = new Point(createVector(150 + (i%gridSize) * spacing, 50 + spacing * Math.floor(i/gridSize)));
  }
  ipoints[0].locked = true;
  ipoints[7].locked = true;
  ipoints[15].locked = true;
  ipoints[21].locked = true;

  for(let i = 0; i < (gridSize-1); i++){
    for(let j = 0; j < gridSize; j++){
      segments.push(new Segment(ipoints[i+j*gridSize], ipoints[(i+j*gridSize)+1]));
    }
  }

  for(let i = 0; i < (gridSize)*(gridSize-1); i++){
    segments.push(new Segment(ipoints[i], ipoints[i+gridSize]));
  }

  //Case 3
  // let spacing = 14;
  // let gridSize = 30;
  // for(let i = 0; i < gridSize * gridSize; i++){
  //   ipoints[i] = new Point(createVector(150 + (i%gridSize) * spacing, 50 + spacing * Math.floor(i/gridSize)));
  // }
  // //ipoints[0].locked = true;
  // ipoints[430].locked = true;

  // for(let i = 0; i < (gridSize-1); i++){
  //   for(let j = 0; j < gridSize; j++){
  //     segments.push(new Segment(ipoints[i+j*gridSize], ipoints[(i+j*gridSize)+1]));
  //   }
  // }

  // for(let i = 0; i < (gridSize)*(gridSize-1); i++){
  //   segments.push(new Segment(ipoints[i], ipoints[i+gridSize]));
  // }
}

function draw() {
  background(51);

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
  //frameRate(1);
  //noLoop();

  //console.log(ipoints.length);

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
  let fps = frameRate();
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
  for(var i = 0; i < segments.length; i++){
    let segmentCenter = segments[i].a.pos.copy().add(segments[i].b.pos.copy()).mult(0.5);
    if(dist(mouseX,mouseY,segmentCenter.x,segmentCenter.y) < 8){
      segments.splice(i,1);
    }
  }

  for(let i = 0; i < points.length; i++){
    points[i].show();
  }
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
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
