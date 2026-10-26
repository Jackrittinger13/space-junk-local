class Mothership {
constructor() {
  this.physics = new Physics(105, height / 2, 7, 5);
}
drawMothership() {
  push();
  translate(this.physics.x, this.physics.y);
  rotate(this.physics.rotation);
if (Game.DEBUG) {
  noFill();
  stroke("#b9ffcb");
  circle(0, 0, Mothership.PICKUP_DIAMETER);
  }
  rectMode(CENTER);
  noStroke();
  fill("#657b91");
  rect(0, 0, Mothership.WIDTH, Mothership.HEIGHT, Mothership.CORNER_RADIUS);
  let spacing = Mothership.WIDTH / (Mothership.NUM_PORTHOLES + 1);
for (let i = 0; i < Mothership.NUM_PORTHOLES; i++) {
  let x = -Mothership.WIDTH / 2 + spacing * (i + 1);
  fill("#172a40");
  circle(x, 0, Mothership.PORTHOLE_DIAMETER);
  fill("#b6f3f4");
  circle(x - 1, -1, 4);
  }
  pop();
 }
}
Mothership.WIDTH = 110;
Mothership.HEIGHT = 38;
Mothership.CORNER_RADIUS = 12;
Mothership.NUM_PORTHOLES = 5;
Mothership.PORTHOLE_DIAMETER = 10;
Mothership.PICKUP_DIAMETER = 160;
