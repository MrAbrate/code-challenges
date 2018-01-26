function TextEditor(id) {
	const wrapper = document.querySelector(id);

	if (!wrapper) {
		throw 'Editor not initialized: no element with id ' + id;
	}

	let currentLang = 'html';

	const codeCache = {
		html: '',
		css: '',
		javascript: ''
	};

	// Create wrappers
	const tabWrapper = appendDiv(wrapper, div => {
		div.classList.add('tab-wrapper');
	});
	const editorWindowWrapper = appendDiv(wrapper, div => {
		div.setAttribute('id', 'editor-windows');
	});


	// Create Editor
	const editorWindow = appendDiv(editorWindowWrapper, div => {
		div.setAttribute('id', 'editor-window');
		div.style.fontSize = "20px";
	});

	const editor = ace.edit(editorWindow);
	editor.setTheme("ace/theme/monokai");
	editor.setBehavioursEnabled(false);

	const session = editor.getSession();
	session.setMode("ace/mode/" + currentLang);
	session.setTabSize(2);
	session.setUseWrapMode(true);

	editor.setValue(codeCache[currentLang]);


	editor.commands.addCommand({
			name: 'save',
			bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
			exec: function(editor) {
				document.querySelector('.tab[data-target="preview-window"]').click();
			},
			readOnly: true // false if this command should not apply in readOnly mode
	});



	// Create Preview
	const previewWindow = appendDiv(editorWindowWrapper, div => {
		div.setAttribute('id', 'preview-window');
	});






	// addTabs
	const tabs = [];
	tabs.push( tab('HTML', 'html') );
	tabs.push( tab('CSS', 'css') );
	tabs.push( tab('JS', 'javascript') );
	tabs.push( tab('Preview', 'preview-window') );

	tabs[0].classList.add('active');



	function tab(label, target) {
		const tab = appendDiv(tabWrapper, div => {
			div.classList.add('tab');
			div.setAttribute('data-target', target);
			div.innerHTML = label;
		});

		tab.addEventListener('click', (e) => {
			tabs.forEach(tab => {
				if (tab === e.target) {
					tab.classList.add('active');
				} else {
					tab.classList.remove('active');
				}
			});

			const targetId = e.target.getAttribute('data-target');
			if (currentLang !== 'preview-window') {
				codeCache[currentLang] = editor.getValue();
			}

			if (currentLang === targetId) {
				return;
			}

			currentLang = targetId;

			if (targetId === 'preview-window') {
				previewWindow.style.display = 'block';
				editorWindow.style.display = 'none';
				refreshPreview();
			} else {
				previewWindow.style.display = 'none';
				editorWindow.style.display = 'block';
				session.setMode("ace/mode/" + currentLang);
				editor.setValue(codeCache[currentLang]);
			}
		});

		return tab;
	}

	const hiddenFileInput = document.createElement('input');
	hiddenFileInput.setAttribute('type', 'file');
	hiddenFileInput.style.display = 'none';
	const that = this;

	hiddenFileInput.onchange = function(evt) {
	    if(!window.FileReader) return; // Browser is not compatible

	    var reader = new FileReader();

	    reader.onload = function(evt) {
	        if(evt.target.readyState != 2) return;
	        if(evt.target.error) {
	            alert('Error while reading file');
	            return;
	        }

	        filecontent = evt.target.result;
					console.log(filecontent);


				  const doc = document.implementation.createHTMLDocument();
					doc.documentElement.innerHTML = filecontent;

					let html = doc.querySelector('body').innerHTML;
					let styles = doc.querySelector('style').innerHTML;
					let scripts = doc.querySelectorAll('script')[1].innerHTML;

					console.log(html, styles, scripts)

					that.setCode('html', html);
					that.setCode('css', styles);
					that.setCode('javascript', scripts);

					document.querySelector('.tab[data-target="preview-window"]').click();

	    };

	    reader.readAsText(evt.target.files[0]);
	};
	wrapper.appendChild(hiddenFileInput);

	const fileWrapper = document.createElement('div');
	fileWrapper.setAttribute('id', 'file-wrapper');

	const dlButton = document.createElement('button');
	const ulButton = document.createElement('button');

	dlButton.innerHTML = "Download your code";
	ulButton.innerHTML = "Upload File";

	dlButton.onclick = downloadText;
	ulButton.onclick = function () { hiddenFileInput.click();};

	fileWrapper.appendChild(dlButton);
	fileWrapper.appendChild(ulButton);

	wrapper.appendChild(fileWrapper);







	function refreshPreview() {
	  const preview = document.querySelector('#preview-window');
	  preview.innerHTML = '';
	  const iframe = document.createElement('iframe');
	  preview.appendChild(iframe);

	  const doc = iframe.contentDocument || iframe.contentWindow.document;

		let code = `
			<head>
	    <style>${ codeCache.css }</style>
			<script src="js/p5.min.js"></script>
		`;

		if (typeof tests === 'function') {
			code += `<script>const test = ${ tests.toString() }; test(); </script>`;
		} else if (typeof tests === 'string') {
			code += `<script src="${ tests }"></script>`;
		}

		code += `<script>${ codeCache.javascript }</script>
		</head>
		<body>${ codeCache.html }</body>
		`;



		doc.open();
		doc.write(code);
		doc.close();
	}

	function downloadText(){
		console.log('downloading');
		document.querySelector('.tab[data-target="preview-window"]').click();
		const code = `
			<html>
			<head>
	    <style>${ codeCache.css }</style>
			<script src="js/p5.min.js"></script>
			<script>${ codeCache.javascript }</script>
			</head>
			<body>${ codeCache.html }</body>
			</html>
		`;

	  var dl = document.createElement('a');
	  dl.setAttribute('href', 'data:text/csv;charset=utf-8,' +
	  encodeURIComponent(code));
	  dl.setAttribute('download', 'index.html');
	  dl.click();
	}




	let tests;
	this.setTests = function (urlOrFunc) {
		tests = urlOrFunc;
	}


	this.setCode = function (lang, val) {
		if (codeCache[lang] === undefined) throw 'No tab for this language';
		codeCache[lang] = val;
		if (lang === currentLang) {
			editor.setValue(val);
		}
	};
}









function appendDiv(parent, f) {
	const div = document.createElement('div');
	f(div);
	parent.appendChild(div);
	return div;
}

window.addEventListener("beforeunload", function (e) {
  var confirmationMessage = "\o/";

  e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
  return confirmationMessage;              // Gecko, WebKit, Chrome <34
});

const editor = new TextEditor('#editor');
