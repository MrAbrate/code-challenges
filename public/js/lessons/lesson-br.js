new Objectives([
	'Add <code>&lt;br&gt;</code> tags after each line to format this poem by JRR Tolkien.'
]);

editor.setCode('html',
`<p>All that is gold does not glitter,
	Not all those who wander are lost;
	The old that is strong does not wither,
	Deep roots are not reached by the frost.

	From the ashes a fire shall be woken,
	A light from the shadows shall spring;
	Renewed shall be blade that was broken,
	The crownless again shall be king.

	- J.R.R. Tolkien, The Fellowship of the Ring
</p>
`);

editor.setTests('js/tests/test-br.js');
