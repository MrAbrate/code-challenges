function test() {
	// h1 title created?
	const h1 = document.querySelector('h1');
	let h1Text;
	if (h1) {
		h1Text = h1.innerHTML.indexOf('Quotes') !== -1;
	}

	// Quotes wrapped in paragraps?
	const pElements = document.querySelectorAll('p');

	const quoteOne = pSearch(/secret of getting.*\n*.*-Mark Twain/);
	const quoteTwo = pSearch(/learned that people.*\n*.*-Maya Angelou/);
	const quoteThree = pSearch(/fool doth think he is wise.*\n*.*-William Shakespeare/);

	function quotesCorrent() {
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

	window.parent.postMessage([
		!!h1 && h1Text,
		quotesCorrent()
	], "*")
}

test();
