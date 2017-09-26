new Objectives([
	'Add <code>&lt;h1&gt;</code> tags around the word, "Quotes"',
	'Add <code>&lt;p&gt;</code> around each quote, including the author\'s name.'
]);

editor.setCode('html',
`Quotes

"The secret of getting ahead is getting started."<br>
- Mark Twain

"I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel."<br>
- Maya Angelou

"The fool doth think he is wise, but the wise man knows himself to be a fool."<br>
- William Shakespeare
`);

editor.setTests('js/tests/test-paragraphs.js');
