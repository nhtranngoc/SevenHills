var searchObj = {};
angular.module('sevenHillsApp')
	.controller('mainController', function($scope, $http, $location, $state) {
    	$scope.submitSearch = function() {
    		searchObj.searchString = $scope.search;
        	$http.get('/index', $scope.search)
        	.success(function(response) {
            	console.log(response);
            	$state.go('search')
            	searchObj.result = response;
        	})
        }
        console.log($state);
    })
    .service('sharedInfo', function() {
        return {
        	getProperty: function() {
            return searchObj;
            }
        }
    })