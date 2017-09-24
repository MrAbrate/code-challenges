new Objectives([
	'Create a CSS class, <code>.narrow</code>, that sets the width property to 280px.',
	'Apply the <code>.narrow</code> class to the first 2 <code>&lt;p&gt;</code> elements.'
]);

editor.setCode('html',
`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut venenatis sapien, eget auctor lacus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin id consequat magna, in volutpat ante.</p>

<p>Nam id interdum lacus, sed egestas lorem. Ut pharetra, velit et ornare scelerisque, mauris mauris tincidunt nisl, at facilisis nulla erat imperdiet dui. In ut finibus lacus, vel mollis arcu. Donec ac mi quam. Sed a nunc ipsum.</p>

<p>Vivamus in erat nunc. Mauris vel elementum metus. Maecenas eu arcu libero. Pellentesque rutrum nisl ut sem egestas mattis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>

<p>Quisque leo libero, auctor ornare eros eu, aliquam tincidunt risus. Etiam in tempus lectus. Suspendisse congue cursus nisi, ut tristique turpis sodales sit amet. Aenean at orci bibendum, interdum est quis, pharetra mi.</p>
`);

editor.setTests('js/tests/test-class-selectors.js');
