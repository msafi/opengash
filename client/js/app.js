window.onload = function() {
	if (navigator.cookieEnabled) {
		// Cookies are enabled. Do stuff.
		var cookies = og.parseCookies(document.cookie);
		og.l(cookies.accessToken);
	}
	else {
		alert("You have cookies disabled. opengash won't work like that.")
	}
}