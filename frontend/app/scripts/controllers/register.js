'use strict';

/**
 * @ngdoc function
 * @name jwtPlayApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the jwtPlayApp
 */
angular.module('jwtPlayApp')
  .controller('RegisterCtrl', function ($scope, $http, alert, authToken) {
    $scope.submit = function(){

      var url = 'http://localhost:3000/register';

      var user = {email:$scope.email,password:$scope.password};

      $http.post(url, user).success(function(resp){
        authToken.setToken(resp.token);
        alert('success', 'Account Created!', 'Welcome, '+ resp.user.email);
      }).error(function(error){
        alert('warning', 'Oops!', 'Could not register:' + error);
      });

    };
  });
