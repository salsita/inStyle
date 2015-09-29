document.addEventListener("DOMContentLoaded", function(e) {

	// Init Codemirror on textarea samples
	var textareas = document.getElementsByClassName('code');

	for(var i=0; i<textareas.length; i++) {
		CodeMirror.fromTextArea(textareas[i], {
			mode: 'Stylus',
			theme: 'monokai',
			readOnly: 'nocursor',
		  lineNumbers: false
		})
	}

});
