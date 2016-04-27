angular.module('sevenHillsApp', [
              'ngSanitize',
              'ngMessages', 
              'ui.router', 
              'ncy-angular-breadcrumb', 
              'ui.select', 
              'ngFileUpload', 
              'ui.bootstrap',
              'ui-notification'])
  .config(function($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
      prefixStateName: 'home'
    });
  })
  .config(function(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 8000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'bottom'
        });
    })
  // Routing Configuration
  .config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: 'views/main.html',
      controller: 'mainController',
      resolve: {
        sotdResolve: 
          function($http){
            return $http.get('/api/sotd').then(
              function(data){
                return parseInt(data.data.solutionid);
              })
          }
      },
      ncyBreadcrumb:{
        label: 'Home'
      }
    })
    .state('404', {
      url: '/pagenotfound',
      templateUrl: 'views/404.html',
      controller: '404Controller',
      ncyBreadcrumb: {
        label: 'Page Not Found'
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'loginController',
      ncyBreadcrumb: {
        label: 'Login'
      }
    })
    .state('search', {
      url: '/index?search',
      templateUrl: 'views/search.html',
      controller: 'searchController',
      resolve: {
        searchResolve: 
          function($http, $stateParams){
            return $http({
              method: 'GET',
              url: '/index',
              params: {
                'search': $stateParams.search
              }
            }).then(function(data){
              return data.data
            })
          }
      },
      ncyBreadcrumb:{
        label: 'Search Results'
      }
    })
    .state('add', {
      url: '/add',
      templateUrl: 'views/add.html',
      controller: 'addController',
      resolve: {
        tagResolve: function($http) {
          return $http.get('/api/tags').then(
            function(data){
              return data.data.map(function(item){
                return item['TagName'];
              });
            })
        },
        materialResolve: function($http) {
          return $http.get('/api/materials').then(
            function(data){
              return data.data
            })
        }
      },
      ncyBreadcrumb:{
        label: 'Add Solution'
      }
    })
    .state('solution', {
      url: '/solution/:solutionID',
      templateUrl: 'views/solution.html',
      controller: 'solutionController',
      resolve: {
        solutionResolve: function($http, $stateParams) {
          return $http.post('/api/solution', {solutionID: parseInt($stateParams.solutionID)}).then(
            function(data){
              return data.data;
            })
        },
        imageResolve: function($http, $stateParams) {
          return $http.post('/api/image', {solutionID: parseInt($stateParams.solutionID)}).then(
            function(data){
              var urlArr = data.data.map(function(element) {
                var newURL = "";
                newURL = "../uploaded/files/" + $stateParams.solutionID + "/" + element;
                return newURL;
              })
              return urlArr;
            }, function(data, status){
              return ["../res/img/err.png"];
            })
        }
        ,
        commentResolve: function($http, $stateParams) {
          return $http.post('/api/comment', {
            solutionID: parseInt($stateParams.solutionID),
            get: true,
            name: "aasdfla",
            commentText: "This is a bad comment"
          }).then(
          function(data){
            return data.data;
          })
        }
      },
      ncyBreadcrumb:{
        label: 'Solution'
      }
    })
  });

