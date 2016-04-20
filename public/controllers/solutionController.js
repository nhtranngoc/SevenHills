angular.module('sevenHillsApp')
.directive('backImg', function() {
    return function(scope, element, attrs) {
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url + ')',
            'background-size': 'cover'
        });
    };
})
.controller('solutionController', function($scope, $stateParams, $http, solutionResolve, materialResolve, imageResolve) {
    $scope.solution = solutionResolve[0];
    console.log(imageResolve);
    $scope.images = imageResolve;
    jQuery('.rating').rating('rate', parseInt($scope.solution.Difficulty));
    $scope.matTable = materialResolve;
    // console.log(materialResolve);
})