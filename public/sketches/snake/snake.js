function Snake() {
  this.blockSize = settings.blockSize;
  this.columns = settings.columns;
  this.rows = settings.rows;

  this.startPos = startPos = createVector(this.columns / 2 * this.blockSize, this.rows / 2 * this.blockSize);

  this.size = this.blockSize;
  this.killed = false;

  this.headings = {
    37: createVector(-this.size, 0),
    38: createVector(0, -this.size),
    39: createVector(this.size, 0),
    40: createVector(0, this.size)
  }

  this.segments = [];
  this.nextHeading = this.headings[37];

  this.segments[0] = new Segment(
    this.startPos,
    this.nextHeading,
    60,
    this.segments,
    this
  );
}

Snake.prototype.show = function () {
  this.segments.forEach(function (seg) {
    seg.show();
  });
};

Snake.prototype.keyPressed = function (keyCode) {
  if (this.segments[0].particles) {
    return;
  }
  if (this.headings[keyCode]) {
    this.changeDirection(this.headings[keyCode]);
  }
};

Snake.prototype.changeDirection = function (heading) {
  var sum = p5.Vector.add(this.segments[0].heading, heading);

  if (sum.mag() !== 0) {
    this.nextHeading = heading;
  }
};

Snake.prototype.update = function () {
  if (this.segments.length === 0) {
    this.reset();
    return;
  }

  const exploding = !!this.segments[0].particles;
        
  if (!exploding) {
    this.segments[0].heading = this.nextHeading;
  } 

  for (let i = this.segments.length - 1; i >= 0; i -= 1) {
    this.segments[i].update();
  }
}

Snake.prototype.grow = function () {
  const head = this.segments[0];
  const pos = p5.Vector.add(head.pos, head.heading);
  const heading = head.heading;
  const hue = (head.hue + 1) % 100;

  this.segments.unshift(new Segment(pos, heading, hue, this.segments, this));
};

Snake.prototype.hasDied = function () {
  const head = this.segments[0];
  for (let i = 1; i < this.segments.length; i += 1) {
    if (p5.Vector.dist(head.pos, this.segments[i].pos) === 0) {
      return true;
    }
  }
  return false;
};

Snake.prototype.reset = function () {
  this.segments = [];
  this.segments[0] = new Segment(
    this.startPos,
    this.headings[37],
    60,
    this.segments,
    this
  );
};

Snake.prototype.explode = function () {
  if (!this.segments[0].particles) {
    this.segments[0].explode();
  }
};
















