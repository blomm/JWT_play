'use strict';

/**
 * @ngdoc function
 * @name jwtPlayApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the jwtPlayApp
 */
angular.module('jwtPlayApp')
  .controller('RegisterCtrl', function ($scope, $http, alert) {
    $scope.submit = function(){

      var url = 'http://localhost:3000/register';

      var user = {email:$scope.email,password:$scope.password};

      $http.post(url, user).success(function(resp){
        alert('success', 'OK!', 'You are now registered.');
      }).error(function(error){
        alert('warning', 'Oops!', 'Could not register.');
      });

    };
  });
