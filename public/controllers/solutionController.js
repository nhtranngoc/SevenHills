angular.module('sevenHillsApp').directive('backImg', function() {
    return function(scope, element, attrs) {
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url + ')',
            'background-size': 'cover'
        });
    };
}).controller('solutionController', function($scope, $state, $stateParams, $http, solutionResolve, imageResolve, commentResolve) {
    $scope.solution = solutionResolve.solution[0];
    $scope.matTable = solutionResolve.material;
    $scope.comments = commentResolve;
    $scope.images = imageResolve;
    if (!$scope.solution){
        $state.go('404');
    }
    jQuery('.rating').rating('rate', parseInt($scope.solution.Difficulty));
    $scope.submitComment = function() {
        if (($scope.cmtName == null) || ($scope.cmtName == "")) {
            $scope.cmtName = "Anonymous"
        }
        $http.post('/comment', {
            solutionID: parseInt($stateParams.solutionID),
            get: false,
            name: $scope.cmtName,
            commentText: $scope.cmtData
        }).then(function(data) {
            var curName = angular.copy($scope.cmtName);
            var curData = angular.copy($scope.cmtData);
            $scope.comments.push({
                name: curName,
                commenttext: curData
            });
            console.log($scope.addCmtForm);
            $scope.cmtName = "";
            $scope.cmtData = null;
        }, function(data, status) {
            console.log(status, data);
        })
    }
})