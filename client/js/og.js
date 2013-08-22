var og = {
	l: function(value) {
		console.log(value);
	},
	parseCookies: function(cookiesString) {
		var cookies = {};
		var all = cookiesString;
		if (all === "")
			return cookies;
		var list = all.split("; ");
		for (i in list) {
			var cookie = list[i];
			var p = cookie.indexOf("=");
			var name = cookie.substring(0, p);
			var value = cookie.substring(p + 1);
			value = decodeURIComponent(value);
			cookies[name] = value;
		}
		return cookies;
	}
}