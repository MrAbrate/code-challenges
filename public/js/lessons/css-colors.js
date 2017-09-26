new Objectives([
	'Add <code>&ltp&gt;</code> tags around the paragraphs under the HTML tab.',
	'Change the <code>background-color</code> property of the <code>&ltp&gt;</code> elements using CSS.',
	'Change the <code>color</code> property of the <code>&ltp&gt;</code> elements.'
]);

editor.setCode('html',
`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a nibh pharetra, molestie dolor a, molestie nisl. Phasellus nec efficitur velit. Pellentesque fermentum augue eu interdum gravida.

Proin facilisis non erat sit amet varius. Suspendisse nulla nibh, ultrices a fringilla convallis, laoreet maximus risus. Vivamus scelerisque viverra erat, vel mollis lacus eleifend eget. Proin vel mauris sapien.`);

editor.setCode('css',
`p {

}`);
editor.setTests(function () {
	// How many paragraphs?
	const pElements = document.querySelectorAll('p');
	const pCount = pElements.length;

	// Have the colors changed?
	let backgroundColor;
	let color;
	if (pElements.length > 0) {
		backgroundColor = getComputedStyle(pElements[0])['background-color'];
		color = getComputedStyle(pElements[0])['color'];
		console.log(color)
	}

	const origin = window.parent.location.origin;
	window.parent.postMessage([
		pCount === 2,
		pCount > 0 && backgroundColor !== 'rgba(0, 0, 0, 0)',
		pCount > 0 && color !== 'rgb(0, 0, 0)'
	], origin)
});
