class Physics {
constructor(x, y, dx = 0, dy = 0, rotation = 0) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.rotation = rotation;
}
move(delta) {
 let seconds = delta / 1000;
  this.x += this.dx * seconds;
  this.y += this.dy * seconds;
 if (this.x < 0) {
  this.x = width;
}
 if (this.x > width) {
  this.x = 0;
}
 if (this.y < 0) {
  this.y = height;
}
 if (this.y > height) {
  this.y = 0;
 }
}
rotate(rate, delta) {
  this.rotation += rate * (delta / 1000);
}
thrust(accel, delta) {
 let amount = accel * (delta / 1000);
  this.dx += amount * sin(this.rotation);
  this.dy -= amount * cos(this.rotation);
 }
}
