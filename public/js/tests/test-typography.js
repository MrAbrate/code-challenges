function test() {
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
	], origin)
}

test();
