angular.module('sevenHillsApp').controller('mainController', function($scope, $http, $location, $state, sotdResolve) {
    $scope.submitSearch = function() {
        $state.go('search', {search:$scope.search});
    }
    //Solution of the day
    $scope.sotd = sotdResolve;
    // console.log(sotdResolve);
})