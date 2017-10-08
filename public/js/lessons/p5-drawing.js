new Objectives([
	'Call the ellipse() function inside the draw() function.'
]);

editor.setCode('javascript',
`function setup() {
  createCanvas(640, 380);
}

function draw() {

}
`);

editor.setTests(function () {
  window.onload = function () {
    try {
      let ellipseCounter = 0;

      window._draw = draw;
      window._ellipse = ellipse;
      ellipse = function (x, y, w, h) {
        window._ellipse(x, y, w, h);
        if (typeof x == 'number' && typeof y === 'number', typeof w === 'number') {
          ellipseCounter += 1;
        }
      }
      draw = function () {
        try {
          window._draw();
          ellipse = window._ellipse;
          draw = window._draw;

          window.parent.postMessage([
            ellipseCounter > 0
        	], origin);
        } catch(err) {
          totalFail();
        }
      }
    } catch(err) {
      totalFail();
    }

  }

  function  totalFail() {
    window.parent.postMessage([
      false
    ], origin);
  }
});
