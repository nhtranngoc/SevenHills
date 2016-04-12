angular.module('sevenHillsApp')
	.controller('searchController', function($scope, $stateParams, searchResolve, $state){
  		console.log(searchResolve);
		console.log($stateParams);
		$scope.searchString = $stateParams.search;
		$scope.searchBar = $scope.searchString;
		$scope.results = searchResolve;
		$scope.num = $scope.results.length;

		$scope.submitSearch = function(){
			$state.go('search', {search:$scope.searchBar});
		}
		// console.log($scope.results[0])
	})