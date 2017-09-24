new Objectives([
	'Visit 	<a href="https://fonts.google.com/">Google Fonts</a> and select the font, "Lato." Then, copy &amp; paste the CSS @import statement under the CSS tab.',
	'Use the <code>p</code> selector to select all <code>&lt;p&gt;</code> elements.',
	'Add the <code>font-family</code> declaration from google fonts to all <code>&lt;p&gt;</code> elements.',
	'Increase the <code>font-size</code> to <code>24px</code>.'
]);

editor.setCode('html',
`<p>"The important thing is not to stop questioning. Curiosity has its own reason for existence. One cannot help but be in awe when he contemplates the mysteries of eternity, of life, of the marvelous structure of reality. It is enough if one tries merely to comprehend a little of this mystery each day."
<br>
<br>
	- Albert Einstein
</p>
`);

editor.setTests('js/tests/test-typography.js');
