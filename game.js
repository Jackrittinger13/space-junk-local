class Game {
  constructor() {
    this.magpie = new Magpie();
    this.mothership = new Mothership();
    this.level = new Level();
    this.inputs = new Inputs(this);
    this.finished = false;
    this.score = 0;
  }
move(delta) {
  if (this.finished) return;
    this.inputs.handleKeyDown(delta);
    this.magpie.move(delta);
    this.mothership.physics.move(delta);
  for (const junk of this.level.junk) {
    junk.physics.move(delta);
    }
    if (this.magpie.beamOn && this.magpie.capturedJunk === null) {
      let caught = this.resolveBeam(delta);
    if (caught !== null) {
      this.level.junk = this.level.junk.filter(junk => junk !== caught);
      this.magpie.captureJunk(caught);
      caught.dropoffTime = 0;
      }
    } else {
      for (const junk of this.level.junk) {
        junk.beamTime = max(0, junk.beamTime - delta);
     }
    }
    if (this.resolveDropoff(delta)) {
      this.magpie.capturedJunk = null;
      this.updateScore("dropoff");
    }
    if (this.level.junk.length === 0 &&
      this.magpie.capturedJunk === null){
      this.finished = true;
      this.finishTime = millis()
    }
  }
  resolveBeam(delta) {
    let best = null;
    for (const junk of this.level.junk) {
    if (this.magpie.beamContains(junk.physics)) {
      junk.beamTime += delta;
      } else {
        junk.beamTime = max(0, junk.beamTime - delta);
      }
    if (junk.beamTime > Game.JUNK_CATCH_TIME_MS) {
    if (best === null || junk.beamTime > best.beamTime) {
        best = junk;
      }
    }
  }
  return best;
  }
  resolveDropoff(delta) {
    let junk = this.magpie.capturedJunk;
    if (junk === null) {
      return false;
    }
    let d = dist(junk.physics.x, junk.physics.y, this.mothership.physics.x, this.mothership.physics.y);
  if (d < Mothership.PICKUP_DIAMETER / 2) {
    junk.dropoffTime += delta;
    } else {
    junk.dropoffTime = max(0, junk.dropoffTime - delta);
   }
   return junk.dropoffTime >= Game.JUNK_DROPOFF_TIME_MS;
  }
  updateScore(reason) {
   if (reason === "dropoff") {
    this.score += Game.SCORE_DROPOFF;
    console.log("Score:", this.score);
    }
  }
draw() {
  background("#101827");
  randomSeed(22);
  noStroke();
  for (let i = 0; i < 70; i++) {
    fill(220, 230, 255, 180);
    circle(random(width), random(height), random(1, 3));
  }
  this.level.draw();
  this.mothership.drawMothership();
  this.magpie.drawMagpie();
  push();
  fill(255);
  noStroke();
  textSize(24);
  textAlign(RIGHT, TOP);
  text("Score: " + this.score, width - 20, 20);
  pop();
  push();
  fill("white");
  noStroke();
  textAlign(LEFT, TOP);
  textSize(16);
  text("SPACE JUNK", 15, 45);
  text("Junk remaining: " + this.level.junk.length, 15, 65);
  text("WASD = fly | SPACE = beam | ~ = debug", 15, height - 25);
if (this.magpie.beamOn) {
  fill("#f5f370");
  text("TRACTOR BEAM ON", 15, 85);
  }
  pop();
if (Game.DEBUG) {
  this.drawDebug();
  }
if (this.finished) {
  push();
  fill("#b9ffcb");
  textAlign(CENTER, CENTER);
  textSize(40);
  text("All clear!", width / 2, height / 2);
  textSize(18);
  text("Final score: " + this.score, width / 2, height / 2 + 35);
  pop();
  }
}
drawDebug() {
  fill("white");
  textAlign(LEFT, TOP);
  textSize(12);
  text("Ship velocity: " + round(this.magpie.physics.dx) + ", " + round(this.magpie.physics.dy), 15, 90);
for (const junk of this.level.junk) {
  text("Beam: " + round(junk.beamTime) + "ms", junk.physics.x + 10, junk.physics.y - 10);
}
if (this.magpie.capturedJunk !== null) {
  text("Dropoff: " + round(this.magpie.capturedJunk.dropoffTime) + "ms", 15, 110);
  }
 }
}
Game.JUNK_CATCH_TIME_MS = 500;
Game.JUNK_DROPOFF_TIME_MS = 1000;
Game.SCORE_DROPOFF = 100;
Game.JUNK_COUNT = 12;
Game.DEBUG = false;
