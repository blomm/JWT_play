'use strict';

angular.module('jwtPlayApp').controller('RegisterCtrl', function ($scope, alert, auth) {
    $scope.submit = function(){

      auth.register($scope.email, $scope.password).success(function(res){
        alert('success', 'Account created!', ' Welcome, '+ res.user.email);
      }).error(function(error){
        alert('warning', 'Oops!', ' Could not register: ' + error);
      });

    };
  });
