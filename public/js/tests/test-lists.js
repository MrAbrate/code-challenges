function test() {
	// Is there a list?
	const ul = document.querySelector('ul');
	const ol = document.querySelector('ol');
	const listExists = !!ul || !!ol;

	// Are there 5 list items?
	let liCount;
	let liElements = [];
	if (ol) {
		liElements = ol.querySelectorAll('li');
	} else if (ul) {
		liElements = ul.querySelectorAll('li');
	}
	liCount = liElements.length;

	let emptyListItems = false
	liElements.forEach(li => {
		if (!li.innerHTML) {
			emptyListItems = true;
		}
	});

	// Is there an h2
	const h2 = document.querySelector('h2');

	const origin = window.parent.location.origin;
	window.parent.postMessage([
		listExists,
		(liCount >= 5) && !emptyListItems,
		!!h2 && !!h2.innerHTML
	], origin)
}

test();
