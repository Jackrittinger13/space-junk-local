class Game {
  constructor() {
    this.magpie = new Magpie();
    this.mothership = new Mothership();
    this.level = new Level();
    this.inputs = new Inputs(this);
    this.finished = false;
}
move(delta) {
  if (this.finished) return;
   this.inputs.handleKeyDown(delta);
   this.magpie.physics.move(delta);
   this.mothership.physics.move(delta);
  for (const junk of this.level.junk) {
      junk.physics.move(delta);
}
  if (this.magpie.beamOn) {
      let caught = this.resolveBeam(delta);
  if (caught !== null) {
      this.level.junk = this.level.junk.filter(
          junk => junk !== caught
  );
}
    } else {
      for (const junk of this.level.junk) {
        junk.beamTime = max(0, junk.beamTime - delta);
 }
}
  if (this.level.junk.length === 0) {
    this.finished = true;
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
    fill("white");
    textAlign(LEFT, TOP);
    textSize(16);
    text("SPACE JUNK", 15, 15);
    text("Junk remaining: " + this.level.junk.length, 15, 40);
    text("WASD = fly | SPACE = beam | ~ = debug", 15, height - 25);
  if (this.magpie.beamOn) {
    fill("#f5f370");
    text("TRACTOR BEAM ON", 15, 65);
}
  if (Game.DEBUG) {
    this.drawDebug();
}
  if (this.finished) {
    fill("#b9ffcb");
    textAlign(CENTER, CENTER);
    textSize(40);
    text("All clear!", width / 2, height / 2);
    textSize(16);
    text("Press R to restart", width / 2, height / 2 + 40);
 }
}
drawDebug() {
    fill("white");
    textAlign(LEFT, TOP);
    textSize(12);
    text(
"Ship velocity: " + round(this.magpie.physics.dx) + ", " + round(this.magpie.physics.dy), 15, 90);
  for (const junk of this.level.junk) {
  text("Beam: " + round(junk.beamTime) + "ms",junk.physics.x + 10,               junk.physics.y - 10
   );
  }
 }
}
Game.JUNK_CATCH_TIME_MS = 500;
Game.JUNK_COUNT = 12;
Game.DEBUG = false;



