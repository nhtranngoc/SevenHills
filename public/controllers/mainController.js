angular.module('sevenHillsApp').controller('mainController', function($scope, $http, $location, $state) {
    $scope.submitSearch = function() {
        $state.go('search', {search:$scope.search});
    }
})