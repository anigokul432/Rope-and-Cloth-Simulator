function Configuration1() {
    ipoints.splice(0,ipoints.length);
    segments.splice(0, segments.length);

    let spacing = 25;
    for(let i = 0; i < 20; i++){
        ipoints[i] = new Point(createVector(50 + i * spacing, 50));
    }
    ipoints[19].locked = true;

    for(let i = 0; i < ipoints.length - 1; i++){
        segments[i] = new Segment(ipoints[i], ipoints[i+1]);
    }
}

function Configuration2() {
    ipoints.splice(0,ipoints.length);
    segments.splice(0,segments.length);

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
}

function Configuration3() {

}

