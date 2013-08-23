opengash.controller("getAuthUrl", ['$scope', function ($scope) {
	$scope.model = {
		authUrl: "this"
	}
}]);

opengash.controller('mainCtrl', [
	'$scope',
	function($scope) {
		$scope.myStuff = 'my stuffz';
	}
]);