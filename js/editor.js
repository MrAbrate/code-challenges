function TextEditor(id) {
	var $editor = $getWrapper(id);
	var currentLang = 'html';
	var codeCache = {
		html: '',
		css: '',
		javascript: ''
	};


	var editor = setupTextBox();
	var $tabs = $('.tab');

	$tabs.click(function () {
    var $this = $(this);
    var target = $this.attr('data-target')
    $tabs.removeClass('active');
    $this.addClass('active');

    if (currentLang !== 'preview-window') {
      codeCache[currentLang] = editor.getValue();
    }

    if (currentLang === target) {
      return;
    }

    currentLang = target;

    if (target === 'preview-window') {
      $('#preview-window').show();
      $('#editor-window').hide();

      refreshPreview();
    } else {
      $('#preview-window').hide();
      $('#editor-window').show();
      session.setMode("ace/mode/" + currentLang);
      editor.setValue(codeCache[currentLang]);
    }
  });

  $tabs[0].addClass('active');

	$hiddenFileInput = $('#hidden-file-input');
	$hiddenFileInput.on('change', function () {
		
	});

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
