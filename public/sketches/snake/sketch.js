let snake, food;
let fr = 10;
let paused = false;
const settings = {
  blockSize: 18,
  columns: 40,
  rows: 30
}


function setup() {
  colorMode(HSB, 100);
  ellipseMode(CORNER);

  snake = new Snake();
  food = new Food();

  createCanvas(snake.blockSize * snake.columns, snake.blockSize * snake.rows);
  frameRate(10);

}

function draw() {
  if (paused) {
    text('Paused', width/2, height/2);
    return;
  }


  background(20);

  if (random(100) < 3) {
    food.createMorsel(snake);
  }


  const eaten = food.morselEatenBy(snake);
  if (eaten !== undefined) {
    food.removeMorsel(eaten);
    snake.grow();
    fr += 0.05
    frameRate(fr);
  } else {
    snake.update();
  }

  if (snake.hasDied()) {
    snake.explode();
    fr = 10;
    frameRate(fr);
  }

  food.show();
  snake.show();

  fill(217, 0, 100);
  text('Length: ' + snake.segments.length, 10, 20);
}

function keyPressed() {
  snake.keyPressed(keyCode);
  if (keyCode === 32) {
    paused = !paused;
  }
}
