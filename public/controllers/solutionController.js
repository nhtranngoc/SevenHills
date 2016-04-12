angular.module('sevenHillsApp')
	.controller('solutionController', function($scope, $stateParams, $http){
	    var solutionID = parseInt($stateParams.solutionID);
	    // console.log($stateParams);
	    $http.post('/solutionid', {solutionID: solutionID}).then(
	    	function(response){
	    		console.log(response);
				$scope.solution = response[0];
	    	}, function(response, status){
	    		console.log(status, response);
	    	});
	})
