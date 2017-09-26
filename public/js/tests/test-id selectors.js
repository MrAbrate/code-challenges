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

	const idSelector = /#.*\{(\n*.*\:.*\;.*)+\n*\}/.test(allCSS);


	// does paragraph 2 have an id
	const pElements = document.querySelectorAll('p');
	let id1, id2;
	let dif1, dif2;
	if (pElements.length >= 2) {
		id1 = pElements[1].getAttribute('id');
		id2 = pElements[pElements.length - 1].getAttribute('id');
		dif1 = getComputedStyle(pElements[0])['color'] !== getComputedStyle(pElements[1])['color'];
		dif2 = getComputedStyle(pElements[0])['font-size'] !== getComputedStyle(pElements[pElements.length - 1])['font-size'];
	}

	const origin = window.parent.location.origin;
	window.parent.postMessage([
		idSelector,
		!!id1 && dif1,
		!!id2 && dif2
	], origin)
}

test();
