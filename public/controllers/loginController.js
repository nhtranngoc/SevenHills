angular.module('sevenHillsApp')
.controller('loginController', function($scope, $http, $rootScope, $state) {
    $scope.user = {
        username: '',
        password: ''
    };
    $scope.error_message = '';
    $scope.auth = function authenticate(url) {
        $http.post(url, $scope.user)
        .then(function(response) {
            var data = response.data;
            console.log(data);
            if (data.user != null) {
                if (data.state == "success") {
                    $rootScope.authenticated = true;
                    $rootScope.currentUser = data.user;
                    $rootScope.message = "Welcome, " + $rootScope.currentUser;
                    $state.go('home');
                    console.log("SUCCESS");
                }
            } else {
                $scope.error_message = data.message;
            }
        }, function(error) {
            $scope.error_message = "This is weird";
        })
    }
})