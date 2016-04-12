angular.module('sevenHillsApp')
	.controller('solutionController', function($scope, $stateParams, $http, solutionResolve){
	    console.log(solutionResolve);
	    $scope.solution = solutionResolve[0];

	})
