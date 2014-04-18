// https://sourceforge.net/p/domx/code/HEAD/tree/trunk/javascript/loaddomx.js?format=raw

(function(startPath, startObject){

	var me = arguments.callee;

	var scriptPath = me.scriptPath;
	if (! scriptPath){
		var thisScript = null;
		var scripts = document.getElementsByTagName('script');
		for (var i = 0; i < scripts.length; i++)
			if (scripts[i].src && scripts[i].src.match(/loaddomx.js/i)){
				thisScript = scripts[i];
				break;
			}
		if (! thisScript){
			alert("Error loading DOMSurf Extreme.  Couldn't find script path.");
			return;
		}

		thisScript.parentNode.removeChild(thisScript);

		me.scriptPath = scriptPath = thisScript.src.replace(/loaddomx.js/i, 'domx.js');
	}

	var surfer;
	var attempts = 0;
	var popup_explainer;
	function setup_surfer(){
		surfer.document.write("<html><head><title>#! DOMSurf Extreme</title></head><body>" 
				    + "<div id='load'>Loading DOMSurf Extreme.  If this takes too long, <a id='load' style='text-decoration:underline' onclick='if(window.parent==window){alert(\"Your browser fails to attach this window to the original window.\");return false;}window.host=window.parent;alert(0);loader=document.createElement(\"script\");loader.src=\"" + scriptPath + "\";document.body.appendChild(loader);return false;'>click here</a>.</div>"
				    + "</body></html>");
		surfer.document.close();
		surfer.host = window;
		surfer.startPath = startPath;
		surfer.startObject = startObject;
		surfer.loadSurfer = me;

		var documents = [surfer.document];
		while (! (documents.length && documents[0].body)){
			var frames = documents[0].getElementsByTagName('frame');
			for (var i = 0; i < frames.length; i++)
				documents.appendChild(frames[i]);
			documents.shift();
		}
		if (! documents.length){
			alert("No body to attach to.");
			return;
		}

		var frame = documents[0];

		var loader = frame.createElement('script');
		loader.src = scriptPath;
		frame.body.appendChild(loader);
	}
	
	function open_window(){
		surfer = window.open(); 
		if (! surfer)
			return;
		clearTimeout(window_opener);
		if (popup_explainer)
			popup_explainer.parentNode.removeChild(popup_explainer);
		setup_surfer();
	}
	function window_didnt_open(){
		if (surfer)
			return;
		var div = 
		 popup_explainer = document.body.insertBefore(document.createElement('div'), document.body.firstChild);
		var a = div.appendChild(document.createElement('a'));
		a.innerHTML = "Please click here to open DOMX.";
		a.onclick = function(){ open_window(); return false; }
		a.href = '#';
		div.style.backgroundColor = 'yellow';
		div.style.textAlign = 'center';
		a.style.color = 'black';
		div.style.fontSize = '12pt';
	}
	var window_opener = setTimeout(window_didnt_open, 200);
	open_window();
})();
