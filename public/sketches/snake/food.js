function Food(size) {
  this.blockSize = settings.blockSize;
  this.columns = settings.columns;
  this.rows = settings.rows;
  this.morsels = [];
}

Food.prototype.createMorsel = function (snake) {
  for (let i = 0; i < 200; i += 1) {
    // Pick a random spot
    const x = floor(random(this.columns - 1)) * this.blockSize;
    const y = floor(random(this.rows - 1)) * this.blockSize;
    let morsel = new Morsel(createVector(x, y), this.morsels);

    if (morsel.touching(this.morsels) ||
        morsel.touching(snake.segments)) {
      continue;
    }
    
    this.morsels.push(morsel);
    return;
  }
}

Food.prototype.show = function () {
  this.morsels.forEach((morsel) => morsel.show());
};

Food.prototype.morselEatenBy = function (snake) {
  for (let i = 0; i < this.morsels.length; i += 1) {
    if (this.morsels[i].eatenBy(snake)) {
      return i;
    }
  }
};

Food.prototype.removeMorsel = function (i) {
  this.morsels[i].explode();
};





