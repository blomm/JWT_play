'use strict';

angular.module('jwtPlayApp').config(function($urlRouterProvider, $stateProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main',{
      url:'/',
      templateUrl:'/views/main.html'
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
  });
