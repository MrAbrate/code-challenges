const fs = require('fs');


const lessons = (function () {
	const files = [
		'headings.js',
		'paragraphs.js',
		'line-breaks.js',
		'lists.js',
		'images.js',
		'links.js',
		'css-colors.js',
		'typography.js'
		'padding.js',
	  'id-selectors.js',
		'class-selectors.js',
	];

	return files.map(filename => {
			const output = {
				filename: filename.replace('.js', '')
			}
			output.text = formatText(output.filename);
			return output;

			function formatText(str) {
				const words = str.split('-');
				const capitalized = words.map(word => {
					if (word === 'id' ||
							word === 'html' ||
							word === 'css' ||
							word === 'js') {
						return word.toUpperCase();
					} else {
						return word[0].toUpperCase() + word.slice(1);
					}
				});
				return capitalized.join(' ');
			}
	});
})();


console.log(lessons);
