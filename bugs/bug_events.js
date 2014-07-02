---
---

(function(context){
	var time = [];

	{% for post in site.posts %}
	time.push({
		title : {{ post.title | jsonify }},
		img : {{ post.page_img | jsonify }},
		size : {{ post.content | size }}
	});
	{% endfor %}

	context.bug_events = time.reverse();

})(this);
