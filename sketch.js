const CIRC = 25;
const ANUS_ENTRANCE = -100;
const START_VALUE = 100;
const ANAL_TEXT = [
  'TRY TO PENETRATE THE ANUS...',
  'BIT HARDER',
  'TRY AGAIN',
  'USE A BIT OF GRACE',
  'JUST ABIT MORE',
  'OOOOOOOOOOOOOOOH!!!!'
]
let toothBrush;
let inc = Math.PI / 100;
let incSin = 0;
let rotate = false;
let x = 0;
let hit = true;
let analRadius = 0;
let analHit = 1;
let isStretched = false;
// INTRO VARS
let start = false;
let startCount = 0;
function preload() {
  toothBrush = loadModel('data/Toothbrush_Turbosquid.obj', true, data => console.log(data), event => console.log(event));
}
let cnv;
function setup() {
  cnv = createCanvas(innerWidth, innerHeight, WEBGL);
  cnv.parent('p5Sketch');
}

function draw() {
  background(0);
  noStroke();
  scale(2);
  if (start) {
    // check if the ANUS has been opened
    if (x > ANUS_ENTRANCE - 1 && hit && !isStretched) {
      analHit++;
      hit = false;
      console.log('hit');
    } else if (x < -110) {
      hit = true;
    }
    if (analHit > 5) isStretched = true;
    x = map(mouseX, 0, width, -width / 4, isStretched === false ? ANUS_ENTRANCE : 0);
    // radius = 13 + abs(sin(incSin) * 2);
    analRadius = CIRC - (1.5 * analHit);
    draw3DStuff();
    if(rotate)incSin += inc;
  } else {
    let w = map(startCount, 0, START_VALUE, 0, width);
    fill(0, 0, 255);
    rect(-width / 2, -height / 2, w, height);
  }
  /**
   * HERE WE UPDATE THE TEXT ABOUT THE SIMULATION
   */
  let demo = document.getElementById('demo');
  demo.innerHTML = ANAL_TEXT[analHit - 1];
  /**
   * LOADING PAGE CONTROLLER
   */
  if (mouseIsPressed) {
    startCount++;
    if (!start && startCount > START_VALUE) {
      document.getElementById('intro').style.display = 'none';
      document.getElementById('demo').style.display = 'block';
      start = true;
    }
  }
}
function mouseMoved() {
  // console.log(x);
}
function draw3DStuff() {
  rotateX(PI * 0.45);
  rotateZ(PI / 5);
  push();
  rotateX(PI / 2);
  normalMaterial();
  torus(CIRC, analRadius);
  translate(0, 0, x);
  rotateZ(incSin);
  rotateX(-PI / 2);
  model(toothBrush);
  pop();
}
function windowResized() {
  resizeCanvas(innerWidth, innerHeight, WEBGL);
}