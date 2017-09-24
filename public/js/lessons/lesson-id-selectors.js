new Objectives([
	'Create a CSS id selector and set the color property.',
	'Use the id selector to change the color of the 2nd paragraph.',
	'Create another id selector and increase to font-size of the last paragraph.'
]);

editor.setCode('html',
`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut venenatis sapien, eget auctor lacus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin id consequat magna, in volutpat ante.</p>

<p>Nam id interdum lacus, sed egestas lorem. Ut pharetra, velit et ornare scelerisque, mauris mauris tincidunt nisl, at facilisis nulla erat imperdiet dui. In ut finibus lacus, vel mollis arcu. Donec ac mi quam. Sed a nunc ipsum.</p>

<p>Vivamus in erat nunc. Mauris vel elementum metus. Maecenas eu arcu libero. Pellentesque rutrum nisl ut sem egestas mattis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>

<p>Quisque leo libero, auctor ornare eros eu, aliquam tincidunt risus. Etiam in tempus lectus. Suspendisse congue cursus nisi, ut tristique turpis sodales sit amet. Aenean at orci bibendum, interdum est quis, pharetra mi.</p>`);

editor.setCode('css',
`p {
	color: tomato;
}`);
editor.setTests('js/tests/test-id-selectors.js');
