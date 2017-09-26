new Objectives([
	'Create a CSS id selector and set the color property.',
	'Use the id selector to change the color of the 2nd paragraph.',
	'Create another id selector and increase to font-size of the last paragraph.'
]);

editor.setCode('html',
`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut venenatis sapien, eget auctor lacus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin id consequat magna, in volutpat ante.</p>

<p>Nam id interdum lacus, sed egestas lorem. Ut pharetra, velit et ornare scelerisque, mauris mauris tincidunt nisl, at facilisis nulla erat imperdiet dui. In ut finibus lacus, vel mollis arcu. Donec ac mi quam. Sed a nunc ipsum.</p>

<p>Vivamus in erat nunc. Mauris vel elementum metus. Maecenas eu arcu libero. Pellentesque rutrum nisl ut sem egestas mattis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>

<p>Quisque leo libero, auctor ornare eros eu, aliquam tincidunt risus. Etiam in tempus lectus. Suspendisse congue cursus nisi, ut tristique turpis sodales sit amet. Aenean at orci bibendum, interdum est quis, pharetra mi.</p>`);

editor.setCode('css',
`p {
	color: tomato;
}`);
editor.setTests(function () {
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
});
