new Objectives([
	'Add <code>&lt;h1&gt;</code> tags around the word, "Quotes"',
	'Add <code>&lt;p&gt;</code> around each quote, including the author\'s name.'
]);

editor.setCode('html',
`Quotes

"The secret of getting ahead is getting started."<br>
- Mark Twain

"I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel."<br>
- Maya Angelou

"The fool doth think he is wise, but the wise man knows himself to be a fool."<br>
- William Shakespeare
`);

editor.setTests(function () {
	// h1 title created?
	const h1 = document.querySelector('h1');
	let h1Text;
	if (h1) {
		h1Text = h1.innerHTML.indexOf('Quotes') !== -1;
	}

	// Quotes wrapped in paragraps?
	const pElements = document.querySelectorAll('p');

	const quoteOne = pSearch(/secret of getting[\s\S]*Mark Twain/);
	const quoteTwo = pSearch(/learned that people[\s\S]*Maya Angelou/);
	const quoteThree = pSearch(/fool doth think he is wise[\s\S]*William Shakespeare/);

	function oneParagraphPerQuote() {
		pElements.length < 3;

		if (quoteOne === -1 || quoteTwo === -1 || quoteThree === -1) {
			return false;
		}
		if (quoteOne === quoteTwo || quoteOne === quoteThree || quoteTwo === quoteThree) {
			return false;
		}
		return true;
	}

	function pSearch(regX) {
		for (let i = 0; i < pElements.length; i += 1) {
			const text = pElements[i].innerHTML;
			if (regX.test(text)) {
				return i;
			}
		}
		return -1;
	}

	const origin = window.parent.location.origin;
	window.parent.postMessage([
		!!h1 && h1Text,
		oneParagraphPerQuote()
	], origin)
});
