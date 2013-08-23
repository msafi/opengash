(function(window, undefined) {
	var env = 'dev';
	var og = {
		parseCookies: function (cookiesString) {
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
		},
		authUrl: function(clientId, redirectUrl, csrf) {
			var params = {
				client_id: clientId,
				response_type: "code",
				scope: "email https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/userinfo.profile",
				redirect_uri: redirectUrl
			}
			if (csrf) params.state = "security_token" + csrf;
			if (env !== 'production') params.prompt = 'consent';

			var url = "https://accounts.google.com/o/oauth2/token?";
			return url + $.param(params);
		}
	}

	window.log = function () {
		log.history = log.history || [];   // store logs to an array for reference
		log.history.push(arguments);
		if (this.console) {
			console.log(Array.prototype.slice.call(arguments));
		}
	};

	window.og = og;
})(window);