
(function(context){

	function Bubble(url, radius, offsetX, offsetY){
		var element = 
			this.element = 
			document.createElement('div');
		element.style.backgroundImage = 'url(' + url + ')';
		element.style.overflow = 'hidden';
		this.update({
			radius : radius,
			offsetX : offsetX,
			offsetY : offsetY
		});
	}

	Bubble.prototype = {
		refresh: function(){
			var element = this.element;
			element.style.width = this.radius + 'px';
			element.style.height = this.radius + 'px';
			element.style.backgroundPosition = '-' + this.offsetX + 'px -' + this.offsetY + 'px';
			element.style.borderRadius = this.radius + 'px';
		},
		update: function(changes){
			var fields = ['radius', 'offsetX', 'offsetY'];
			for (var i = 0; i < fields.length; i++)
				if (typeof changes[i] != 'undefined')
					this[i] = changes[i];
			this.refresh();
		},
		show: function(where){
			where.appendChild(this.element);
		}
	};

	context.Bubble = Bubble;


})(this);
