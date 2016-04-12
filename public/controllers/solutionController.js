angular.module('sevenHillsApp')
	.controller('solutionController', function($scope, $stateParams, $http, solutionResolve){
	    console.log(solutionResolve);
	    $scope.solution = solutionResolve[0];
	    jQuery('.rating').rating('rate', parseInt($scope.solution.Difficulty));
	})
