angular.module('sevenHillsApp', ['ngSanitize', 'ngMessages' ,'ui.router', 'ncy-angular-breadcrumb', 'ui.select'])
  .config(function($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
      prefixStateName: 'home'
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
      ncyBreadcrumb:{
        label: 'Home'
      }
    })
    .state('random', {
      url: '/random',
      templateUrl: 'views/random.html',
      controller: 'randomController',
      ncyBreadcrumb:{
        label: 'Random'
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
      ncyBreadcrumb:{
        label: 'Add Solution'
      }
    })
    .state('solution', {
      url: '/solution/:solutionID',
      templateUrl: 'views/solution.html',
      controller: 'solutionController',
      resolve: {
        solutionResolve: 
          function($http, $stateParams) {
            return $http.post('/solutionid', {solutionID: parseInt($stateParams.solutionID)}).then(
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

