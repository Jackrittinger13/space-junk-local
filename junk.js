class Junk {
  constructor(x, y, dx, dy) {
  this.physics = new Physics(x, y, dx, dy);
  this.beamTime = 0;
}
drawJunk() {
  push();
  translate(this.physics.x, this.physics.y);
  noStroke();
  fill("#f3a85b");
  circle(0, 0, Junk.DIAMETER);
  fill("#ffe3a6");
  circle(-2, -2, 3);
pop();
  if (Game.DEBUG) {
  noFill();
  stroke("#ffb45e");
  circle(this.physics.x, this.physics.y, Junk.DIAMETER + 5);
  }
 }
}
Junk.DIAMETER = 13;

