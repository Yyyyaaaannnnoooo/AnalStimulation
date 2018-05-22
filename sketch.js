const TOTAL = 75;
let a = 1;
let b = 1
let globe;
let m = 0;
let mchange = 0;
let toothBrush;
let textureToothBrush;
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
  let x = map(mouseX, 0, width, -width / 2, 0);
  let radius = map(mouseX, 0, width, 10, 13);
  let detailX = map(mouseY, 0, height, 3, 100);
  rotateX(PI/4);
  push();
  // rotateZ(frameCount * 0.01);
  // rotateX(frameCount * 0.01);
  rotateX(PI/2);
  // rotateY(frameCount * 0.01);
  rotateZ(frameCount * 0.1);
  // rotateY(frameCount * 0.1);
  // cylinder(30, 320, 24, 1, false, false);

  normalMaterial();
  torus(20, radius);
  translate(0, 0, x);
  // texture(textureToothBrush);
  rotateX(-PI/2);
  model(toothBrush);
  pop();
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

function supershape(theta, m, n1, n2, n3) {
  let t1 = abs((1 / a) * cos(m * theta / 4));
  t1 = pow(t1, n2);
  let t2 = abs((1 / b) * sin(m * theta / 4));
  t2 = pow(t2, n3);
  let t3 = t1 + t2;
  let r = pow(t3, - 1 / n1);
  return r;
}

function calculateShape() {
  let r = 200;
  for (let i = 0; i < TOTAL + 1; i++) {
    let lat = map(i, 0, TOTAL, -HALF_PI, HALF_PI);
    let r2 = supershape(lat, m, 0.2, 1.7, 1.7);
    //let r2 = supershape(lat, 2, 10, 10, 10);
    for (let j = 0; j < TOTAL + 1; j++) {
      let lon = map(j, 0, TOTAL, -PI, PI);
      //let r1 = supershape(lon, m, 0.2, 1.7, 1.7);
      let r1 = supershape(lon, 8, 60, 100, 30);
      let x = r * r1 * cos(lon) * r2 * cos(lat);
      let y = r * r1 * sin(lon) * r2 * cos(lat);
      let z = r * r2 * sin(lat);
      globe[i][j] = createVector(x, y, z);
    }
  }
}

function makeShape() {
  for (let i = 0; i < TOTAL; i++) {
    let hu = map(i, 0, TOTAL, 0, 255 * 6);
    // fill((hu + offset) % 255 , 255, 255);
    beginShape();
    for (let j = 0; j < TOTAL + 1; j++) {
      let v1 = globe[i][j];
      vertex(v1.x, v1.y, v1.z);
      let v2 = globe[i + 1][j];
      vertex(v2.x, v2.y, v2.z);
    }
    endShape();
  }
}

function Array2D(cols, rows, val) {
  let arr = [];
  for (let x = 0; x < cols; x++) {
    arr[x] = [];
    for (let y = 0; y < rows; y++) {
      arr[x][y] = val;
    }
  }
  return arr;
}