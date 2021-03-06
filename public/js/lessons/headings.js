new Objectives([
	'Create an <code>h1</code> element.',
	'Create an <code>h2</code> element.',
	'Create an <code>h3</code> element.',
	'Create an <code>h4</code> element.',
	'Create an <code>h5</code> element.',
	'Create an <code>h6</code> element.'
]);
editor.setTests(function () {
	const h1 = document.querySelector('h1');
	const h2 = document.querySelector('h2');
	const h3 = document.querySelector('h3');
	const h4 = document.querySelector('h4');
	const h5 = document.querySelector('h5');
	const h6 = document.querySelector('h6');

	const origin = window.parent.location.origin;
	window.parent.postMessage([
		!!h1 && !!h1.innerHTML,
		!!h2 && !!h2.innerHTML,
		!!h3 && !!h3.innerHTML,
		!!h4 && !!h4.innerHTML,
		!!h5 && !!h5.innerHTML,
		!!h6 && !!h6.innerHTML
	], origin)
});
