angular.module('intrApp',
    [
      'ngRoute',
      'ngResource'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        'use strict';
        $routeProvider.when('/', {templateUrl: 'templates/inicio.html', controller: 'inicioCtrl'});
        $routeProvider.when('/loading', {templateUrl: 'templates/loading.html', controller: 'testCtrl'});
        $routeProvider.when('/mensajes', {templateUrl: 'templates/test.html', controller: 'testCtrl'});
        $routeProvider.when('/login', {templateUrl: 'templates/login.html', controller: 'authCtrl'});
        //$routeProvider.otherwise('/');
    }])
    .run(function (Authentication, Application, $rootScope, $location, RouteFilter) {

    Authentication.requestUser();
    Application.makeReady();



    $rootScope.$on('$locationChangeStart', function(scope, next, current) {

      if($location.path() === '/loading') return;

      if(! Application.isReady())
      {
        $location.path('loading');
      }

      RouteFilter.run($location.path());
    })
  });
