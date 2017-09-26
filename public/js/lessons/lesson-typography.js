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

editor.setTests(function () {
	// @import added?
	const allCSS =
  [].slice.call(document.styleSheets)
  .reduce(function (prev, styleSheet) {
    if (styleSheet.cssRules) {
      return prev +
        [].slice.call(styleSheet.cssRules)
        .reduce(function (prev, cssRule) {
          return prev + cssRule.cssText;
        }, '');
    } else {
      return prev;
    }
  }, '');
	const p = document.querySelector('p');

	const importRegEx = /url\([\',\"]https\:\/\/fonts\.googleapis\.com\/css\?family\=Lato[\',\"]\)\;/
	const pSelectedRegEx = /p\s*\{([\s\S]*\:[\s\S]*\;\s*)*\}/;
	const fontFamilyRegEx = /Lato\, sans\-serif/;

	const importDeclared = importRegEx.test(allCSS);
	const pSelected = pSelectedRegEx.test(allCSS);
	const fontFamily = getComputedStyle(p)['font-family'];
	const fontSize = getComputedStyle(p)['font-size'];



	const origin = window.parent.location.origin;
	window.parent.postMessage([
		importDeclared,
		pSelected,
		fontFamily.includes('Lato, sans-serif'),
		fontSize === '24px'
	], origin);
});
