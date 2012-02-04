// something

self.port.on('search-results', function(json) {
	var s = '<ul>';
	for (i in json.results) {
		var row = json.results[i];
		s += '<li>@' + row.from_user + ': ' + row.text + ' <a href="' +  
		// https://twitter.com/#!/dgardner/status/165077237836677120
		'https://twitter.com/#!/' + row.from_user + '/status/' + row.id_str
		+ '" target="_blank">Open</a></li>';

	}

	document.querySelector('#search-results').innerHTML = s+'</ul>';
});