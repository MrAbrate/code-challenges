function test() {
	// h1 title created?
	const img = document.querySelector('img');
	let src;

	if (img) {
		src = img.getAttribute('src');
		console.log(src);
	}

	const origin = window.parent.location.origin;
	window.parent.postMessage([
		!!img,
		src && src.indexOf('https://media.giphy.com/media/qPuhFBQt8xLEY/giphy.gif') !== -1
	], origin)
}

test();
