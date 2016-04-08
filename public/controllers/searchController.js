angular.module('sevenHillsApp')
	.controller('searchController', function($scope, sharedInfo){
		console.log(sharedInfo.getProperty())
		$scope.searchBar = sharedInfo.getProperty().searchString;
		$scope.results = sharedInfo.getProperty().result;
		$scope.num = $scope.results.length();
		// $scope.num = 5;
	})