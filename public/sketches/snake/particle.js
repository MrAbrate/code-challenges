function Particle(x, y) {
  this.pos = createVector(x ,y);
  this.size = floor(random(2, 6));
  
  // Big particles move slower on average
  var speed = map(this.size, 2, 5, 25, 10);

  // Send in random direction
  this.vel = p5.Vector.random2D().setMag(speed);
  this.alpha = 100;
  this.hue = random(100);
}

Particle.prototype.move = function () {
  // move the particle
  this.pos.add(this.vel);

  // Apply gravity
  this.vel.add(0, 5);

  // apply drag
  var drag = this.vel.copy();

  // apply more drag to smaller objects
  drag.setMag(map(this.size, 2, 5, -1.5, -0.5));

  this.vel.add(drag)
  this.alpha -= map(this.size, 2, 5, 8, 4);
};

Particle.prototype.show = function () {
  noStroke();
  fill(this.hue, 80, 100, this.alpha);
  rect(this.pos.x, this.pos.y, this.size, this.size);
};
