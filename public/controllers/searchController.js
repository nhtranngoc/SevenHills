angular.module('sevenHillsApp')
	.controller('searchController', function($scope, sharedInfo){
		console.log(sharedInfo.getProperty())
		$scope.searchString = sharedInfo.getProperty().searchString;
		$scope.searchBar = $scope.searchString;
		$scope.results = sharedInfo.getProperty().result;
		$scope.num = $scope.results.length;
		// $scope.num = 5;
	})