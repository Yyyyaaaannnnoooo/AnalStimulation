const TOTAL = 75;
let a = 1;
let b = 1
let globe;
let m = 0;
let mchange = 0;
let toothBrush;
let textureToothBrush;
let inc = Math.PI / 200;
let incSin = 0;
function preload(){
  toothBrush = loadModel('data/Toothbrush_Turbosquid.obj', true, data => console.log(data), event => console.log(event));
  textureToothBrush = loadImage('data/Colgate_Tootbrush.jpg');
}
function setup() {
  createCanvas(innerWidth, innerHeight, WEBGL);
}

function draw() {
  background(0);
  noStroke();
  scale(2);
  // ambientLight(100, 0, 0);
  let x = map(mouseX, 0, width, -width / 4, 0);
  let radius = 13 + abs(sin(incSin) * 2);
  let detailX = map(mouseY, 0, height, 3, 100);
  rotateX(PI * 0.35);
  rotateZ(PI / 5);
  push();
  // rotateZ(frameCount * 0.01);
  // rotateX(frameCount * 0.01);
  rotateX(PI/2);
  // rotateY(frameCount * 0.01);
  // rotateZ(frameCount * 0.05);
  // rotateY(frameCount * 0.001);
  // cylinder(30, 320, 24, 1, false, false);

  normalMaterial();
  torus(25, radius);
  translate(0, 0, x);
  rotateZ(frameCount * 0.05);
  // texture(textureToothBrush);
  rotateX(-PI/2);
  model(toothBrush);
  pop();
  incSin += inc;
  // push();
  // rotateZ(frameCount * 0.01);
  // rotateX(frameCount * 0.01);
  // rotateY(frameCount * 0.01);
  // pop();
  // text(frameRate(), -300, 0);
  // document.getElementById('frameRate').innerHTML = frameRate()
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight, WEBGL);
}