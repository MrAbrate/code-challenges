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
editor.setTests('js/tests/test-css-colors.js');
