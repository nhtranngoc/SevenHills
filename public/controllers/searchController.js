angular.module('sevenHillsApp')
	.controller('searchController', function($scope, sharedInfo, $stateParams, $rootScope){
		$rootScope.$on('stateChangeSucess', function(event, toState, toParams, fromState, fromParams){
			console.log("let me know if this works");
			$http({
            method: 'POST',
            url: '/index',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function(obj) {
                var str = [];
                for (var p in obj) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {
                search: $stateParams.search
            }
        }).then(function(response){
            console.log(response.data);
            $scope.results = response.data;
        }, function(response, status){
            console.log(status, response)
        })
			// $http({
   //          method: 'GET',
   //          url: '/index',
   //          params: {
   //              'search': $stateParams.search
   //          }
   //      }).then(function(response) {
   //          console.log(response);
   //          // $state.go('search', {search:$scope.search});
   //          $scope.results = response.data;
   //      }, function(response, status) {
   //          console.log(status, response);
   //      });
		})
		console.log($stateParams);
		console.log(sharedInfo.getProperty())
		$scope.searchString = sharedInfo.getProperty().searchString;
		$scope.searchBar = $scope.searchString;
		$scope.results = sharedInfo.getProperty().result.data;
		console.log($scope.results);
		$scope.num = $scope.results.length;
		// $scope.num = 5;
	})