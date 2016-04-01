angular.module('sevenHillsApp')
	.controller('addMatController', function($scope, $state){
		$scope.submitAndHide = function(){
			$state.go('^');
		}
	})