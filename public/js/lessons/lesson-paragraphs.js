new Objectives([
	'Add <code>&lt;h1&gt;</code> tags to the text "Quotes"',
	'Add <code>&lt;p&gt;</code> around each qoute'
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
