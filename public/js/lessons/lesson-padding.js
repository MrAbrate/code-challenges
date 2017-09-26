new Objectives([
	'To make the <code>&lt;a&gt;</code> elements look like buttons, add a <code>background-color</code> to all <code>&lt;a&gt;</code> elements.',
	'Add more space around the text by setting the <code>padding</code> property of all <code>&lt;a&gt;</code> elements to <code>20px</code>.'
]);

editor.setCode('html',
`<a href="http://www.thevillageschool.com">Click me</a>
`);

editor.setTests('js/tests/test-padding.js');
