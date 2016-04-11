angular.module('sevenHillsApp', ['ngSanitize', 'ui.router', 'ncy-angular-breadcrumb', 'ui.select'])
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
      url: '/search',
      templateUrl: 'views/search.html',
      controller: 'searchController',
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
    .state('add.material', {
      url: '/material',
      templateUrl: 'views/addMat.html',
      controller: 'addMatController',
      ncyBreadcrumb:{
        label: 'Add Material'
      }
    })
    .state('solution', {
      url: '/solution/:solutionID',
      templateUrl: 'views/solution.html',
      controller: 'solutionController',
      ncyBreadcrumb:{
        label: 'Solution'
      }
    })
  });

