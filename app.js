const pug = require('pug');
const fs = require('fs');

// Watch index.pug
fs.watchFile(__dirname + '/pug/index.pug', (curr, prev) => {
  const html = pug.renderFile(__dirname + '/pug/index.pug');

  fs.writeFile(__dirname + '/public/index.html', html, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
});




const lessons = [
  {
    filename: 'lesson-headings',
    text: "Headings"
  },
  {
    filename: 'lesson-paragraphs',
    text: "Paragraphs"
  },
  {
    filename: 'lesson-br',
    text: "Line Breaks"
  },
  {
    filename: 'lesson-lists',
    text: "Lists"
  },
  {
    filename: 'lesson-images',
    text: "Images"
  },
  {
    filename: 'lesson-links',
    text: "Links"
  },
  {
    filename: 'lesson-css-colors',
    text: "CSS Colors"
  },
  {
    filename: 'lesson-typography',
    text: "Typography"
  },
  {
    filename: 'lesson-padding',
    text: "Padding"
  },
  {
    filename: 'lesson-id-selectors',
    text: "ID Selector"
  },
  {
    filename: 'lesson-class-selectors',
    text: "Class Selector"
  }
];
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
