function test() {
	const a = document.querySelector('a');
	let bkgColor, padding;

	if (a) {
		bkgColor = getComputedStyle(a)['background-color'];
		padding = getComputedStyle(a)['padding'];
	}

	const origin = window.parent.location.origin;
	window.parent.postMessage([
		!!bkgColor && bkgColor !== 'rgba(0, 0, 0, 0)',
		!!padding && padding === '20px'
	], origin);
}

test();
