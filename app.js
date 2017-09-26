const pug = require('pug');
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
		'typography.js',
		'padding.js',
	  'id-selectors.js',
		'class-selectors.js',
	];

	return files.map(filename => {
      filename = filename.replace('.js', '');
			const output = {
				filename: filename,
        text: formatText(filename)
			}
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

// Watch index.pug
function renderIndex() {
  const html = pug.renderFile(__dirname + '/pug/index.pug', {
    lessons: lessons
  });

  fs.writeFile(__dirname + '/public/index.html', html, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

renderIndex();

fs.watchFile(__dirname + '/pug/index.pug', (curr, prev) => {
  renderIndex();
});


lessons.forEach(lesson => {
  const filename = `${ __dirname }/public/js/lessons/${lesson.filename}.js`;
  const dest = `${ __dirname }/public/${lesson.filename}.html`;

  function render() {
    const js = fs.readFileSync(filename, 'utf-8');

    const html = pug.renderFile(__dirname + '/pug/lesson-template.pug', {
      lessonJS: js,
      thisLesson: lesson,
      lessons: lessons
    });

    fs.writeFile(dest, html, (err) => {
      if (err) throw err;
      console.log(`${ filename } has been saved!`);
    });
  }

  fs.watchFile(filename, (curr, prev) => {
    render();
  });

  render();
});
