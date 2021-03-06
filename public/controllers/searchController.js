angular.module('sevenHillsApp')
.directive('errSrc', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('error', function() {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }
})
.controller('searchController', function($scope, $stateParams, searchResolve, $state) {
    $scope.searchString = $stateParams.search;
    $scope.searchBar = $scope.searchString;
    $scope.results = searchResolve;
    $scope.num = $scope.results.length;
    if (!$scope.searchString){
        $scope.totalRes = "Showing all " + $scope.num + " results";
    } else {
        $scope.totalRes = $scope.num + " results found for " + $scope.searchString;
    }
    $scope.submitSearch = function() {
            $state.go('search', {
                search: $scope.searchBar
            });
        }
        // console.log($scope.results[0])
})