class Level {
  constructor() {
  this.junk = [];
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
  draw() {
    for (const junk of this.junk) {
      junk.drawJunk();
  }
 }
}
