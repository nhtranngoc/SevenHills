angular.module('sevenHillsApp')
	.controller('solutionController', function($scope, $stateParams, $http){
	    var solutionID = parseInt($stateParams.solutionID);
	    // console.log($stateParams);
	    $http.post('/solutionid', {solutionID: solutionID}).then(
	    	function(response){
	    		console.log(response);
	    	}, function(response, status){
	    		console.log(status, response);
	    	});
	    $scope.solution = rows[0];
	})
