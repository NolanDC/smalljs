
Queryables = {
	query: window.location.search.substring(1).replace('/', ''),
	params: {},
	getAll: function() {
		params = typeof params !== 'undefined' ? params : this._getAll()
		return params
	},
	_getAll: function() {
		var str_params = this.query.split('&')
		for(var i = 0; i < str_params.length; i++) {
			var pair = str_params[i].split('=')
			this.params[pair[0]] = pair[1]
		}
		return this.params
	},
	compose: function(params) {
		var str_params = []
		for(var i in params) {
			str_params.push(i.toString() + '=' + params[i])
		}
		return '?' + str_params.join('&')
	}
}