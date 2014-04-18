/*
	(C) Daniel Kuck 2009, cc-by-nc

	DOMSurf Extreme
	domx
	javascript:document.body.appendChild(document.createElement('script')).src='loaddomx.js';void(0);
	
	Some big changes to DOMSurf since the unextreme versions:
		DOMSurf will not care [much] about your memory issues; instead it will be useful.
		DOMSurf will take full advantage of Object Oriented programming.
		DOMSurf will help with the actual DOM, instead of only being generalized.

*/

document.title = '#! ' + host.document.title + ' - DOM Surf Extreme';

function getHostWindow(){
	try {
		return window.host || null;
	} catch (e){
		return null;
	}
}

function getAllWindows(){
	var windows = [];
	var potential = [getHostWindow()];
	while (potential.length){
		var item = potential.shift();
		if (! item || ! item.document)
			continue;
		if (item.document.body)
			windows.push(item);
		var content = item.contentDocument || item.document;
		var frames = content.getElementsByTagName('frame');
		for (var i = 0; i < frames.length; i++)
			potential.push(frames[i]);
		frames = content.getElementsByTagName('iframe');
		for (var i = 0; i < frames.length; i++)
			potential.push(frames[i]);
	}
	return windows;
}

String.compare = function compare(first, second){ // .apply me
	if (typeof second == 'undefined'){
		second = first; 
		first = this;
	}
	var shorter = first.length < second.length ? first.length : second.length;
	for (var i = 0; i < shorter; i++)
		if (first.charCodeAt(i) != second.charCodeAt(i))
			return first.charCodeAt(i) - second.charCodeAt(i);
	return first.length - second.length;
};

Date.compare = function compare(first, second){ // .apply me
	if (typeof second == 'undefined'){
		second = first; 
		first = this;
	}
	return first.valueOf() - second.valueOf();
}

Boolean.compare = function compare(first, second){ // .apply me
	if (typeof second == 'undefined'){
		second = first; 
		first = this;
	}
	return first - second;
}

Function.makeContextFunction = function(code, params, context){
	if (! context)
		context = getHostWindow();
	if (! params)
		params = [];
	return (new (context.Function)
			('string', 'date', 'number', 'array', 'savior',
			 'return function(' + params.join(',') + '){ ' + code + '}')
			)
			(String, Date, Number, Array, savior);
}

Array.grep = function grep(func){ // .apply me
	var grept = [];
	if (typeof func == 'string')
		func = Function.makeContextFunction(func, ['item']);
	for (var i = 0; i < this.length; i++)
		if (func.apply(this, [this[i]]))
			grept.push(this[i]);
	if (grept.length)
		return grept;
	return null;
};

Array.map = function map(func){ // .apply me
	var mapt = [];
	if (typeof func == 'string')
		func = Function.makeContextFunction(func, ['item']);
	for (var i = 0; i < this.length; i++)
		mapt.push(func.apply(this, [this[i]]));
	return mapt;
};

Array.sort = function sort(func){ // .apply me
	var sortt = [];
	for (var i = 0; i < this.length; i++)
		sortt.push(this[i]);
	if (typeof func == 'string')
		func = Function.makeContextFunction(func, ['a', 'b']);
	var cmp;
	var tmp;
	for (var i = 0; i < sortt.length - 1; i++)
	for (var j = i + 1; j < sortt.length; j++){
		cmp = func.apply(this, [sortt[i], sortt[j]]);
		if (cmp > 0){
			tmp = sortt[i];
			sortt[i] = sortt[j];
			sortt[j] = tmp;
		}
	}
	return sortt;
};

Array.reduce = function reduce(func){ // plz .apply me
	var a = this[0];
	if (typeof func == 'string')
		func = Function.makeContextFunction(func, ['a', 'b']);
	for (var i = 1; i < this.length; i++)
		a = func(a, this[i]);
	return a;
};

Array.range = function range(from, to, step){
	var integer = /^\s*[\+\-]?[0-9]+\s*$/;
	var filter;
	if (new String(from).match(integer) && new String(to).match(integer)){
		if (! step)
			step = 1;
		filter = function(i){ return i };
	}
	else if (from.valueOf && to.valueOf && from.toLocaleString && to.toLocaleString){
		if (! step)
			step = 86400000;
		if (step instanceof Date)
			step = step.valueOf();
		from = from.valueOf();
		to = to.valueOf();
		filter = function(i){ return new Date(i) };
	}
	else{
		if (! step)
			step = 1;
		if (! to){
			to = from[1];
			from = from[0];
		}
		from = from.charCodeAt(0);
		to = to.charCodeAt(0);
		filter = function(i){ return String.fromCharCode(i) };
	}
	if (from > to){
		var temp = to;
		to = from;
		from = temp;
	}
	var range = [];
	for (var i = from; i <= to; i += step)
		range.push(filter(i));
	return range;
};

Array.integerRange = function integerRange(from, to, step){
	var range = [];
	for (var i = from; i <= to; i += step)
		range.push(i);
	return range;
};

Array.hostify = function copy(array){
	if (! array)
		return array;
	if (array.length == 1)
		return getHostWindow().Array(array[0]);
	return getHostWindow().Array.apply(null, array);
};

(function setup_style(){
	var style = "\n"
	+ "	#load{\n"
	+ "		display: none;\n"
	+ "	}\n"
	+ "	body.has-savior{\n"
	+ "		margin-right: 8.5em;\n"
	+ "	}\n"
	+ "	.savior{\n"
	+ "		right: 0;\n"
	+ "		top: 0;\n"
	+ "		width: 8em;\n"
	+ "		z-index: 1;\n"
	+ "		background-color: white;\n"
	+ "		position: fixed;\n"
	+ "		height: 99%;\n"
	+ "	}\n"
	+ "	body.internet-explorer .savior{\n"
	+ "		position: absolute;\n"
	+ "		height: auto;\n"
	+ "	}\n"
	+ "	.commenter{\n"
	+ "		float: right;\n"
	+ "		background-color: #EEF;\n"
	+ "		padding: .5em;\n"
	+ "		border: 1px solid blue;\n"
	+ "	}\n"
	+ "	.commenter iframe{\n"
	+ "		height: 3em;\n"
	+ "	}\n"
	+ "	.list{\n"
	+ "		clear: both;\n"
	+ "	}\n"
	+ "	.savior .saved{\n"
	+ "		clear: both;\n"
	+ "	}\n"
	+ "	.saved .saved-index{\n"
	+ "		float: left;\n"
	+ "	}\n"
	+ "	.saved .saved-item{\n"
	+ "		width: 5em;\n"
	+ "		height: 1.2em;\n"
	+ "		float: left;\n"
	+ "		overflow: hidden;\n"
	+ "		position: relative;\n"
	+ "	}\n"
	+ "	.saved .saved-item-text{\n"
	+ "		position: absolute;\n"
	+ "		top: 0;\n"
	+ "		right: 0;\n"
	+ "		white-space: no-wrap;\n"
	+ "	}\n"
	+ "	.saved .saved-item-fade{\n"
	+ "		background-color: white;\n"
	+ "		height: 100%;\n"
	+ "		position: absolute;\n"
	+ "		left: 0;\n"
	+ "		top: 0;\n"
	+ "		opacity: .4;\n"
	+ "	}\n"
	+ "	.saved .saved-closer{\n"
	+ "		font-size: 50%;\n"
	+ "		width: 15px;\n"
	+ "		height: 15px;\n"
	+ "		padding: 0;\n"
	+ "		margin: 0;\n"
	+ "		overflow: hidden;\n"
	+ "	}\n"
	+ "	.node-description-subnode{\n"
	+ "		color: #BBB;\n"
	+ "	}\n"
	+ "	pre{\n"
	+ "		overflow: auto;\n"
	+ "	}\n"
	+ "	.node{\n"
	+ "		clear: both;\n"
	+ "	}\n"
	+ "	.node .node-description{\n"
	+ "		background-color: #FF8;\n"
	+ "	}\n"
	+ "	.node .node-description .node-description-subnode{\n"
	+ "		color: black;\n"
	+ "	}\n"
	+ "	.node .node-description .node-description-title{\n"
	+ "		color: black;\n"
	+ "	}\n"
	+ "	.node-description-title{\n"
	+ "		font-size: 110%;\n"
	+ "		float: left;\n"
	+ "		margin-right: 1em;\n"
	+ "	}\n"
	+ "	.node-description, .node-actions{\n"
	+ "		border: 1px solid #BBB;\n"
	+ "		border-left: 3px solid #BBB;\n"
	+ "		padding: .5em;\n"
	+ "		background-color: #FEC;\n"
	+ "	}\n"
	+ "	.node-actions{\n"
	+ "		border-top: none;\n"
	+ "	}\n"
	+ "	.node-description-type{\n"
	+ "		font-size: 50%;\n"
	+ "	}\n"
	+ "	.node-members{\n"
	+ "		padding-left: 1em;\n"
	+ "		margin-bottom: .1em;\n"
	+ "	}\n"
	+ "	.node-actions .action-control-tab{\n"
	+ "		color: #BBB;\n"
	+ "		margin: .1em;\n"
	+ "		padding: .1em;\n"
	+ "		border: 1px solid #BBB;\n"
	+ "		float: left;\n"
	+ "		text-decoration: none;\n"
	+ "	}\n"
	+ "	.node:hover>.node-actions .action-control-tab,\n"
	+ "	.node-actions .action-control-tab:hover{\n"
	+ "		color: black;\n"
	+ "		background-color: #FE8;\n"
	+ "		border: 1px solid black;\n"
	+ "	}\n"
	+ "	.node-actions .action-control-tab.selected{\n"
	+ "		background-color: #BBB;\n"
	+ "		color: white;\n"
	+ "		border: 1px solid white;\n"
	+ "	}\n"
	+ "	.node-actions .text-switcher{\n"
	+ "		display: none;\n"
	+ "	}\n"
	+ "	.node-actions .text-switcher.selected{\n"
	+ "		display: block;\n"
	+ "	}\n"
	+ "	.node:hover .action-control-tab.selected,\n"
	+ "	.node-actions .action-control-tab.selected:hover{\n"
	+ "		background-color: orange;\n"
	+ "		color: black;\n"
	+ "		border: 1px solid black;\n"
	+ "	}\n"
	+ "	.node-actions .action-control-control{\n"
	+ "		clear: both;\n"
	+ "	}\n"
	+ "	.node .closer,\n"
	+ "	.node .close-results,\n"
	+ "	.node .open-tab,\n"
	+ "	.node .saver{\n"
	+ "		float: right;\n"
	+ "		padding: 0em .25em;\n"
	+ "		text-decoration: none;\n"
	+ "		font-weight: bold;\n"
	+ "		font-size: 150%;\n"
	+ "		background-color: #BBB;\n"
	+ "		color: white;\n"
	+ "		border: 1px solid #BBB;\n"
	+ "	}\n"
	+ "	.node:hover>.closer,\n"
	+ "	.node:hover>.saver,\n"
	+ "	.node:hover>.node-actions .close-results,\n"
	+ "	.node:hover>.open-tab,\n"
	+ "	.closer:hover,\n"
	+ "	.saver:hover,\n"
	+ "	.close-results:hover{\n"
	+ "		color: white;\n"
	+ "	}\n"
	+ "	.node:hover>.closer,\n"
	+ "	.node:hover>.node-actions .close-results,\n"
	+ "	.closer:hover,\n"
	+ "	.close-results:hover{\n"
	+ "		border: 1px solid #800;\n"
	+ "	}\n"
	+ "	.node:hover>.open-tab,\n"
	+ "	.node:hover>.saver{\n"
	+ "		border: 1px solid black;\n"
	+ "	}\n"
	+ "	.node:hover>.closer,\n"
	+ "	.node:hover>.node-actions .close-results,\n"
	+ "	.closer:hover,\n"
	+ "	.close-results:hover{\n"
	+ "		background-color: red;\n"
	+ "	}\n"
	+ "	.saver,\n"
	+ "	.open-tab{\n"
	+ "		margin: .25em;\n"
	+ "	}\n"
	+ "	.node:hover>.saver,\n"
	+ "	.node:hover>.open-tab,\n"
	+ "	.saver:hover,\n"
	+ "	.open-tab:hover{\n"
	+ "		background-color: #4C0; /* green */\n"
	+ "		font-weight: bold;\n"
	+ "	}\n"
	+ "	.node .close-results,\n"
	+ "	.node .open-tab,\n"
	+ "	.node .saver{\n"
	+ "		font-size: 90%;\n"
	+ "	}\n"
	+ "	.node .html-switch{\n"
	+ "		font-size: 50%;\n"
	+ "		margin: 0 .5em;\n"
	+ "	}\n"
	+ "	.node .html-switch.as-string{\n"
	+ "		float: left;\n"
	+ "	}\n"
	+ "	.node pre{\n"
	+ "		margin-bottom: 0;\n"
	+ "	}\n"
	+ "	.node-description.minimize *,\n"
	+ "	.node-actions.minimize *{\n"
	+ "		display: none;\n"
	+ "	}\n"
	+ "	.node-description.minimize .node-description-title{\n"
	+ "		display: block;\n"
	+ "		background-color: #FE8;\n"
	+ "		padding: 0 .25em;\n"
	+ "	}\n"
	+ "	.set-select{\n"
	+ "		width: 90%;\n"
	+ "	}\n"
	+ "	textarea.set-select{\n"
	+ "		height: 4em;\n"
	+ "	}\n";
	if (document.createStyleSheet)
		document.createStyleSheet().cssText = style;
	else
		document
		 .getElementsByTagName("head")
		 [0]
		 .appendChild(document.createElement('style'))
		 .appendChild(document.createTextNode(style));
})();

(function css_browser_detect(){
	/* although I hate browser detection
	 * there is no great way to determine the availability of a css option.
	 */
	var app = navigator.appName;
	if (! app)
		return;
	var is_opera = app.match(/opera/i);
	var is_netscape_base = app.match(/netscape/i);
	var is_ie = app.match(/internet explorer/i) && ! (is_opera || is_netscape_base);
	var is_w3c = is_opera || is_netscape_base;
	var classAdd = [];
	if (is_opera)
		classAdd.push('opera');
	if (is_netscape_base)
		classAdd.push('netscape-base');
	if (is_ie)
		classAdd.push('internet-explorer');
	if (is_w3c)
		classAdd.push('w3c');
	document.body.className += (document.body.className ? ' ' : '') + classAdd.join(' ');
})();

(function build_host_watcher(){
	var warn = document.body.appendChild(document.createElement("div"));
	warn.style.width = "100%";
	warn.style.position = "absolute";
	warn.style.left = 0;
	warn.style.top = 0;
	warn.style.textAlign = "center";
	warn.style.backgroundColor = "#FF8";
	warn.style.border = "1px solid yellow";
	warn.style.display = "none";
	warn.appendChild(document.createTextNode("The host window has gone missing. Nothing will work."));
	setInterval(
		function() { 
			if (getHostWindow().closed){
				warn.style.display = "";
				document.body.style.marginTop = "2em";
			}
			else{
				warn.style.display = "none";
				document.body.style.marginTop = "";
			}
		}, 
		1000
	);
})();

var keyCodes = {
	enter: {
		10: true,
		13: true
	}
}

var savior = null;
(function build_savior(){
	savior = [];
	savior.save = function(surfItem){
		if (! savior.element){
			savior.element = document.body.appendChild(document.createElement("div"));
			savior.element.className = "savior";
			if (! document.body.className.match(/\bhas-savior\b/))
				document.body.className += ' has-savior';
			savior.element.appendChild(document.createElement("h3")).appendChild(document.createTextNode("Salvation"));
			savior.element.appendChild(document.createElement("div")).appendChild(document.createTextNode("savior[]"));
		}
		var element = this.element.appendChild(document.createElement("div"));
		element.savior = this;
		element.index = this.length;
		this[element.index] = surfItem.target;
		element.indexId = element.appendChild(document.createElement("div"));
		element.indexId.appendChild(document.createTextNode('[' + element.index + ']'));
		element.name = element.appendChild(document.createElement('div'));
		element.nameText = element.name.appendChild(document.createElement('div'));
		element.nameText.appendChild(document.createTextNode(surfItem.path.toString()));
		element.className = 'saved';
		element.name.className = 'saved-item';
		element.nameText.className = 'saved-item-text';
		element.indexId.className = 'saved-index';
		element.name.element = element;
		element.name.onclick = function(){
			list.insertBefore(surfItem.clone().node, list.firstChild);
			return false;
		};
		element.title = surfItem.path.toString();
		element.closer = element.appendChild(document.createElement("button"));
		element.closer.appendChild(document.createTextNode('\u00D7'));
		element.closer.element = element;
		element.closer.onclick = function(){
			this.element.parentNode.removeChild(this.element);
			return false;
		};
		element.closer.className = 'saved-closer';
		for (var i = 4; i <= 12; i+=4){
			var fade = element.name.appendChild(document.createElement('div'));
			fade.className = 'saved-item-fade';
			fade.style.width = i + 'px';
		}
	};
})();

function missingHost(){
	 alert("The host window has disappeared.  You may have navigated away from the page.  In some browsers, if you press back until you reach the page, you can still use DOMSurf to access it.\n\nIf that does not work, simply run DOMSurf again.");
	 return null;
}

function TargetPath(target, name){
	this.parts = [ {
					name: name,
					target: target
					} ];
}
TargetPath.prototype = {
	clone: function(){
		return new TargetPath(this.last().target, this.toString());
	},
	last: function(){
		return this.parts[this.parts.length - 1];
	},
	nextToLast: function(){
		if (this.parts.length == 1)
			return null;
		return this.parts[this.parts.length - 2];
	},
	first: function(){
		return this.parts[0];
	},
	refresh: function(){
		if (this.parts.length < 2)
			return; // as fresh as can be, no access to the parent
		var parent = this.nextToLast();
		if (! parent)
			return;
		var child = this.last();
		child.target = parent.target[child.name];
	},
	dottable: function(string){
		if (string.hasDottable)
			return string.dottable;
		string.hasDottable = true;
		return string.dottable = string.match(/^[a-z_\$][a-z_\$0-9]*$/i);
	},
	toString: function(){
		if (this.string)
			return this.string;
		var str = this.parts[0].name;
		for (var i = 1; i < this.parts.length; i++)
			if (str.length)
				if (this.dottable(this.parts[i].name))
					str += '.' + this.parts[i].name;
				else
					str += "['" + this.parts[i].name.replace(/\\/, '\\\\').replace(/'/, '\\\'') + "']";
			else
				str = this.parts[i];
		return this.string = str;
	},
	makeChild: function(target, name){
		var child = new TargetPath(null, "");
		child.parts = [];
		for (var i in this.parts)
			child.parts.push( { 
								name: this.parts[i].name,
								target: this.parts[i].target
								});
		child.parts.push( {
							name: name,
							target: target
							} );
		return child;
	},
	getBestGlobalContext: function(){
		for (var i = this.parts.length - 1; i >= 0; i--){
			if (this.parts[i].target && this.parts[i].target.document && this.parts[i].target.document.parentWindow)
				return this.parts[i].target.document.parentWindow;
			if (this.parts[i].target && this.parts[i].target.ownerDocument && this.parts[i].target.ownerDocument.parentWindow)
				return this.parts[i].target.ownerDocument.parentWindow;
		}
		return getHostWindow();
	}
};

function SurfItem(path, parent){

	this.target  = path.last().target;
	this.path    = path;
	this.parent  = parent;
	this.members = {};
	
	this.setupNode();

}
SurfItem.prototype = {

	clone: function(){
		return new SurfItem(this.path.clone());
	},

	name: function(){
		return this.path.last().name;
	},

	setupNode: function(){
		this.node = document.createElement("div");
		this.node.appendChild(this.createCloser());
		this.node.appendChild(this.createSaver());
		this.node.appendChild(this.createOpenTab());
		this.node.subnodes = {
			description: this.node.appendChild(document.createElement("div")),
			actions :    this.node.appendChild(document.createElement("div")),
			members :    this.node.appendChild(document.createElement("div"))};
		this.node.subnodes.description.subnodes = {
			title   : this.node.subnodes.description.appendChild(document.createElement("div")),
			type    : this.node.subnodes.description.appendChild(document.createElement("div")),
			path    : this.node.subnodes.description.appendChild(document.createElement("div")),
			content : this.node.subnodes.description.appendChild(document.createElement("div"))};
		this.node.subnodes.actions.subnodes = {
			tabs	: this.node.subnodes.actions.appendChild(document.createElement('div')),
			control : this.node.subnodes.actions.appendChild(document.createElement('div'))};
		this.node.className = 'node';
		for (var i in this.node.subnodes)
			this.node.subnodes[i].className = 'node-subnode node-' + i;
		for (var i in this.node.subnodes.description.subnodes)
			this.node.subnodes.description.subnodes[i].className = 'node-subnode node-description-subnode node-description-' + i;
		for (var i in this.node.subnodes.actions.subnodes)
			this.node.subnodes.actions.subnodes[i].className = 'node-subnode node-action-subnode node-action-' + i;
		this.node.subnodes.description.subnodes.title.surfItem = this;
		this.node.subnodes.description.subnodes.title.onclick = function(){
			this.surfItem.minimize();
		};
		this.refreshNode();
	},
	
	getBestGlobalContext: function(){
		return this.path.getBestGlobalContext();
	},
	
	minimize: function(){
			if (this.node.subnodes.description.className.match(/\bminimize\b/)){
				this.node.subnodes.description.className = this.node.subnodes.description.className.replace(/\sminimize\b/, '');
				this.node.subnodes.actions.className = this.node.subnodes.actions.className.replace(/\sminimize\b/, '');
			}
			else{
				this.node.subnodes.description.className += ' minimize';
				this.node.subnodes.actions.className += ' minimize';
			}
			return false;
	},
	
	createCloser: function(){
		var closer = document.createElement("a");
		closer.className = 'closer';
		closer.appendChild(document.createTextNode('\u00D7')); // times x
		closer.href = '#';
		closer.surfItem = this;
		closer.onclick = function (){
			this.surfItem.close();
			return false;
		};
		return closer;
	},
	
	createOpenTab: function(){
		var openTab = document.createElement("a");
		openTab.className = 'open-tab';
		openTab.appendChild(document.createTextNode('\u279A')); // up-right arrow
		openTab.href = '#';
		openTab.surfItem = this;
		openTab.onclick = function (){
			loadSurfer(this.surfItem.path.toString(), this.surfItem.target);
			return false;
		};
		return openTab;
	},
	
	createSaver: function(){
		var saver = document.createElement("a");
		saver.className = 'saver';
		saver.appendChild(document.createTextNode('\u2192')); // right-arrow
		saver.href = '#';
		saver.surfItem = this;
		saver.onclick = function (){
			savior.save(this.surfItem);
			return false;
		};
		return saver;
	},
	
	close: function(){
		if (! (this.parent && this.parent.removeMemberItem(this))
			&& (this.node.parentNode))
		this.node.parentNode.removeChild(this.node);
	},
	
	removeMemberItem: function(member){
		var name = member.name();
		if (! this.members[name])
			return false;
		var bucket = this.members[name];
		for (var i = 0; i < bucket.length; i++)
			if (bucket[i] === member){
				this.node.subnodes.members.removeChild(member.node);
				bucket.splice(i, 1);
				return true;
			}
		return false;
	},
	
	refreshNode: function(){
		var cleanUs = [ this.node.subnodes.description.subnodes.title, 
						this.node.subnodes.description.subnodes.path, 
						this.node.subnodes.description.subnodes.content,
						this.node.subnodes.description.subnodes.type,
						this.node.subnodes.actions.subnodes.tabs,
						this.node.subnodes.actions.subnodes.control ];
		for (var i = 0; i < cleanUs.length; i++)
			while (cleanUs[i].firstChild)
				cleanUs[i].removeChild(cleanUs[i].firstChild);
		this.node.subnodes.description.subnodes.title   .appendChild(document.createTextNode(this.name()));
		this.node.subnodes.description.subnodes.path    .appendChild(document.createTextNode(this.path.toString()));
		this.node.subnodes.description.subnodes.type    .appendChild(document.createTextNode(typeof this.target));
		this.node.subnodes.description.subnodes.content .appendChild(new SurfItemDescription(this.target).createNode(255));
		var closeAll = this.node.subnodes.actions.subnodes.tabs.appendChild(document.createElement("a"));
		closeAll.href = '#';
		closeAll.className = 'close-results';
		closeAll.appendChild(document.createTextNode('\u00D7 results'));
		closeAll.surfItem = this;
		closeAll.onclick = function(){
			this.surfItem.cleanMembers();
			return false;
		}
		this.control = new ActionControl(this);
		for (var i = 0; i < this.control.tabs.length; i++)
			this.node.subnodes.actions.subnodes.tabs.appendChild(this.control.tabs[i]);
		this.node.subnodes.actions.subnodes.tabs.appendChild(document.createElement("div")).style.clear = 'both';
		//this.node.focus();
	},
	
	refreshPath: function(){
		this.path.refresh();
		this.target = this.path.last().target;
		this.cleanMembers();
		this.refreshNode();
	},
	
	set: function(value){
		var parent = this.path.nextToLast();
		var child = this.path.last();
		try{
			parent.target[child.name] = value;
		}
		catch (e){
			return "Error assigning:\n" + e;
		}
	},
	
	cleanMembers: function(){
		var members = this.node.subnodes.members;
		while (members.firstChild)
			members.removeChild(members.firstChild);
		this.members = {};
	},
	
	isUnsafeMember: function (name){
		return {
			Packages: 'window.Packages' ,
			sun     : 'window.sun'      ,
			java    : 'window.java'     ,
			netscape: 'window.netscape'
			}[name];
	},
	
	attachSurfItem: function(surfItem){
		var name = surfItem.path.last();
		this.node.subnodes.members.insertBefore(surfItem.node, this.node.subnodes.members.firstChild);
		//surfItem.node.scrollIntoView();
		if (this.members[name])
			this.members[name].push(surfItem);
		else
			this.members[name] = [surfItem];
		return surfItem;
	},
	
	surfMember: function (name){
		name = new String(name);
		var host = this.getBestGlobalContext();
		if (! host)
			return missingHost();
		var member;
		var key = parseInt(Math.random() * 1500) + 1234;
		var unsafe;
		if (this.target == host
			&& (unsafe = this.isUnsafeMember(name))
			&& key != prompt("Congratulations.  You found an unsafe member!  " + unsafe + " is blocked because it tends to crash browsers.  If you're sure you want to see it, type " + key + "."))
		{
			member = "You wisely chose not to attempt to view " + unsafe + ".";
		}
		else
			member = this.target[name];
		var memberItem = new SurfItem(this.path.makeChild(member, name), this);
		return this.attachSurfItem(memberItem);
	},
	
	surfEval: function(code, func){
		var host = this.getBestGlobalContext();
		if (! host)
			return missingHost();
		var result;
		try{
			if (func){
				result = func.apply(this.target, [code]);
				if (result instanceof Array) // instanceof local Array
					result = Array.hostify(result);
			}
			else
				result = Function.makeContextFunction(code, undefined, this.getBestGlobalContext()).call(this.target);
		}
		catch (e){
			result = e;
		}
		var name = "<anonymous>.call(" + this.path + ")";
		var resultItem = new SurfItem(new TargetPath(result, name), this);
		return this.attachSurfItem(resultItem);
	},
	
	surfMemberPath: function(path){
		var host = this.getBestGlobalContext();
		if (! host)
			return missingHost();
		if (path.match(/^[a-z0-9\_\$\.]+$/i) && path.match(/^[^\.]/) && path.match(/[^\.]$/) && !path.match(/\.\./)){
			var queue = path.split(/\./);
			var surfItem = this;
			while (surfItem && queue.length){
				surfItem = surfItem.surfMember(queue.shift());
				if (queue.length)
					surfItem.minimize();
			}
			return surfItem;
		}
		else{
			if (path[0] != '[' && path[0] != '.')
				path = '.' + path;
			var result;
			try{
				result = Function.makeContextFunction("return this" + path, undefined, this.getBestGlobalContext()).apply(this.target, []);
			}
			catch (e){
				result = e;
			}
			var name = this.path + path;
			var resultItem = new SurfItem(new TargetPath(result, name), this);
			return this.attachSurfItem(resultItem);
		}
	},
	
	surfIndices: function(){
		for (var i = this.target.length - 1; i >= 0; i--)
			this.surfMember(i);
	},
	
	activateAction: function(actionName){
		return this.control.activateAction(actionName);
	},
	
	showControl: function(control){
		var controlBox = this.node.subnodes.actions.subnodes.control;
		while (controlBox.firstChild){
			if (controlBox.firstChild.deactivate)
				controlBox.firstChild.deactivate();
			controlBox.removeChild(controlBox.firstChild);
		}
		if (control){
			controlBox.appendChild(control);
			if (control.activate)
				control.activate();
		}
	}
};

SurfItem.createFromPath = function(path){
	var host = getHostWindow();
	if (! host)
		return missingHost();
	var target;
	try {
		target = Function.makeContextFunction("return " + path)();
	} catch (exception){
		target = exception;
	}
	var targetItem = new SurfItem(new TargetPath(target, path));
	return targetItem;
};

function SurfItemDescription(target){
	this.target = target;
};
SurfItemDescription.prototype = {
	toString: function(){
		return this.intuitString().string;
	},
	intuitString: function(){
		try { 
			for (var i = 0; i < SurfItemDescription.staticIntuition.length; i++)
				if (SurfItemDescription.staticIntuition[i].appliesTo(this.target))
					return SurfItemDescription.staticIntuition[i].applyTo(this.target);
			if (this.intuition)
				for (var i = 0; i < this.intuition.length; i++)
					if (this.intuition[i].appliesTo(this.target))
						return this.intuition[i].applyTo(this.target);
			return { explanation: "new String(this)",
					 string: new String(this.target) };
		}
		catch (e){
			return { explanation: "",
					 string: "<failed to convert to string>",
					 noTruncate: true };
		}
	},
	addIntuition: function(intuition){
		if (! this.intuition)
			this.intuition = [];
		this.intuition[this.intuition.length] = intuition;
	},
	addGlobalIntuition: function(intuition){
		this.staticIntuition[this.staticIntuition.length] = intuition;
	},
	createNode: function(length){
		var node = document.createElement("div");
		var switchButton = node.appendChild(document.createElement("a"));
		switchButton.href = '#';
		switchButton.controls = {
			content: node.appendChild(document.createElement("div")),
			surfItemDescription: this,
			renderedString: 'Rendered as HTML',
			length: length
		};
		switchButton.onclick = this.switchButtonOnClick;
		switchButton.onclick();
		return node;
	},
	switchButtonOnClick: function(){
		var content = this.controls.content;
		var surfItemDescription = this.controls.surfItemDescription;
		var renderedString = this.controls.renderedString;
		var length = this.controls.length;
		var setToHTML = this.firstChild ? this.firstChild.nodeValue != renderedString : false;
		while (content.firstChild)
			content.removeChild(content.firstChild);
		while (this.firstChild)
			this.removeChild(this.firstChild);
		if (setToHTML){
			content.appendChild(document.createElement('div')).innerHTML = surfItemDescription.toString();
			this.appendChild(document.createTextNode(renderedString));
			this.className = 'html-switch as-html';
		}
		else{
			var fieldSet = surfItemDescription.intuitString();
			var asString = fieldSet.string;
			var truncated = false;
			if (asString.length > length && ! fieldSet.noTruncate){
				truncated = asString;
				asString = asString.substr(0, length) + '...';
			}
			var field = fieldSet.explanation;
			var pre = content.appendChild(document.createElement('pre'));
			var textnode = pre.appendChild(document.createTextNode(asString));
			if (! asString.length)
				content.appendChild(document.createElement('br')); // holds the pre open if asString is no length
			if (truncated){
				pre.appendChild(document.createElement('br'));
				var more = pre.appendChild(document.createElement('a'));
				var name = more.appendChild(document.createTextNode('[more]'));
				more.href = '#';
				more.onclick = function(){
					if (textnode.nodeValue == truncated){ 
						textnode.nodeValue = asString; 
						name.nodeValue = '[more]';
					}
					else{ 
						textnode.nodeValue = truncated; 
						name.nodeValue = '[less]';
					} 
					return false; 
				};
			}
			this.appendChild(document.createTextNode(field));
			this.className = 'html-switch as-string';
		}
		return false;
	}
};
SurfItemDescription.staticIntuition = [
	{ appliesTo: function(target){ return typeof target == 'string' || target instanceof getHostWindow().String},
	  applyTo: function(target){ return { explanation: 'this',
										  string: target,
										  noTruncate: true } }
	},
	{ appliesTo: function(target){ return target == null || typeof target == 'undefined' },
	  applyTo: function(target){ return { explanation: '',
										  string: new String(target) } }
	},
	{ appliesTo: function(target){ return typeof target.outerHTML != 'undefined' },
	  applyTo: function(target){ return { explanation: 'outerHTML',
										  string: target.outerHTML } }
	},
	{ appliesTo: function(target){ return target.nodeName }, /* keep me after the outerHTML item above */
	  applyTo: function(target){ 
	  				var string = target.nodeName;
	  				if (target.nodeValue != null)
	  					string += ' : ' + target.nodeValue;
	  				if (target.attributes && target.attributes.length){
	  					var attributes = [];
						for (var i = 0; i < target.attributes.length; i++)
							attributes.push(target.attributes[i].nodeName + '=' + target.attributes[i].nodeValue);
						string += ' (' + attributes.join(' ') + ')';
					}
					if (typeof target.innerHTML != 'undefined')
						string += "\n" + target.innerHTML;
	  				return { explanation: 'nodeName : nodeValue',
							  string: string } 
				}
	},
	{ appliesTo: function(target){ if ( target.nodeValue ) return true },
	  applyTo: function(target){ return { explanation: 'nodeValue',
										  string: target.nodeValue } }
	},
	{ appliesTo: function(target){ return typeof target == 'object' && typeof target.length != 'undefined' && target != window.host },
	  applyTo: function(target){
					var explanation = 'join(",")';
					if (target.length == 0)
						return { explanation: explanation,
								 string: '[]' };
					var string = target.length + ': [' + target[0];
					for (var i = 1; i < target.length; i++)
						string += ', ' + target[i];
					string += ']';
					return { explanation: explanation,
							 string: string };
				}
	},
	{ appliesTo: function(target){ return target instanceof Error },
	  applyTo: function(target){ 
					return { explanation: '',
							 string: new String(target),
							 noTruncate: true };
				}
	}
];

function ActionControl(surfItem){
	this.surfItem = surfItem;
	this.setupTabs();
}
ActionControl.prototype = {
	setupTabs: function(){
		if (this.tabs)
			return;
		var applicable = [];
		for (var i = 0; i < this.controllers.length; i++)
			if (   (typeof this.controllers[i].appliesTo == 'function' && this.controllers[i].appliesTo(this.surfItem))
				|| (typeof this.controllers[i].appliesTo == 'object' && this.controllers[i].appliesTo.test && this.controllers[i].appliesTo.test(new String(this.surfItem)))
				)
				applicable.push(this.controllers[i]);
		this.tabs = [];
		for (var i = 0; i < applicable.length; i++){
			var tab = document.createElement("a");
			tab.href = '#';
			tab.className = 'action-control-tab';
			tab.appendChild(document.createTextNode(applicable[i].name));
			if (applicable[i].tooltip)
				tab.title = applicable[i].tooltip;
			tab.name = applicable[i].name;
			var control = applicable[i].applyTo(this.surfItem, tab);
			control.className = 'action-control-control';
			tab.surfItem = this.surfItem;
			tab.control = control;
			tab.tabs = this.tabs;
			tab.onclick = tab.select = this.tabSelect;
			tab.deselect = this.tabDeselect;
			tab.selected = this.tabSelected;
			this.tabs.push(tab);
		}
	},
	activateAction: function(name){
		for (var i = 0; i < this.tabs.length; i++)
			if (this.tabs[i].name == name){
				this.tabs[i].onclick();
				return this.tabs[i].control;
			}
		return null;
	},
	controllers: [
		{	name: "Re-View",
			tooltip: "Refreshes the view of the same object.",
			appliesTo: function(surfItem){ return true },
			applyTo: function(surfItem, tab){
				var node = document.createElement("div");
				node.surfItem = surfItem;
				node.tab = tab;
				node.activate = function(){
					var tab = this.tab;
					while (tab.firstChild)
						tab.removeChild(tab.firstChild);
					tab.appendChild(document.createTextNode("Refreshing View..."));
					var surfItem = this.surfItem;
					setTimeout(
						function() { surfItem.refreshNode() },
						250
					);
				};
				return node;
			}
		},
		{	name: "Re-Path",
			tooltip: "Checks whether a new object is in this path.",
			appliesTo: function(surfItem){ return surfItem.path.first() != surfItem.path.last() },
			applyTo: function(surfItem, tab){
				var node = document.createElement("div");
				node.surfItem = surfItem;
				node.tab = tab;
				node.activate = function(){
					var tab = this.tab;
					while (tab.firstChild)
						tab.removeChild(tab.firstChild);
					tab.appendChild(document.createTextNode("Refreshing Path..."));
					var surfItem = this.surfItem;
					setTimeout(
						function() { surfItem.refreshPath() },
						250
					);
				};
				return node;
			}
		},
		{	name: "Set",
			tooltip: "Change the item at this path.",
			appliesTo: function(surfItem){ return surfItem.path.first() != surfItem.path.last() },
			applyTo: function(surfItem, tab){
				var node = document.createSwitcher("button");
				node.switcher.appendChild(document.createTextNode("\u21A8")); // up-down arrow
				node.switcher.style.cssFloat = 'left';
				var input = node.appendChild(document.createElement("input"));
				var textarea = node.appendChild(document.createElement("textarea"));
				textarea.value = input.value = typeof surfItem.target == 'string'
					? '"' + surfItem.target
							.replace(/\\/g, '\\\\')
							.replace(/\"/g, '\\"')
							.replace(/\n/g, '\\n') + '"'
					: surfItem.target;
				textarea.className = input.className = "set-select text-switcher";
				textarea.surfItem = input.surfItem = surfItem;
				textarea.onkeypress = input.onkeypress = function(event){
					if (!event)
						event = window.event;
					if (keyCodes.enter[event.keyCode] && (this.nodeName.toLowerCase() != 'textarea' || event.ctrlKey)){
						var surfItem = this.surfItem;
						var result;
						try{
							result = Function.makeContextFunction("return " + this.value, undefined, surfItem.getBestGlobalContext())();
						}
						catch (e){
							if (confirm("Operation threw an error.  Assign error to " + surfItem.path.last().name + "?"))
								result = e;
							else
								return;
						}
						var errorMessage = surfItem.set(result);
						if (errorMessage)
							return alert(errorMessage);
						surfItem.refreshPath();
					}
					if (this.nodeName.toLowerCase() == 'textarea'){
						var matches = this.value.match(/\n/g);
						var height = matches ? matches.length + 4 : 4;
						if (height < 4)
							height = 4;
						if (height > 40)
							height = 40;
						this.style.height = height + 'em';
					}
				};
				node.switcher.onclick();
				if (typeof surfItem.target != 'string' && new String(surfItem.target).match(/\n/))
					node.switcher.onclick();
				node.activate = function(){
					this.selectedChild.focus();
				};
				return node;
			}
		},
		{	name: "Members",
			tooltip: "Access properties and functions of this object.",
			appliesTo: function(surfItem){ return ! (surfItem.target == null || typeof surfItem.target == 'undefined') },
			applyTo: function(surfItem){
				var node = document.createElement("div");
				var select = node.appendChild(document.createElement('select'));
				select.surfItem = surfItem;
				select.onkeypress = function(event){
					if (!event)
						event = window.event;
					if (keyCodes.enter[event.keyCode])
						this.onchange(event);
				};
				select.onchange = function(event){
					if (!event)
						event = window.event;
					var surfItem = this.surfItem.surfMember(this.options[this.selectedIndex].value);
					this.opened.push(surfItem);
					if (event.shiftKey || event.altKey || event.ctrlKey)
						surfItem.activateAction("Members");
				}
				node.select = select;
				node.activate = function(){
					// fill on each activate (in case there are new members)
					var selected = null;
					if (this.select.selectedIndex > -1)
						selected = this.select.options[this.select.selectedIndex].value;
					while (this.select.firstChild)
						this.select.removeChild(this.select.firstChild);
					for (var i in this.select.surfItem.target){
						var option = this.select.appendChild(document.createElement("option"))
						option.appendChild(document.createTextNode(i));
						option.value = i;
						if (i == selected)
							this.select.selectedIndex = this.select.options.length - 1;
					}
					this.select.focus();
				};
				var arrayStandard = true;
				var numeric = /^\d+$/;
				for (var i in surfItem.target)
					if (i != 'length' && ! numeric.test(i)){
						arrayStandard = false;
						break;
					}
				if (! arrayStandard){
					node.openAll = node.appendChild(document.createElement("button"));
					node.openAll.appendChild(document.createTextNode("Open All"));
					node.openAll.node = node;
					node.openAll.surfItem = surfItem;
					node.openAll.onclick = function(){
						var options = this.node.select.options;
						for (var i = 0; i < options.length; i++)
							this.surfItem.surfMember(options[i].value);
						return false;
					};
				}
				if (typeof surfItem.target.length != 'undefined'){
					node.openNumeric = node.appendChild(document.createElement("button"));
					node.openNumeric.appendChild(document.createTextNode("Open Indices"));
					node.openNumeric.node = node;
					node.openNumeric.surfItem = surfItem;
					node.openNumeric.onclick = function(){
						this.surfItem.surfIndices();
						return false;
					};
				}
				var text = node.textInput = node.appendChild(document.createElement("input"));
				text.surfItem = surfItem;
				text.onkeypress = function(event){
					if (!event)
						event = window.event;
					if (keyCodes.enter[event.keyCode])
						this.go.onclick(event);
				};
				text.go = node.appendChild(document.createElement('button'));
				text.go.appendChild(document.createTextNode('Go'));
				text.go.input = text;
				text.go.surfItem = surfItem;
				text.go.onclick = function(event){
					if (!event)
						event = window.event;
					var surfItem = this.surfItem.surfMember(this.input.value);
					if (event.shiftKey || event.altKey || event.ctrlKey)
						surfItem.activateAction("Set");
				}
				text.search = node.appendChild(document.createElement('button'));
				text.search.appendChild(document.createTextNode('Regex'));
				text.search.input = text;
				text.search.surfItem = surfItem;
				text.search.onclick = function(event){
					if (!event)
						event = window.event;
					var regex = new RegExp(this.input.value, 'i');
					var target = this.surfItem.target;
					var found = false;
					for (var i in target)
						if (regex.test(i))
							this.surfItem.surfMember(found = i);
					if (! found)
						this.surfItem.attachSurfItem(new SurfItem(new TargetPath('<no results>', 'for (var member in ' + this.surfItem.path +') /' + this.input.value + '/i.test(member) ')));
				};
				if (surfItem.target && surfItem.target.getElementById){
					text.byId = node.appendChild(document.createElement('button'));
					text.byId.appendChild(document.createTextNode('Get ID'));
					text.byId.input = text;
					text.byId.surfItem = surfItem;
					text.byId.onclick = function(event){
						if (!event)
							event = window.event;
						var target = this.surfItem.target;
						this.surfItem.attachSurfItem(new SurfItem(new TargetPath(target.getElementById(this.input.value), this.surfItem.path + '.getElementById("' + this.input.value + '")')));
					};
				}
				if (surfItem.target && surfItem.target.getElementsByName){
					text.byName = node.appendChild(document.createElement('button'));
					text.byName.appendChild(document.createTextNode('Get Name'));
					text.byName.input = text;
					text.byName.surfItem = surfItem;
					text.byName.onclick = function(event){
						if (!event)
							event = window.event;
						var target = this.surfItem.target;
						this.surfItem.attachSurfItem(new SurfItem(new TargetPath(target.getElementsByName(this.input.value), this.surfItem.path + '.getElementsByName("' + this.input.value + '")')));
					};
				}
				if (surfItem.target && surfItem.target.getElementById){
					text.byTag = node.appendChild(document.createElement('button'));
					text.byTag.appendChild(document.createTextNode('Get Tag'));
					text.byTag.input = text;
					text.byTag.surfItem = surfItem;
					text.byTag.onclick = function(event){
						if (!event)
							event = window.event;
						var target = this.surfItem.target;
						this.surfItem.attachSurfItem(new SurfItem(new TargetPath(target.getElementsByTagName(this.input.value), this.surfItem.path + '.getElementsByTagName("' + this.input.value + '")')));
					};
				}
				return node;
			}
		},
		{	name: "Cookies",
			tooltip: "Access and alter cookies in this cookie.",
			appliesTo: function(surfItem){ return typeof surfItem.target == 'string' && surfItem.path.last().name == 'cookie' },
			applyTo: function(surfItem){
				var node = document.createElement("div");
				var select = node.appendChild(document.createElement('select'));
				select.surfItem = surfItem;
				node.surfItem = surfItem;
				node.select = select;
				node.select.onchange = function(event){
					if (! event)
						event = window.event;
					this.textInput.value = this.query[this.value];
				}
				node.activate = function(){
					// fill on each activate 
					while (this.select.firstChild)
						this.select.removeChild(this.select.firstChild);
					var query = 
					this.textInput.query = 
					this.select.query = 
						new Querier('=', '; ', '').decode(this.surfItem.target);
					for (var i in query){
						var option = this.select.appendChild(document.createElement('option'));
						option.value = i;
						option.appendChild(document.createTextNode(i));
					}
					this.select.focus();
					this.select.onchange();
				};
				var text = node.textInput = node.appendChild(document.createElement("input"));
				select.textInput = text;
				select.select = select;
				text.textInput = text;
				text.select = select;
				text.surfItem = surfItem;
				text.onkeypress = 
				select.onkeypress = function(event){
					if (!event)
						event = window.event;
					if (keyCodes.enter[event.keyCode]){
						this.select.query[this.select.value] = this.textInput.value;
						// tricky...
						// if this is the real document.cookie, then we must assign it just the new/changed item
						// if it is not, then we must assign the encoded version of the entire query
						// so we do the changed one and then the encoded version.  all is well.  =)
						var x = encodeURIComponent(this.select.value) + '=' + encodeURIComponent(this.textInput.value);
						this.surfItem.set(x);
						var string = new Querier('=', '; ', '').encode(this.query);
						this.surfItem.set(string);
						var value = this.select.value;
						this.surfItem.refreshPath();
						var content = this.surfItem.activateAction("Cookies");
						var select = content.getElementsByTagName('select')[0];
						if (select)
							select.setValue(value);
					}
				};
				select.setValue = function(value){
					for (var i = 0; i < this.options.length; i++)
						if (this.options[i].value == value){
							this.selectedIndex = i;
							this.onchange();
							return;
						}
				};
				var add = node.appendChild(document.createElement('button'));
				add.appendChild(document.createTextNode('*'));
				add.select = select;
				add.textInput = text;
				add.onclick = function(){
					var name = prompt("Enter the new cookie name: ");
					if (! name)
						return;
					var option = this.select.appendChild(document.createElement('option'));
					option.appendChild(document.createTextNode(name));
					option.value = name;
					this.select.setValue(name);
					this.textInput.focus();
				};
				return node;
			}
		},
		{	name: "Follow Path",
			tooltip: "Follow a path from this object.",
			appliesTo: function(surfItem) { return surfItem.target != null && typeof surfItem.target != 'undefined' },
			applyTo: function(surfItem, tab){
				var node = document.createElement("div");
				var text = node.textInput = node.appendChild(document.createElement("input"));
				text.surfItem = surfItem;
				text.onkeypress = function(event){
					if (!event)
						event = window.event;
					if (keyCodes.enter[event.keyCode]){
						var surfItem = this.surfItem.surfMemberPath(this.value);
						if (event.shiftKey || event.altKey || event.ctrlKey)
							surfItem.activateAction("Set");
					}
				};
				node.activate = function(){
					this.textInput.focus();
				};
				return node;
			}
		},
		{	name: "XPath",
			tooltip: "Select nodes according to an xpath",
			appliesTo: function(surfItem) { return surfItem.target && surfItem.target.selectNodes },
			applyTo: function(surfItem, tab){
				var node = document.createElement("div");
				var text = node.textInput = node.appendChild(document.createElement("input"));
				text.surfItem = surfItem;
				text.onkeypress = function(event){
					if (!event)
						event = window.event;
					if (keyCodes.enter[event.keyCode]){
						try{
							var nodes = this.surfItem.target.selectNodes(this.value);
							for (var i = nodes.length - 1; i >= 0; i--)
								this.surfItem.attachSurfItem(new SurfItem(new TargetPath(nodes[i], this.surfItem.path + '.selectNodes("' + this.value + '")[' + i + ']')));
							if (! nodes.length)
								this.surfItem.attachSurfItem(new SurfItem(new TargetPath('<no results>', this.surfItem.path + '.selectNodes("' + this.value + '")')));
						}
						catch (e){
							this.surfItem.attachSurfItem(new SurfItem(new TargetPath(e, this.surfItem.path + '.selectNodes("' + this.value + '")')));
						}
					}
				};
				node.activate = function(){
					this.textInput.focus();
				};
				return node;
			}
		},
		{	name: "Run",
			tooltip: "Run this function in the context of the parent if any.",
			appliesTo: function(surfItem) { return new String(typeof surfItem.target) == 'function'; },
			applyTo: function(surfItem, tab){
				var node = document.createElement("div");
				var text = node.textInput = node.appendChild(document.createElement("input"));
				text.surfItem = surfItem;
				text.onkeypress = function(event){
					if (!event)
						event = window.event;
					if (keyCodes.enter[event.keyCode]){
						var params = this.value;
						var parent = this.surfItem.path.nextToLast();
						if (parent)
							parent = parent.target;
						var args;
						var results;
						try {
							args = Function.makeContextFunction("return [" + params + "];", undefined, this.surfItem.getBestGlobalContext()).apply(parent, []);
						}
						catch (e){
							results = e;
						}
						if (! results){
							try{
								results = this.surfItem.target.apply(parent, args);
							}
							catch (e){
								results = e;
							}
						}
						this.surfItem.attachSurfItem(new SurfItem(new TargetPath(results, this.surfItem.path + "(" + params + ")")));
					}
				};
				node.activate = function(){
					node.textInput.focus();
				};
				return node;
			}
		},
		{	name: "New",
			tooltip: "Construct an object with this function.",
			appliesTo: function(surfItem) { return new String(typeof surfItem.target) == 'function'; },
			applyTo: function(surfItem, tab){
				var node = document.createElement("div");
				var text = node.textInput = node.appendChild(document.createElement("input"));
				text.surfItem = surfItem;
				text.onkeypress = function(event){
					if (!event)
						event = window.event;
					if (keyCodes.enter[event.keyCode]){
						var params = this.value;
						var args;
						var results;
						try {
							args = Function.makeContextFunction("return [" + params + "];", undefined, this.surfItem.getBestGlobalContext())();
						}
						catch (e){
							results = e;
						}
						if (! results){
							try{
								var argsIndices = [];
								for (var i = 0; i < args.length; i++)
									argsIndices[i] = i;
								results = Function.makeContextFunction(
												"return new construct(" + (args.length ? "args[" + argsIndices.join("],args[", args) + "]" : "") + ")",
												['construct', 'args'],
												this.surfItem.getBestGlobalContext()
											)
											(this.surfItem.target, args);
							}
							catch (e){
								results = e;
							}
						}
						this.surfItem.attachSurfItem(new SurfItem(new TargetPath(results, "new " + this.surfItem.path + "(" + params + ")")));
					}
				};
				node.activate = function(){
					node.textInput.focus();
				};
				return node;
			}
		},
		{	name: "eval",
			tooltip: "Evaluate code in the context of this object.",
			appliesTo: function(surfItem) { return surfItem.target },
			applyTo: function(surfItem, tab){
				if (! this.autocount)
					this.autocount = 0;
				this.autocount ++;
				var node = document.createElement("div");
				node.radios = [];
				var arrayfunctions = {	grep:	Array.grep, 
										map:	Array.map, 
										sort:	Array.sort, 
										reduce:	Array.reduce };
				if (typeof surfItem.target.length != 'undefined'){
					for (var i in arrayfunctions){
						var radio = node.appendChild(document.createElement('input'));
						radio.setAttribute('type', 'radio');
						radio.setAttribute('value', i);
						radio.setAttribute('name', 'arrayfunctions' + this.autocount);
						node.appendChild(document.createTextNode(i));
						node.radios.push(radio);
					}
					var radio = node.appendChild(document.createElement('input'));
					radio.setAttribute('type', 'radio');
					radio.setAttribute('value', '');
					radio.setAttribute('name', 'arrayfunctions' + this.autocount);
					node.appendChild(document.createTextNode('normal mode'));
					radio.checked = true;
				}
				var text = node.textInput = node.appendChild(document.createElement("textarea"));
				text.style.width = "100%";
				text.surfItem = surfItem;
				text.node = node;
				text.onkeypress = function(event){
					if (!event)
						event = window.event;
					if (keyCodes.enter[event.keyCode] && event.ctrlKey){
						var arrayfunction = '';
						for (var i = 0; i < this.node.radios.length; i++)
							if (this.node.radios[i].checked){
								arrayfunction = this.node.radios[i].value;
								break;
							}
						if (arrayfunction && ! this.value.match(/\breturn\b/)){
							if (confirm("Missing return value.  Automatically add a return command at the beginning of this eval script?"))
								this.value = 'return ' + this.value;
							else
								return;
						}
						var surfItem = this.surfItem.surfEval(this.value, arrayfunction ? arrayfunctions[arrayfunction] : null);
						if (event.shiftKey || event.altKey || event.ctrlKey)
							surfItem.activateAction("Set");
					}
					var matches = this.value.match(/\n/g);
					var height = matches ? matches.length + 4 : 4;
					if (height < 4)
						height = 4;
					if (height > 40)
						height = 40;
					this.style.height = height + 'em';
				};
				node.activate = function(){
					this.textInput.focus();
				};
				return node;
			}
		},
		{	name: "parentNode",
			tooltip: "Go to this node's parent node.",
			appliesTo: function(surfItem){ return surfItem.target && typeof surfItem.target.parentNode != 'undefined'; },
			applyTo: function(surfItem, tab){
				return ActionControl.makeAutoSurf(surfItem, tab, 'surfMember', 'parentNode', 'Members');
			}
		},
		{	name: "Ancestors",
			tooltip: "View array of all ancestors.",
			appliesTo: function(surfItem){ return surfItem.target && typeof surfItem.target.parentNode != 'undefined'; },
			applyTo: function(surfItem, tab){
				var node = document.createElement("div");
				node.activate = function(){
					var ancestors = [];
					var parent = surfItem.target.parentNode;
					while (parent){
						ancestors.push(parent);
						parent = parent.parentNode;
					}
					var ancestorsSurfer = new SurfItem(new TargetPath(ancestors, surfItem.path + ".<ancestors>"));
					surfItem.attachSurfItem(ancestorsSurfer);
					ancestorsSurfer.surfIndices();
					setTimeout(
						function(){ tab.deselect(); },
						250
					);
				};
				return node;
			}
		},
		{	name: "childNodes",
			tooltip: "Go to this node's child nodes.",
			appliesTo: function(surfItem){ return surfItem.target && typeof surfItem.target.childNodes != 'undefined'; },
			applyTo: function(surfItem, tab){
				return ActionControl.makeAutoSurf(surfItem, tab, 'surfMember', 'childNodes', 'Members');
			}
		},
		/*
		{	name: "table",
			tooltip: "Go to this row or cell's table.",
			appliesTo: function(surfItem){ return surfItem.target && surfItem.target.nodeName && (surfItem.target.nodeName.match(/^t[rd]$/i) || surfItem.target.nodeName.match(/^tbody$/i)) },
			applyTo: function(surfItem, tab){
				var uptotable = ['parentNode'];
				var parent = surfItem.target.parentNode;
				while (parent && ! parent.nodeName.match(/^table$/i)){
					parent = parent.parentNode;
					uptotable.push('parentNode');
				}
				return ActionControl.makeAutoSurf(surfItem, tab, 'surfMemberPath', uptotable.join('.'));
			}
		},
		{	name: "tr",
			tooltip: "Go to this cell's row.",
			appliesTo: function(surfItem){ return surfItem.target && surfItem.target.nodeName && surfItem.target.nodeName.match(/^td$/i) },
			applyTo: function(surfItem, tab){
				var uptotable = ['parentNode'];
				var parent = surfItem.target.parentNode;
				while (parent && ! parent.nodeName.match(/^tr$/i)){
					parent = parent.parentNode;
					uptotable.push('parentNode');
				}
				return ActionControl.makeAutoSurf(surfItem, tab, 'surfMemberPath', uptotable.join('.'));
			}
		},
		*/
		{	name: "Reverse",
			tooltip: "Reverse this array-like object.",
			appliesTo: function(surfItem){ return surfItem.target && (surfItem.target.reverse || typeof surfItem.target.length != 'undefined') },
			applyTo: function(surfItem, tab){
				var node = document.createElement("div");
				node.surfItem = surfItem;
				node.tab = tab;
				node.activate = function(){
					var result;
					var name;
					if (this.surfItem.target.reverse){
						result = this.surfItem.target.reverse();
						name = this.surfItem.path + '.reverse()';
					}
					else{
						result = [];
						for (var i = this.surfItem.target.length - 1; i >= 0; i--)
							result.push(this.surfItem.target[i]);
						name = '<reverse>.call(' + this.surfItem.path + ')';
					}
					this.surfItem.attachSurfItem(new SurfItem(new TargetPath(result, name)));
					var tab = this.tab;
					setTimeout(
						function(){ tab.deselect(); },
						250
					);
				};
				return node;
			}
		},
		{	name: "HTML Color",
			tooltip: "This tab has the background color shown.",
			appliesTo: function(surfItem){ return typeof surfItem.target == 'string' && (surfItem.target.match(/^\#[0-9A-F]{3,3}$/i) || surfItem.target.match(/^\#[0-9A-F]{6,6}$/i)) },
			applyTo: function(surfItem, tab){
				tab.style.backgroundColor = surfItem.target;
				return document.createElement('div');
			}
		},
		{	name: "Hex",
			tooltip: "Convert this number from decimal to hexidecimal.",
			appliesTo: function(surfItem){ return typeof surfItem.target == 'number' || typeof surfItem.target == 'string' && surfItem.target.match(/^[\+\-]?[0-9]+$/) },
			applyTo: function(surfItem, tab){
				var node = document.createElement("div");
				node.surfItem = surfItem;
				node.tab = tab;
				node.activate = function(){
					this.surfItem.attachSurfItem(new SurfItem(new TargetPath(new Number(this.surfItem.target).toString(16), this.surfItem.path + '.toString(16)')));
					var tab = this.tab;
					setTimeout(
						function(){ tab.deselect(); },
						250
					);
				};
				return node;
			}
		},
		{	name: "Dec",
			tooltip: "Convert this number from hexidecimal to decimal.",
			appliesTo: function(surfItem){ return typeof surfItem.target == 'string' && surfItem.target.match(/^[\+\-]?[0-9A-F]+$/i) },
			applyTo: function(surfItem, tab){
				var node = document.createElement("div");
				node.surfItem = surfItem;
				node.tab = tab;
				node.activate = function(){
					this.surfItem.attachSurfItem(new SurfItem(new TargetPath(parseInt(this.surfItem.target, 16), 'parseInt(' + this.surfItem.path + ', 16)')));
					var tab = this.tab;
					setTimeout(
						function(){ tab.deselect(); },
						250
					);
				};
				return node;
			}
		},
		{	name: "Add <option>",
			tooltip: "Add an option element to this select element.",
			appliesTo: function(surfItem) { return surfItem.target && surfItem.target.nodeName && surfItem.target.nodeName.toLowerCase() == 'select' },
			applyTo: function(surfItem, tab){
				var node = document.createElement("div");
				node.appendChild(document.createTextNode("Title"));
				var title = node.titleInput = node.appendChild(document.createElement("input"));
				node.appendChild(document.createTextNode("Value"));
				var value = node.valueInput = node.appendChild(document.createElement("input"));
				title.surfItem = value.surfItem = surfItem;
				title.node = value.node = node;
				title.onkeypress = value.onkeypress = function(event){
					if (!event)
						event = window.event;
					if (keyCodes.enter[event.keyCode]){
						if (! (this.node.titleInput.value && this.node.valueInput.value))
							return alert("Please provide a title and a value.");
						var option = this.surfItem.target.appendChild(this.surfItem.target.ownerDocument.createElement('option'));
						option.value = this.node.valueInput.value;
						option.appendChild(option.ownerDocument.createTextNode(this.node.titleInput.value));
						if (event.shiftKey || event.altKey || event.ctrlKey)
							option.selected = true;
						var surfItem = this.surfItem.attachSurfItem(new SurfItem(new TargetPath(option, this.surfItem.path + '.appendChild(document.createElement(\'option\'))')));
						this.surfItem.refreshNode();
					}
				};
				node.activate = function(){
					this.titleInput.focus();
				};
				return node;
			}
		},
		{	name: "contentWindow",
			tooltip: "The contents of this frame.",
			appliesTo: function(surfItem) { return surfItem.target && surfItem.target.contentWindow },
			applyTo: function(surfItem, tab){
				return ActionControl.makeAutoSurf(surfItem, tab, 'surfMember', 'contentWindow');
			}
		},
		{	name: "Highlight Element",
			tooltip: "Highlight this element in the document.",
			appliesTo: function(surfItem){ return surfItem.target && surfItem.target.parentNode && surfItem.target.style },
			applyTo: function(surfItem, tab){
				if (! this.autocount)
					this.autocount = 0;
				this.autocount ++;
				var node = document.createElement('div');
				node.surfItem = surfItem;
				node.highlight = function(color){
					if (! color)
						color = 'red';
					if (typeof this.surfItem.target.save_border != 'string')
						this.surfItem.target.save_border = this.surfItem.target.style.border;
					this.surfItem.target.style.border = '10px solid ' + color;
					this.surfItem.target.scrollIntoView();
					if (getHostWindow() && getHostWindow().focus)
						getHostWindow().focus();
				};
				node.unhighlight = function(){
					if (typeof this.surfItem.target.save_border == 'string')
						this.surfItem.target.style.border = this.surfItem.target.save_border;
					this.border = null;
				};
				node.activate = function(){
					this.highlight();
				};
				node.deactivate = function(){
					this.unhighlight();
				}
				var colors = 'red green blue orange yellow'.split(/\s/);
				for (var i = 0; i < colors.length; i++){
					var radio = node.appendChild(document.createElement('input'));
					node.appendChild(document.createTextNode(colors[i]));
					radio.setAttribute('type', 'radio');
					radio.setAttribute('name', 'color' + this.autocount);
					radio.setAttribute('value', colors[i]);
					radio.node = node;
					radio.onchange = function(){
						this.node.highlight(this.value);
					};
				}
				return node;
			}
		},
		{	name: "Global",
			tooltip: "Get the global context that this item (probably) runs under.",
			appliesTo: function(surfItem){ return true },
			applyTo: function(surfItem, tab){
				var node = document.createElement("div");
				node.surfItem = surfItem;
				node.tab = tab;
				node.activate = function(){
					var global = this.surfItem.getBestGlobalContext();
					var name = '<global of>.call(' + this.surfItem.path + ')';
					this.surfItem.attachSurfItem(new SurfItem(new TargetPath(global, name)));
					var tab = this.tab;
					setTimeout(
						function(){ tab.deselect(); },
						250
					);
				};
				return node;
			}
		}
	],
	tabSelect: function(){
		var tabs = this.tabs;
		var previous = null;
		for (var i = 0; i < tabs.length; i++)
			if (tabs[i].selected()){
				previous = tabs[i];
				tabs[i].deselect();
			}
		if (previous == this)
			this.surfItem.showControl();
		else{
			this.className += ' selected';
			this.surfItem.showControl(this.control);
		}
		return false;
	},
	tabSelected: function(){
		return !!this.className.match(/\sselected\b/);
	},
	tabDeselect: function(){
		this.className = this.className.replace(/\sselected\b/, '');
	}
};
ActionControl.makeAutoSurf = function(surfItem, tab, method, member, nextAction){
	var node = document.createElement("div");
	node.surfItem = surfItem;
	node.member = member;
	node.nextAction = nextAction;
	node.tab = tab;
	node.activate = function(){
		var result = this.surfItem[method](this.member);
		if (this.nextAction)
			result.activateAction(this.nextAction);
		var tab = this.tab;
		setTimeout(
			function(){ tab.deselect(); },
			250
		);
	};
	return node;
};

document.createSwitcher = function(switchType){
	var node = document.createElement("div");
	node.switcher = node.appendChild(document.createElement(switchType));
	node.switcher.node = node;
	node.switcher.onclick = document.createSwitcher.switcherOnClick;
	node.selectedChild = null;
	return node;
};
document.createSwitcher.switcherOnClick = function(){
	var next = null;
	var current = this.node.selectedChild;
	if (current){
		current.className = current.className.replace(/\sselected\b/, '');
		next = current.nextSibling;
	}
	if (! next)
		next = this.node.firstChild;
	if (next == this)
		next = next.nextSibling;
	if (next)
		next.className += ' selected';
	this.node.selectedChild = next;
};

function Querier(assignor, delimiter, starter){
	this.assignor = assignor || '=';
	this.delimiter = delimiter || '&';
	this.starter = arguments.length == 2 ? '?' : starter;
}
Querier.prototype = {
	decode: function(string){
		if (this.starter && string.indexOf(this.starter) + 1)
			string = string.substr(string.indexOf(this.starter) + this.starter.length);
		var tokens = string.split(this.delimiter);
		var query = {};
		for (var i in tokens){
			var equal = tokens[i].indexOf(this.assignor);
			if (equal < 0 && tokens.length == 1)
				return query;
			if (equal < 0)
				equal = tokens[i].length;
			var name = decodeURIComponent(tokens[i].substr(0, equal));
			var value = decodeURIComponent(tokens[i].substr(equal + 1));
			query[name] = value;
		}
		return query;
	},
	encode: function(query){
		var tokens = [];
		for (var name in query)
			tokens.push(encodeURIComponent(name) + this.assignor + encodeURIComponent(query[name]));
		return tokens.join(this.delimiter);
	}
};

/*
 * Setup view
 */


(function setup_commenter(list_location, list_name){
	var commenter = document.body.appendChild(document.createElement('div'));
	commenter.className = 'commenter';
	var use = commenter.use = commenter.appendChild(document.createElement('a'));
	use.appendChild(document.createTextNode('Comment/Suggestion'));
	use.href = '#';
	use.commenter = commenter;
	use.onclick = function(){
		this.commenter.comment.style.display = '';
		this.style.display = 'none';
		return false;
	};
	var comment = commenter.comment = commenter.appendChild(document.createElement('div'));
	comment.style.display = 'none';
	comment.commenter = commenter;
	comment.input = comment.appendChild(document.createElement('input'));
	comment.input.comment = comment;
	comment.input.onkeypress = function(){
		if (! event)
			event = window.event;
		if (keyCodes.enter[event.keyCode])
			this.comment.submit.onclick();
	}
	comment.submit = comment.appendChild(document.createElement('button'));
	comment.submit.appendChild(document.createTextNode('Submit'));
	comment.submit.comment = comment;
	comment.submit.onclick = function(){
		this.comment.style.display = 'none';
		var submission = this.comment.commenter.submission;
		while (submission.firstChild)
			submission.removeChild(submission.firstChild);
		var frame = submission.appendChild(document.createElement('iframe'));
		submission.style.display = '';
		frame.style.border = 'none';
		frame.style.width = '100%';
		frame.src = list_location + "linesubmit.cgi?list=" + encodeURIComponent(list_name) + "&line=" + encodeURIComponent(this.comment.input.value) + "&unique=" + new Date().valueOf();
		this.comment.input.value = '';
		var close = submission.appendChild(document.createElement('a'));
		close.appendChild(document.createTextNode('Close'));
		close.href = '#';
		close.submission = commenter.submission;
		close.onclick = function(){
			this.submission.style.display = 'none';
			this.submission.commenter.use.style.display = '';
			return false;
		}
		return false;
	};
	commenter.submission = commenter.appendChild(document.createElement('div'));
	commenter.submission.commenter = commenter;
	commenter.submission.style.display = 'none';
})("http://ww2.cs.fsu.edu/~kuck/lists/", "domx");

var evaler = document.body.appendChild(document.createElement('input'));
evaler.size = 80;
evaler.onkeypress = function(event){
	if (! event)
		event = window.event;
	if (keyCodes.enter[event.keyCode]){
		if (this.xpath && this.value.match(/^\s*[\/\.]/) && ! this.value.match(/\/[igm]{0,3}\s*$/)) // xpath exists, value starts like an xpath, value doesn't end like a regex
			this.xpath.onclick(event);
		else
			this.go.onclick(event);
	}
}
evaler.go = document.body.appendChild(document.createElement('button'));
evaler.go.appendChild(document.createTextNode('Go'));
evaler.go.input = evaler;
evaler.go.onclick = function(event){
	if (! event)
		event = window.event;
	var surfItem = SurfItem.createFromPath(this.input.value);
	list.insertBefore(surfItem.node, list.firstChild);
	if (event.shiftKey || event.altKey || event.ctrlKey)
		surfItem.activateAction("Follow Path");
}
evaler.search = document.body.appendChild(document.createElement('button'));
evaler.search.appendChild(document.createTextNode('Search'));
evaler.search.input = evaler;
evaler.search.onclick = function(){
	var regex = new RegExp(this.input.value, 'i');
	var ws = getAllWindows();
	var ArrayFunction = getHostWindow().Array;
	var search = new ArrayFunction();
	for (var i = 0; i < ws.length; i++){
		var doc = ws[i].contentDocument || ws[i].document;
		var all = doc.getElementsByTagName('*');
		for (var i = 0; i < all.length; i++)
			if (all[i].firstChild && regex.test(all[i].firstChild.nodeValue))
				search.push(all[i]);
	}
	list.insertBefore(new SurfItem(new TargetPath(search, '<search results>')).node, list.firstChild);
}
if (host.document.selectNodes){
	evaler.xpath = document.body.appendChild(document.createElement('button'));
	evaler.xpath.appendChild(document.createTextNode('XPath'));
	evaler.xpath.input = evaler;
	evaler.xpath.onclick = function(){
		try{
			var nodes = getHostWindow().document.selectNodes(this.input.value);
			var surfItem = new SurfItem(new TargetPath(nodes, 'document.selectNodes("' + this.input.value + '")'));
			list.insertBefore(surfItem.node, list.firstChild);
			surfItem.activateAction("Members");
			/*
			for (var i = nodes.length - 1; i >= 0; i--)
				list.insertBefore(new SurfItem(new TargetPath(nodes[i], 'document.selectNodes("' + this.input.value + '")[' + i + ']')).node, list.firstChild);
			if (! nodes.length)
				list.insertBefore(new SurfItem(new TargetPath('<no results>', 'document.selectNodes("' + this.input.value + '")')).node, list.firstChild);
			*/
		}
		catch(e){
			list.insertBefore(new SurfItem(new TargetPath(e, 'document.selectNodes("' + this.input.value + '")')).node, list.firstChild);
		}
	}
}

if (getAllWindows().length > 1){
	evaler.windows = document.body.appendChild(document.createElement('button'));
	evaler.windows.appendChild(document.createTextNode('Windows & Frames'));
	evaler.windows.onclick = function(){
		list.insertBefore(new SurfItem(new TargetPath(getAllWindows(), '<all windows and frames>')).node, list.firstChild);
	};
}

var list = document.body.appendChild(document.createElement("div"));
list.className = 'list';
if (this.startPath)
	list.appendChild(new SurfItem(new TargetPath(this.startObject, this.startPath)).node);
else{
	list.appendChild(SurfItem.createFromPath('document').node);
	list.appendChild(SurfItem.createFromPath('window').node);
}
