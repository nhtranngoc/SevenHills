angular.module('sevenHillsApp')
	.controller('searchController', function($scope, $stateParams, searchResolve){
  		console.log(searchResolve);
		console.log($stateParams);
		$scope.searchString = $stateParams.search;
		$scope.searchBar = $scope.searchString;
		$scope.results = searchResolve;
		$scope.num = $scope.results.length;
	})