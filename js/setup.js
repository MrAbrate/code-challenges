function $getEditor(id) {
  var $div = $(id);

  if (!$div.length < 1) {
		throw 'Editor not initialized: no element with id ' + id;
	}

  return $div;
}

function setupTextBox() {
  var $textBox = $('#text-box');
  var editor = ace.edit($textBox.get(0));

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
        $('.tab[data-target="preview-window"]').click();
      },
      readOnly: true // false if this command should not apply in readOnly mode
  });

  return editor;
}


function addTabs(editor) {



	tabs.push( $tabTemplate.clone().attr('data-target', 'html').html('HTML') );
	tabs.push( $tabTemplate.clone().attr('data-target', 'css').html('CSS') );
	tabs.push( $tabTemplate.clone().attr('data-target', 'javascript').html('JS') );
	tabs.push( $tabTemplate.clone().attr('data-target', 'preview-window').html('Preview') );


  <div class="tab" data-target="html">HTML</div>
  <div class="tab" data-target="css">CSS</div>
  <div class="tab" data-target="javascript">JS</div>
  <div class="tab" data-target="preview-window">Preview</div>



}
