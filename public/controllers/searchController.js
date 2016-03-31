angular.module('sevenHillsApp')
	.controller('searchController', function($scope, sharedInfo){
		console.log(sharedInfo.getProperty())
		$scope.searchBar = sharedInfo.getProperty().searchString;
	})