let language;

(function() {
	const cache = new Map();

	language = {
		loadLanguage: function(name) {
			fetch ("text/" + name + ".json")
				.then(response => response.json())
				.then(json => console.debug(json));
		}
	}
})();