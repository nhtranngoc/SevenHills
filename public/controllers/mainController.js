var searchObj = {};
angular.module('sevenHillsApp').controller('mainController', function($scope, $http, $location, $state) {
    $scope.submitSearch = function() {
        searchObj.searchString = $scope.search;
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
                search: $scope.search
            }
        }).then(function(response){
            console.log(response.data);
            $state.go('search');
            searchObj.result = response.data;
        }, function(response, status){
            console.log(status, response)
        })
        // $http.post('/index', $scope.search).then(function(response) {
        //     console.log(response);
        //     // $state.go('search');
        //     searchObj.result = response;
        // }, function(response, status) {
        //     console.log(status, response);
        // });
    }
    console.log($state);
}).service('sharedInfo', function() {
    return {
        getProperty: function() {
            return searchObj;
        }
    }
})