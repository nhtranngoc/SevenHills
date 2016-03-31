var searchObj = {};
angular.module('sevenHillsApp')
	.controller('mainController', function($scope, $http, $location) {
    	$scope.submitSearch = function() {
    		searchObj.searchString = $scope.search;
        	$http.get('/index', $scope.search)
        	.success(function(response) {
            	console.log(response);
            	$location.path('/search');
            	searchObj.result = response;
        	})
        }})
    .service('sharedInfo', function() {
        return {
        	getProperty: function() {
            return searchObj;
            }
        }
    })