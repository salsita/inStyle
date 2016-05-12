document.body.onload = createDebugger;

function createDebugger() {
  // Create debug element and style it
  var hint = document.createElement("instyle-hint");
  hint.style.position = 'fixed';
  hint.style.left = hint.style.top = '50%';
  hint.style.transform = 'translate(-50%, -50%)';
  hint.style.padding = '10px';
  hint.style.backgroundColor = '#e83535';
  hint.style.color = '#fff';
  hint.style.borderRadius = '5px';
  hint.style.fontSize = '30px';
  hint.style.fontFamily = 'Roboto';
  document.body.appendChild(hint);

  // Parse the compiled stylesheet
  var styles = document.querySelector('.cp-pen-styles').innerHTML;
  var commentChar = '*/';
  var codeIndex = styles.indexOf(commentChar) + commentChar.length + 1;
  var cleanStyles = styles.substring(codeIndex, styles.length);

  // Split individual selectors
  var indices = [];
  for(var i=0; i < cleanStyles.length; i++) {
    if (cleanStyles[i] === '}') indices.push(i);
  }

  var splitStyles = [];
  for(var i=0; i < indices.length; i++) {
    var cutFrom = null;
    var cutTo = null;

    if (i == 0) {
      cutFrom = 0;
      cutTo = indices[i] + 1;
    } else if (i > 0 && i < (indices.length - 1)) {
      cutFrom = indices[i - 1] + 1;
      cutTo = indices[i] + 1;
    } else {
      cutFrom = indices[i - 1] + 1;
      cutTo = cleanStyles.length;
    }
    var singleSelector = cleanStyles.substring(cutFrom, cutTo);
    splitStyles.push(singleSelector);
  }

  // Add to DOM
  for(var i=0; i < splitStyles.length; i++) {
    var inHackString = 'codepen: debug;'
    if (splitStyles[i].indexOf(inHackString) > -1) {
      var cleanAttrs = splitStyles[i].replace(inHackString, '');
      var block = document.createElement('span');
      block.innerHTML = cleanAttrs;
      block.style.display = 'block';
      if (i < splitStyles.length - 1) {
        block.style.marginBottom = '5px';
      }
      hint.appendChild(block);
    }
  }
}
