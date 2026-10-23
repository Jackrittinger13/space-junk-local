class Magpie {
constructor() {
  this.physics = new Physics(width / 2, height / 2);
  this.beamOn = false;
}
enableBeam(on) {
  this.beamOn = on;
}
beamContains(point) {
  let dx = point.x - this.physics.x;
  let dy = point.y - this.physics.y;
  let c = cos(this.physics.rotation);
  let s = sin(this.physics.rotation);
  let localX = dx * c + dy * s;
  let localY = -dx * s + dy * c;
 if (localY < 8 || localY > Magpie.BEAM_HEIGHT) {
   return false;
}
 let halfWidth =
  ((localY - 8) / (Magpie.BEAM_HEIGHT - 8)) *
  (Magpie.BEAM_WIDTH / 2);
   return abs(localX) <= halfWidth;
}
drawMagpie() {
  push();
  translate(this.physics.x, this.physics.y);
 if (this.beamOn) {
  push();
  rotate(this.physics.rotation);
  noStroke();
  fill("#f5f37040");
  triangle(0, 7,
  -Magpie.BEAM_WIDTH / 2, Magpie.BEAM_HEIGHT, Magpie.BEAM_WIDTH / 2,              Magpie.BEAM_HEIGHT);
  pop();
}
  rotate(this.physics.rotation);
  rectMode(CENTER);
  noStroke();
  fill("#b8c9d8");
  rect(0, 0, Magpie.DOME_WIDTH, Magpie.DOME_HEIGHT, 9);
  fill("#65798c");
  rect(0, Magpie.DOME_HEIGHT / 2 + Magpie.PLATFORM_HEIGHT / 2 - 1,
   Magpie.PLATFORM_WIDTH, Magpie.PLATFORM_HEIGHT, 2);
  fill("#54e5ed");
  rect(Magpie.DOME_WIDTH / 2 - Magpie.WINDOW_WIDTH / 2 - 2,-1,
   Magpie.WINDOW_WIDTH, Magpie.WINDOW_HEIGHT, 3);
  fill("#f3c969");
  circle(0, -Magpie.DOME_HEIGHT / 2 + 3, 5);
  pop();
 }
}
Magpie.DOME_WIDTH = 34;
Magpie.DOME_HEIGHT = 30;
Magpie.PLATFORM_WIDTH = 42;
Magpie.PLATFORM_HEIGHT = 7;
Magpie.WINDOW_WIDTH = 9;
Magpie.WINDOW_HEIGHT = 12;
Magpie.BEAM_WIDTH = 100;
Magpie.BEAM_HEIGHT = 125;

