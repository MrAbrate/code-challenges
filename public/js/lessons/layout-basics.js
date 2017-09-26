new Objectives([
	'Put all of the HTML elements inside a <code>&lt;div&gt;</code> tag with <code>class="container"</code>.',
	'Put <code>&lt;header&gt;</code> tags around the <code>&lt;h1&gt;</code> element.',
	'Put the <code>&lt;ul&gt;</code> element inside a <code>&lt;nav&gt;</code> element.',
	'Put <code>&lt;article&gt;</code> tags around the <code>&lt;h2&gt;</code> and <code>&lt;p&gt;</code>.',
	'Put <code>&lt;footer&gt;</code> tags around the copyright statement near the bottom of the document.',
	'Replace "YOUR NAME" with your actual name in the copyright staement.'

]);

editor.setCode('html',
`
<h1>Houses</h1>


<ul>
	<li><a href="#">Thor</a></li>
	<li><a href="#">Dragon</a></li>
	<li><a href="#">Skald</a></li>
	<li><a href="#">Valkyrie</a></li>
	<li><a href="#">Valhalla</a></li>
	<li><a href="#">Odin</a></li>
	<li><a href="#">Vor</a></li>
</ul>


<h2>Thor</h2>
<p>Thor's color is green, and their house word is "courage."</p>
<p>In Norse mythology, Thor is the hammer wielding son of Odin. He is frequently engaged in a conflict with his brother, Loki.</p>


Copyright &copy; YOUR NAME

`);

editor.setCode('css',
`div.container {
    width: 100%;
    border: 1px solid gray;
}

header, footer {
    padding: 1em;
    color: white;
    background-color: black;
    clear: left;
    text-align: center;
}

nav {
    float: left;
    max-width: 160px;
    margin: 0;
    padding: 1em;
}

nav ul {
    list-style-type: none;
    padding: 0;
}

nav ul a {
    text-decoration: none;
}

article {
    margin-left: 170px;
    border-left: 1px solid gray;
    padding: 1em;
    overflow: hidden;
}
`);

editor.setTests(function () {
	let header, h1, nav, ul, article, h2, p, footer, yourName;
	const container = document.querySelector('.container');

	header = !!container && container.querySelector('header');
	h1 = !!header && header.querySelector('h1');

	nav = !!container && container.querySelector('nav');
	ul = !!nav && nav.querySelector('ul');

	article = !!container && container.querySelector('article');
	h2 = !!article && article.querySelector('h2');
	p = !!article && article.querySelector('p');

	footer = !!container && container.querySelector('footer');
	if (footer) {
		yourName = footer.innerHTML.includes('YOUR NAME');
	} else {
		yourName = true;
	}

	const origin = window.parent.location.origin;
	window.parent.postMessage([
		!!container,
		!!h1,
		!!ul,
		!!h2 && !!p,
		!!footer,
		!yourName
	], origin);
});
