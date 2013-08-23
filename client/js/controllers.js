opengash.controller("getAuthUrl", ['$scope', function ($scope) {
	$scope.model = {
		authUrl: "this"
	}
}]);

opengash.controller('mainCtrl', [
	'$scope',
	'$state',
	'$cookies',
	'$window',
	function($scope, $state, $cookies, $window) {
		if ($cookies.loggedIn == '1' && typeof $cookies.accessToken !== 'undefined') {
			// User is logged in and has a fresh access token.
			if (true) { // Has added GA views
				// Display views
			}
			else {
				// Prompt user to add views.
			}
		}
		else if ($cookies.loggedIn == '1' && typeof $cookies.accessToken === 'undefined') {
			// User is logged in, but his access token has expired. Silently redirect to authUrl.
			console.log('ok');
		}
		else {
			// User is not logged in. Display login page.
			$state.go('login');
		}
	}
]);