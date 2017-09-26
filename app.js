const pug = require('pug');
const fs = require('fs');

// Compile the source code
const pugFiles = [
  {
    source: '/pug/index.pug',
    dest: '/public/index.html'
  },
  {
    source: '/pug/lesson-template.pug',
    dest: '/public/lesson-headings.html',
    js: '/js/lessons/lesson-headings.js',
    text: "Headings"
  },
  {
    source: '/pug/lesson-template.pug',
    dest: '/public/lesson-paragraphs.html',
    js: '/js/lessons/lesson-paragraphs.js',
    text: "Paragraphs"
  },
  {
    source: '/pug/lesson-template.pug',
    dest: '/public/lesson-br.html',
    js: '/js/lessons/lesson-br.js',
    text: "Line Breaks"
  },
  {
    source: '/pug/lesson-template.pug',
    dest: '/public/lesson-lists.html',
    js: '/js/lessons/lesson-lists.js',
    text: "Lists"
  },
  {
    source: '/pug/lesson-template.pug',
    dest: '/public/lesson-images.html',
    js: '/js/lessons/lesson-images.js',
    text: "Images"
  },
  {
    source: '/pug/lesson-template.pug',
    dest: '/public/lesson-css-colors.html',
    js: '/js/lessons/lesson-css-colors.js',
    text: "CSS Colors"
  },
  {
    source: '/pug/lesson-template.pug',
    dest: '/public/lesson-typography.html',
    js: '/js/lessons/lesson-typography.js',
    text: "Typography"
  },
  {
    source: '/pug/lesson-template.pug',
    dest: '/public/lesson-padding.html',
    js: '/js/lessons/lesson-padding.js',
    text: "Padding"
  },
  {
    source: '/pug/lesson-template.pug',
    dest: '/public/lesson-id-selectors.html',
    js: '/js/lessons/lesson-id-selectors.js',
    text: "ID Selector"
  },
  {
    source: '/pug/lesson-template.pug',
    dest: '/public/lesson-class-selectors.html',
    js: '/js/lessons/lesson-class-selectors.js',
    text: "Class Selector"
  }
];

pugFiles.forEach(file => {
  if (file.js) {
    file.js = fs.readFileSync(__dirname + '/public' + file.js, 'utf-8');
  }

  const html = pug.renderFile(__dirname + file.source, {
    file: file,
    lessons: pugFiles.slice(1)
  });

  fs.writeFile(__dirname + file.dest, html, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
});
