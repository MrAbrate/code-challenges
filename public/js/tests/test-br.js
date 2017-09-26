function test() {
	// h1 title created?
	const p = document.querySelector('p');
	const brElements = p.querySelectorAll('br');
	const breaks = [
		/glitter,\s*<br>/.test(p.innerHTML),
		/lost;\s*<br>/.test(p.innerHTML),
		/wither,\s*<br>/.test(p.innerHTML),
		/frost.\s*<br>/.test(p.innerHTML),

		/woken,\s*<br>/.test(p.innerHTML),
		/spring;\s*<br>/.test(p.innerHTML),
		/broken,\s*<br>/.test(p.innerHTML),
		/king.\s*<br>/.test(p.innerHTML),
	];
	
	const origin = window.parent.location.origin;
	window.parent.postMessage([
		!breaks.includes(false)
	], origin)
}

test();
