function test() {




	// How many paragraphs?
	const pElements = document.querySelectorAll('p');
	const pCount = pElements.length;

	// Have the colors changed?
	let backgroundColor;
	let color;
	if (pElements.length > 0) {
		backgroundColor = getComputedStyle(pElements[0])['background-color'];
		color = getComputedStyle(pElements[0])['color'];
		console.log(color)
	}

	const origin = window.parent.location.origin;
	window.parent.postMessage([
		pCount === 2,
		pCount > 0 && backgroundColor !== 'rgba(0, 0, 0, 0)',
		pCount > 0 && color !== 'rgb(0, 0, 0)'
	], origin)
}

test();
