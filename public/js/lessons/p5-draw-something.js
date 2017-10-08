document.querySelector('.tab[data-target="javascript"]').click();

new Objectives([
	'Use the ellipse() and rect() functions at to draw something. It can be a truck or an alien or something abstract.',
	'User the fill() function to add some color.',
	'Use ellipse() and rect() at least 4 times <strong>each</strong>'
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
			let rectCounter = 0;
			let fillCounter = 0;

      window._draw = draw;
      window._ellipse = ellipse;
			window._rect = rect;
			window._fill = fill;

      ellipse = function (x, y, w, h) {
        window._ellipse(x, y, w, h);
        if (typeof x == 'number' && typeof y === 'number' && typeof w === 'number') {
          ellipseCounter += 1;
        }
      }
			rect = function (x, y, w, h, a, b, c, d) {
        window._rect(x, y, w, h, a, b, c, d);
        if (typeof x == 'number' && typeof y === 'number' && typeof w === 'number' && typeof h === 'number') {
          rectCounter += 1;
        }
      }
			fill = function (r, g, b, a) {
        window._fill(r, g, b, a);
        if (r !== undefined) {
          fillCounter += 1;
        }
      }

      draw = function () {
        try {
          window._draw();
          ellipse = window._ellipse;
					rect = window._rect;
          draw = window._draw;

          window.parent.postMessage([
            ellipseCounter > 0 && rectCounter > 0,
						fillCounter > 0,
						ellipseCounter > 3 && rectCounter > 3
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
