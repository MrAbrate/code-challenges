function Segment(pos, heading, hue, siblings, parent) {
  this.blockSize = settings.blockSize;
  this.columns = settings.columns;
  this.rows = settings.rows;
  this.size = this.blockSize;
  this.pos = pos;
  this.heading = heading;
  this.hue = hue;
  this.siblings = siblings;
  this.parent = parent
}

Segment.prototype.index = function () {
  return this.siblings.indexOf(this);
};

Segment.prototype.remove = function () {
  this.siblings.splice(this.siblings.indexOf(this), 1);
};

Segment.prototype.update = function () {
  if (this.particles) {
    this.particles.forEach(particle => particle.move());
    
    const neighbor = this.siblings[this.index() + 1];
    if (neighbor && !neighbor.particles) {
      neighbor.explode();
    }
    
    const particle = this.particles.find(p => p.alpha > 0);
    if (!particle) {
      this.remove();
    }
    return;
  } 
  
  if (!this.siblings[0].particles) {
    this.move();
  }
};

Segment.prototype.move = function () {
  this.pos = p5.Vector.add(this.pos, this.heading);

  // teleport x-axis on edge
  this.pos.x %= width;
  if (this.pos.x < 0) {
    this.pos.x += width;
  }

  // teleport y-axis on edge
  this.pos.y %= height;
  if (this.pos.y < 0) {
    this.pos.y += height;
  }

  const i = this.index();
  if (i > 0) {
    this.heading = this.siblings[i - 1].heading;
  }
}

Segment.prototype.show = function () {
  if (this.particles) {
    this.particles.forEach((particle) => particle.show());
    return;
  }
  fill(color(this.hue, 70, 100));
  ellipse(this.pos.x, this.pos.y, this.size, this.size);
};

Segment.prototype.explode = function () {
  this.particles = [];
  for (let i = 0; i < 20; i += 1) {
    const x = this.pos.x + this.size / 2;
    const y = this.pos.y + this.size / 2;
    this.particles.push(new Particle(x, y));
  }
};
