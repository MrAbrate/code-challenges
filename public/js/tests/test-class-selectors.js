function test() {
	// id selector created?
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

	const classSelector = /\..*\{(\n*.*\:.*\;.*)+\n*\}/.test(allCSS);


	// Are the first two paragraphs narrowed?
	const pElements = document.querySelectorAll('p');
	let dif1, dif2;
	if (pElements.length > 2) {
		dif1 = getComputedStyle(pElements[1])['width'] === '280px';
		dif2 = getComputedStyle(pElements[0])['width'] === '280px';
	}

	window.parent.postMessage([
		classSelector,
		dif1 && dif2
	], "*")
}

test();
