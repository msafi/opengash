var opengash = angular.module('opengash', ['ngRoute', 'ngCookies']);

opengash.config([
	'$routeProvider',
	'$locationProvider',
	function ($routeProvider, $locationProvider) {
		$routeProvider.
			when('/',
//				templateUrl: function() {
//
//					if (cookies.accessToken && cookies.loggedIn) {
//
//						log('access token: 1', 'logged in: 1');
//
//						// User has a fresh accessToken and loggedIn.
//						// Check if he's added GA views. If so, display 'em.
//						// Otherwise, prompt to add views.
//					}
//					else if (cookies.loggedIn && !cookies.accessToken) {
//						log('access token: 0', 'logged in: 1');
//						// User is logged in, but has an expired token.
//						// Forward to authenticated URL automatically.
//
//						// Request
//					}
//					else {
//						log('logged in: 0');
//						// Just show the homepage.
//					}
//
//					console.log(document.cookie);
//					return '../../connect.html';
//				},
//				controller: "getAuthUrl"
				return ''
			);
		$locationProvider.
			html5Mode(true).
			hashPrefix('!');
	}
]);

//window.onload = function() {
//	if (navigator.cookieEnabled) {
//		// Cookies are enabled. Do stuff.
//		var cookies = og.parseCookies(document.cookie);
//		var clientId = '984662609687-uf26q8nq2bnkbmsiib1u2d9kou3eb6ss.apps.googleusercontent.com';
//		var redirectUrl = 'http://opengash.com/authenticate';
//		log(og.authUrl(clientId, redirectUrl));
//		// Based on cookie value, load template.
//		if (cookies.accessToken && cookies.loggedIn) {
//
//			log('access token: 1', 'logged in: 1');
//
//			// User has a fresh accessToken and loggedIn.
//			// Check if he's added GA views. If so, display 'em.
//			// Otherwise, prompt to add views.
//		}
//		else if (cookies.loggedIn && !cookies.accessToken) {
//			log('access token: 0', 'logged in: 1');
//			// User is logged in, but has an expired token.
//			// Forward to authenticated URL automatically.
//
//			// Request
//		}
//		else {
//			log('logged in: 0');
//			// Just show the homepage.
//		}
//	}
//	else {
//		alert("You have cookies disabled. opengash won't work like that.")
//	}
//}