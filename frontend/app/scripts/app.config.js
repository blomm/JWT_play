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
    })
    .state('login',{
      url:'/login',
      templateUrl:'/views/login.html',
      controller: 'LoginCtrl'
    });

    $httpProvider.interceptors.push('authInterceptor');
  })
  .constant('API_URL', 'http://localhost:3000/')
  .run(function($window){
    var params = $window.location.search.substring(1);

    if(params && $window.opener && $window.opener.location.origin === $window.location.origin){
      var code = decodeURIComponent(params.split('=')[1]);

      //post message from popup window to main window
      $window.opener.postMessage(code, $window.location.origin);

    }


  });
