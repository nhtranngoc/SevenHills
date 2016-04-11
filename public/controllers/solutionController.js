angular.module('sevenHillsApp')
	.controller('solutionController', function($scope, $stateParam){
	    var solutionID = $stateParams.solutionID;
	    connection.query('SELECT * from Solutions WHERE solutionID = ?', solutionID, function(err, rows, fields))
	    {
	    	console.log(rows);
	    }
	})
