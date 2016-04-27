angular.module('sevenHillsApp').directive('backImg', function() {
    return function(scope, element, attrs) {
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url + ')',
            'background-size': 'cover'
        });
    };
}).controller('solutionController', function($scope, $rootScope, $state, $stateParams, $http, Notification, solutionResolve, imageResolve, commentResolve) {
    $scope.solution = solutionResolve.solution[0];
    $scope.matTable = solutionResolve.material;
    $scope.comments = commentResolve;
    // $scope.images = imageResolve;
    var images = $scope.images = [];
    imageResolve.forEach(function(element, index, array) {
        images.push({
            path: element
        });
    })
    if (!$scope.solution) {
        $state.go('404');
    }
    jQuery('.rating').rating('rate', parseInt($scope.solution.Difficulty));
    $scope.editSolution = function() {
        $rootScope.edit = true;
        $rootScope.solutionToEdit = solutionResolve;
        $state.go('add');
    }
    $scope.deleteSolution = function() {
        $http({
            url: '/api/delete',
            method: 'POST',
            data: {
                solutionID: $scope.solution.solutionid
            },
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(function(data) {
            $rootScope.message = "Solution deleted successfully."
            $state.go('home', {}, {
                reload: true
            });
        }, function(data, status) {
            // console.log(status);
            Notification.error("Oops, something went wrong. Error code " + status);
        })
    }
    $scope.deleteComment = function(comment, index) {
        // Wait until we implement primary key
        $http({
            url: '/api/comment',
            method: 'DELETE',
            data: {
                commentID: comment.commentID
            },
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(function(data) {
            Notification("Comment deleted");
            $scope.comments.splice(index, 1);
        })
    }
    $scope.submitComment = function() {
        if (($scope.cmtName == null) || ($scope.cmtName == "")) {
            $scope.cmtName = "Anonymous"
        }
        $http.post('/api/comment', {
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
            // console.log($scope.addCmtForm);
            $scope.cmtName = "";
            $scope.cmtData = null;
        }, function(data, status) {
            // console.log(status, data);
        })
    }
})