'use strict';

angular.module('jwtPlayApp').config(function($urlRouterProvider, $stateProvider, $httpProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main',{
      url:'/',
      templateUrl:'/views/main.html'
    })
    .state('jobs',{
      url:'/jobs',
      templateUrl:'/views/jobs.html',
      controller:'JobsCtrl'
    })
    .state('logout',{
      url:'/logout',
      controller: 'LogoutCtrl'
    })
    .state('register',{
      url:'/register',
      templateUrl:'/views/register.html',
      controller: 'RegisterCtrl'
    });

    $httpProvider.interceptors.push('authInterceptor');
  })
  .constant('API_URL', 'http://localhost:3000/');
