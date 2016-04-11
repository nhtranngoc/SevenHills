angular.module('sevenHillsApp')
	.controller('searchController', function($scope, sharedInfo, $stateParams){
		$scope.on('stateChangeSucess', function(){
			console.log($stateParams);
			$http({
            method: 'GET',
            url: '/index',
            params: {
                'search': $stateParams
            }
        }).then(function(response) {
            console.log(response);
            $state.go('search', {search:$scope.search});
            searchObj.result = response;
        }, function(response, status) {
            console.log(status, response);
        });
		})
		console.log(sharedInfo.getProperty())
		$scope.searchString = sharedInfo.getProperty().searchString;
		$scope.searchBar = $scope.searchString;
		$scope.results = sharedInfo.getProperty().result.data;
		console.log($scope.results);
		$scope.num = $scope.results.length;
		// $scope.num = 5;
	})