function Morsel(pos, siblings) {
  this.blockSize = settings.blockSize;
  this.columns = settings.columns;
  this.rows = settings.rows;
  this.pos = pos;
  this.size = this.blockSize;
  this.siblings = siblings;
}

Morsel.prototype.show = function () {
  if (this.particles) {
    
    const particle = this.particles.find(p => p.alpha > 0);
    if (!particle) {
      this.remove();
    }
    
    this.particles.forEach(function (particle) {
      particle.move();
      particle.show();
    });
    return;
  }

  fill(255);
  rect(this.pos.x, this.pos.y, this.size, this.size);
}

Morsel.prototype.moveTo = function (pos) {
  this.pos = pos;
}

Morsel.prototype.touching = function (things) {
  things = [].concat(things);

  for (let i = 0; i < things.length; i += 1) {
    if (p5.Vector.dist(this.pos, things[i].pos) === 0) {
      return true;
    }
  }

  return false;
};

Morsel.prototype.eatenBy = function (snake) {
  if (snake.segments.length < 1) {
    return;
  }

  // Get distance from snake's head
  var d = p5.Vector.dist(this.pos, snake.segments[0].pos);

  if (d === 0) {
    return true;
  }
  return false;
};

Morsel.prototype.explode = function () {
  this.particles = [];
  for (let i = 0; i < 20; i += 1) {
    const x = this.pos.x + this.size / 2;
    const y = this.pos.y + this.size / 2;
    this.particles.push(new Particle(x, y));
  }
};

Morsel.prototype.index = function () {
  return this.siblings.indexOf(this);
}

Morsel.prototype.remove = function () {
  this.siblings.splice(this.index(), 1);
};