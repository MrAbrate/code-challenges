function test() {
	// h1 title created?
	const img = document.querySelector('img');
	let src;

	if (img) {
		src = img.getAttribute('src');
		console.log(src);
	}


	window.parent.postMessage([
		!!img,
		src && src.indexOf('https://media.giphy.com/media/qPuhFBQt8xLEY/giphy.gif') !== -1
	], "*")
}

test();
