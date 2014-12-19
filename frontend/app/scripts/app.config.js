'use strict';

angular.module('jwtPlayApp').config(function($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL){

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

    $authProvider.loginUrl = API_URL + 'login';
    $authProvider.signupUrl = API_URL + 'register';

    $authProvider.google({
      clientId: '887645893823-1iimoab8icv1o6nqlufodket0f2sv0sk.apps.googleusercontent.com',
      url: API_URL + 'auth/google'
    });

    $authProvider.facebook({
      clientId: '1538967453010085',
      url: API_URL + 'auth/facebook'
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
