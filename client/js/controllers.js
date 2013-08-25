opengash.controller('mainCtrl', [
	'$scope',
	'$state',
	'$cookies',
	'ogAccount',
	function($scope, $state, $cookies, ogAccount) {
		ogAccount.getGaViews();
		if (typeof $cookies.loggedIn !== 'undefined' && typeof $cookies.accessToken !== 'undefined') {
			// User is logged in and has a fresh access token.

			ogAccount.getGaViews().then(function(json) {
				console.log(json);
			}, function() {
				console.log('Errorz');
			});

			if (typeof gaViews !== 'undefined') { // Has added GA views
				// Display views
			}
			else {
				// Prompt user to add views.
			}
		}
		else {
			// User is not logged in. Display login page.
			$state.go('login');
		}
	}
]);

opengash.controller('connectCtrl', [
	'$scope',
	'authUrl',
	function($scope,authUrl) {
		$scope.authUrl = authUrl;
	}
]);