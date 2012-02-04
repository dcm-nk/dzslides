const data = require("self").data;

// create our panel to display the search results
const panel = require("panel").Panel({
	height: 450,
	width: 550,
	contentURL: data.url('search_panel.html'),
	contentScriptFile: data.url('search_panel.js')
});

// define the context-menu item
let cm = require("context-menu");
cm.Item({
	label: 'Search twitter?',
	context: cm.SelectionContext(),
	contentScript: 'self.on("click", function() { self.postMessage(window.getSelection().toString()); });',
	onMessage: function(data) {
		doSearch(data, function(json) {
			// console.log(JSON.stringify(json, null, '    '));
			panel.port.emit('search-results', json);
			panel.show();
		});
	}
});

// wrap the request in a function that takes a callback
// could potentially also get search term via some other means?
function doSearch(term, callback) {
	let twitter_search = require("request").Request({
		url: "http://search.twitter.com/search.json?q=" + term,
		onComplete: function(response) {
			callback(response.json);
		}
	}).get();
}
