class Magpie {
  constructor() {
  this.physics = new Physics(width / 2, height / 2);
  this.beamOn = false;
  this.capturedJunk = null;
}
enableBeam(on) {
if (this.capturedJunk !== null) {
  this.beamOn = false;
    } else {
  this.beamOn = on;
  }
}
captureJunk(junk) {
  this.capturedJunk = junk;
  this.beamOn = false;
}
  move(delta) {
  this.physics.move(delta);
if (this.capturedJunk !== null) {
  let junk = this.capturedJunk;
 junk.physics.x = this.physics.x + sin(this.physics.rotation) * Magpie.CARGO_Y;
 junk.physics.y = this.physics.y + cos(this.physics.rotation) * Magpie.CARGO_Y;
  }
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
   let halfWidth = ((localY - 8) / (Magpie.BEAM_HEIGHT - 8)) *m(Magpie.BEAM_WIDTH / 2);
    return abs(localX) <= halfWidth;
  }
  drawMagpie() {
if (this.capturedJunk !== null) {
   this.capturedJunk.drawJunk();
  }
   push();
   translate(this.physics.x, this.physics.y);
if (this.beamOn) {
   push();
   rotate(this.physics.rotation);
   noStroke();
   fill("#f5f37040");
   triangle(0, 7, -Magpie.BEAM_WIDTH / 2, Magpie.BEAM_HEIGHT, Magpie.BEAM_WIDTH / 2, Magpie.BEAM_HEIGHT);
   pop();
  }
   rotate(this.physics.rotation);
   rectMode(CENTER);
   noStroke();
   fill("#b8c9d8");
   rect(0, 0, Magpie.DOME_WIDTH, Magpie.DOME_HEIGHT, 9);
   fill("#65798c");
   rect(0, Magpie.DOME_HEIGHT / 2 + Magpie.PLATFORM_HEIGHT / 2 - 1, Magpie.PLATFORM_WIDTH, Magpie.PLATFORM_HEIGHT, 2);
   fill("#54e5ed");
   rect(Magpie.DOME_WIDTH / 2 - Magpie.WINDOW_WIDTH / 2 - 2, -1, Magpie.WINDOW_WIDTH, Magpie.WINDOW_HEIGHT, 3);
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
Magpie.CARGO_Y = 25;
