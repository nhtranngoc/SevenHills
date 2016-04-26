angular.module('sevenHillsApp')
.controller('indexController', function($scope, $rootScope, $state, $http){
    $scope.logout = function() {
      $http.get('/auth/logout').then(
      	function(data){
      		$rootScope.authenticated = false;
      		$rootScope.currentUser = null;
      		$state.go($state.current, {}, {reload: true});
      	});
    }
  })