angular.module('sevenHillsApp').controller('mainController', function(Notification, $rootScope, $scope, $http, $location, $state, sotdResolve) {
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    	if($rootScope.message){
    		Notification($rootScope.message);
    		$rootScope.message = null;
    	}
    })
    $scope.submitSearch = function() {
        $state.go('search', {search:$scope.search});
    }
    //Solution of the day
    $scope.sotd = sotdResolve;
})