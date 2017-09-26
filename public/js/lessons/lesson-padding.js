new Objectives([
	'To make the <code>&lt;a&gt;</code> elements look like buttons, add a <code>background-color</code> to all <code>&lt;a&gt;</code> elements.',
	'Add more space around the text by setting the <code>padding</code> property of all <code>&lt;a&gt;</code> elements to <code>20px</code>.'
]);

editor.setCode('html',
`<a href="http://www.thevillageschool.com">Click me</a>
<a href="https://www.google.com">Click me too!</a>
`);

editor.setCode('css',
`body {
	margin: 50px;
}
`);

editor.setTests(function () {
	const a = document.querySelector('a');
	let bkgColor, padding;

	if (a) {
		bkgColor = getComputedStyle(a)['background-color'];
		padding = getComputedStyle(a)['padding'];
	}

	const origin = window.parent.location.origin;
	window.parent.postMessage([
		!!bkgColor && bkgColor !== 'rgba(0, 0, 0, 0)',
		!!padding && padding === '20px'
	], origin);
});
