let keysPressed = {};

function keyPressed() {
  keysPressed[key.toLowerCase()] = true;
  return false;
}
function keyReleased() {
  keysPressed[key.toLowerCase()] = false;
  return false;
}
class Inputs {
  constructor(game) {
    this.game = game;
}
handleKeyDown(delta) {
    let magpie = this.game.magpie;
 if (keysPressed["w"]) {
  magpie.physics.thrust(Inputs.THRUST, delta);
}
 if (keysPressed["s"]) {
  magpie.physics.thrust(-Inputs.REVERSE_THRUST, delta);
}
 if (keysPressed["a"]) {
  magpie.physics.rotate(-Inputs.TURN_RATE, delta);
}
 if (keysPressed["d"]) {
  magpie.physics.rotate(Inputs.TURN_RATE, delta);
}
  magpie.enableBeam(keysPressed[" "]);
 }
}
Inputs.THRUST = 150;
Inputs.REVERSE_THRUST = 75;
Inputs.TURN_RATE = 3.2;


