document.body.onload = createDebugger;

function createDebugger() {
  // Import webfont
  WebFontConfig = {
    google: { families: [ 'Source+Code+Pro::latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

  // Add notice
  var notice = document.createElement('p');
  notice.innerHTML = 'inStyle output debugger';
  notice.style.fontSize = '20px';
  notice.style.fontFamily = 'Source Code Pro';
  notice.style.fontWeight = 'bold';
  notice.style.display = 'inline-block';
  notice.style.margin = '0';
  document.body.appendChild(notice);

  // Parse the compiled stylesheet
  var styles = ''
  if (document.querySelector('.cp-pen-styles')) {
    styles = document.querySelector('.cp-pen-styles').innerHTML;
  } else {
    styles = document.getElementsByTagName('style')[0].innerHTML;
  }
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

  // Add only inStyle output to DOM
  for(var i=0; i < splitStyles.length; i++) {
    var inHackString = 'codepen: debug;'
    if (splitStyles[i].indexOf(inHackString) > -1) {
      var cleanAttrs = splitStyles[i].replace(inHackString, '');
      var block = document.createElement('p');
      var content = document.createElement('span');
      content.style.fontSize = '20px';
      content.style.fontFamily = 'Source Code Pro';
      content.style.display = 'inline-block';
      content.style.lineHeight = '34px';
      content.style.padding = '0 10px';
      content.style.color = '#fff';
      content.style.backgroundColor = 'rgb(169, 39, 39)';
      content.innerHTML = cleanAttrs;
      document.body.appendChild(block);
      block.appendChild(content);
    }
  }
}
