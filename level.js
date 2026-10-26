class Level {
  constructor() {
  this.junk = [];
  this.startTime = millis();
for (let i = 0; i < Game.JUNK_COUNT; i++) {
  let x = random(30, width - 30);
  let y = random(30, height - 30);
if (dist(x, y, width / 2, height / 2) < 100) {
  x = (x + 150) % width;
  y = (y + 150) % height;
}
  let dx = random(-20, 20);
  let dy = random(-20, 20);
  this.junk.push(new Junk(x, y, dx, dy));
  }
}
timeLeft() {
  let elapsed = millis() - this.startTime;
  if (typeof game !== "undefined" && game.finished) {
    elapsed = game.finishTime - this.startTime;
 }
 let remaining = 120000 - elapsed;
if (remaining < 0) {
    remaining = 0;
 }
return remaining;
}
draw() {
    // TIMER - top left
    fill("white");
    noStroke();
    textSize(20);
    textAlign(LEFT, TOP);
  let totalSeconds = Math.ceil(this.timeLeft() / 1000);
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  let timerText = minutes + ":" + String(seconds).padStart(2, "0");
    text(timerText, 15, 15);
;
  let score = 0;
if (typeof game !== "undefined" && game !== null) {
  score = game.score;
  }
for (let i = 0; i < 2; i++) {
    push();
    translate(25 + i * 35, height - 25);
    scale(0.4);
    rectMode(CENTER);
    noStroke();
    fill("#b8c9d8");
    rect(0, 0, 34, 30, 9);
    fill("#65798c");
    rect(0, 17, 42, 7, 2);
    fill("#54e5ed");
    rect(8, -1, 9, 12, 3);
    fill("#f3c969");
    circle(0, -12, 5);
    pop();
  }
for (const junk of this.junk) {
  junk.drawJunk();
  }
 }
}
Level.HUD_TEXT_SIZE = 20;
Level.HUD_PAD = 15;
Level.LIVES_SCALE = 0.4;
Level.LIVES_PAD_LEFT = 25;
Level.LIVES_PAD_BOTTOM = 25;
Level.LIVES_GAP = 35;
