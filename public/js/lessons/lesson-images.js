new Objectives([
	'Create an <code>&lt;img&gt;</code> tag',
	'Set the <code>src</code> attribute to the following URL<br>https://media.giphy.com/media/qPuhFBQt8xLEY/giphy.gif'
]);

editor.setCode('html',
`<h1>Puppies</h1>
`);

editor.setTests(function () {
	// h1 title created?
	const img = document.querySelector('img');
	let src;

	if (img) {
		src = img.getAttribute('src');
		console.log(src);
	}

	const origin = window.parent.location.origin;
	window.parent.postMessage([
		!!img,
		src && src.indexOf('https://media.giphy.com/media/qPuhFBQt8xLEY/giphy.gif') !== -1
	], origin)
});
