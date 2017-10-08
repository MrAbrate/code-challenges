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
		'layout-basics.js',
		'p5-ellipse.js',
		'p5-draw-something.js'
	];

	return files.map(filename => {
    const name = filename.replace('.js', '');
		const forHumans = name.split('-')
		.map(word => {
			if (word === 'id' ||
					word === 'html' ||
					word === 'css' ||
					word === 'js') {
				return word.toUpperCase();
			}
			return word[0].toUpperCase() + word.slice(1);
		})
		.join(' ');

		return {
			filename: name,
			text: forHumans
		};
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


// Watch p5.pug
function renderP5() {
  const html = pug.renderFile(__dirname + '/pug/p5.pug', {
    lessons: lessons
  });

  fs.writeFile(__dirname + '/public/p5.html', html, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

renderP5();

fs.watchFile(__dirname + '/pug/p5.pug', (curr, prev) => {
  renderP5();
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
