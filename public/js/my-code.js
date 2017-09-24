
const jsEditor = createEditor('#js-editor', 'javascript');
const htmlEditor = createEditor('#html-editor', 'html');
const cssEditor = createEditor('#css-editor', 'css');
jsEditor.container.style.display = 'block';

const preview = document.querySelector('#preview');
preview.style.display = 'none';



document.querySelectorAll('.tab')
  .forEach(tab => {
    tab.addEventListener('click', clickHandler);
  });


function createEditor(selector, lang) {
  const div = document.querySelector(selector);
  div.style.fontSize = '20px';

  const editor = ace.edit(div);
  editor.setTheme("ace/theme/monokai");
  const session = editor.getSession()
  session.setMode("ace/mode/" + lang);
  session.setTabSize(2);

  editor.commands.addCommand({
      name: 'save',
      bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
      exec: function(editor) {
        simulateClick('.tab[aria-controls="preview"]')
      },
      readOnly: true // false if this command should not apply in readOnly mode
  });
  return editor;
}

function clickHandler(e) {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach((tab) => {
    if (tab === e.target) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  const selectedId = e.target.getAttribute('aria-controls');
  const editorWindows = document.querySelectorAll('.editor-window');
  editorWindows.forEach(win => {
    const id = win.getAttribute('id');
    if (id === selectedId) {
      win.style.display = 'block';
    } else {
      win.style.display = 'none';
    }
    if (id === 'preview') {
      refreshPreview();
    }
  });
}

function simulateClick(selector) {
  var event = new MouseEvent('click', {
    'view': window,
    'bubbles': true,
    'cancelable': true
  });
  var cb = document.querySelector(selector);
  var cancelled = !cb.dispatchEvent(event);
  if (cancelled) {
    // A handler called preventDefault.
    // alert("cancelled");
  } else {
    // None of the handlers called preventDefault.
    // alert("not cancelled");
  }
}









function refreshPreview() {
  const preview = document.querySelector('#preview');
  preview.innerHTML = '';
  const iframe = document.createElement('iframe');
  preview.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow.document;
	const js = jsEditor.getValue();
  const html = htmlEditor.getValue();
  const css = cssEditor.getValue();

	const code = `
    <style>${ css }</style>
    ${ html }
		<script src="p5.min.js"></script>
		<script>${ js }</script>
	`;
	doc.open();
	doc.write(code);
	doc.close();
}
