angular.module('sevenHillsApp', ['ngRoute', 'ngResource'])
  // Routing Configuration
  .config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'mainController'
    })
    .when('/random', {
      templateUrl: 'views/random.html',
      controller: 'randomController'
    })
    .when('/search', {
      templateUrl: 'views/search.html',
      controller: 'searchController'
    })
    .when('/add', {
      templateUrl: 'views/add.html',
      controller: 'addController'
    })
    .when('/solution', {
      templateUrl: 'views/solution.html',
      controller: 'solutionController'
    })
    .otherwise({ redirectTo: '/' });
  });

