const blockSize = 20;

const cells = [];
for (let i = 0; i < 20; i += 1) {
  cells[i] = [];
  for (let j = 0; j < 10; j += 1) {
    cells[i][j] = false;
  }
}

function setup() {
  createCanvas(600, 600);
  frameRate(20);
}


let counter = 0;
function draw() {
  background(40);
  counter += 1;

  if (counter >= 15) {
    update();
    counter = 0;
  }


  for (let i = 0; i < cells.length; i += 1) {
    const row = cells[i];
    const y = height - (cells.length - i) * blockSize;

    for (let j = 0; j < row.length; j += 1) {
      const col = row[j];
      if (col) {
        fill(200, 100, 50);
      } else {
        fill(255);
      }

      rect (j * blockSize + 80, y - 5, blockSize, blockSize);
    }
  }
}

function Cell(row, col, falling) {
  this.row = row;
  this.col = col;
  this.falling = !!falling;
}




let fallingBlock;

function Block(shape) {
  this.row = 0;
  this.col = 3;

  this.cells = [];
  for (let i = 0; i < shape.length; i += 1) {
    this.cells[i] = [];
    for (let j = 0; j < shape[i].length; j += 1) {
      if (shape[i][j]) {
        this.cells[i][j] = new Cell(i, j, true);
      } else {
        this.cells[i][j] = false;
      }
    }
  }
}

Block.prototype.forEachCell = function(callback) {
  for (let i = 0; i < this.cells.length; i += 1) {
    for (let j = 0; j < this.cells[i].length; j += 1) {
      callback.call(this, this.cells[i][j], i, j);
    }
  }
}

Block.prototype.add = function () {
  this.forEachCell(function (cell, i, j) {
    cells[i][j + this.col] = cell;
  });
};

Block.prototype.canFall = function () {
  let can = true;

  this.forEachCell(function (cell, i, j) {
    if (!can) return;

    const nextRow = cells[this.row + i + 1];
    const lowerNeighbor = nextRow && nextRow[this.col + j];
    if (!nextRow || lowerNeighbor && !lowerNeighbor.falling) {
      can = false;
      this.forEachCell(function (cell, i, j) {
        if (cell) {
          cell.falling = false;
        }
      });
    }
  });

  return can;
};

Block.prototype.fall = function () {
  this.forEachCell(function (cell, i, j) {
    cells[this.row + i][this.col + j] = false;
  });

  this.row += 1;

  this.forEachCell(function (cell, i, j) {
    cells[this.row + i][this.col + j] = cell;
  });
};

function update() {
  if (!fallingBlock || !fallingBlock.canFall()) {
    fallingBlock = new Block([[true, true], [true, true]]);
    fallingBlock.add();
    return;
  }
  fallingBlock.fall();
}















//
