new Objectives([
	'Create an <code>&lt;img&gt;</code> tag and type "Play" between the opening and closing tags.',
	'Set the <code>href</code> attribute to <code>https://p5js-introduction.glitch.me</code>.'
]);

editor.setTests(function () {
	const aElements = document.querySelectorAll('a');
	let play = false;
	for (let i = 0; i < aElements.length; i += 1) {
		if (aElements[i].innerHTML.includes("Play")) {
			play = true;
			break;
		}
	}
 	const check2 = document.querySelector('a[href="https://p5js-introduction.glitch.me"]');

	const origin = window.parent.location.origin;
	window.parent.postMessage([
		play,
		!!check2
	], origin);
});
