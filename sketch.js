let game;
let lastFrameTime = 0;
function setup() {
  createCanvas(800, 600);
  angleMode(RADIANS);
  game = new Game();
  lastFrameTime = millis();
}
function draw() {
  let now = millis();
  let delta = min(now - lastFrameTime, 50);
  lastFrameTime = now;
  game.move(delta);
  game.draw();
}


