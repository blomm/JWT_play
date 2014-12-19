'use strict';

angular.module('jwtPlayApp').controller('RegisterCtrl', function ($scope, alert, $auth) {
    $scope.submit = function(){

      $auth.signup({email:$scope.email, password: $scope.password}).then(function(res){
        alert('success', 'Account created!', ' Welcome, '+ res.data.user.email);
      }).catch(function(error){
        error = error === 'Unauthorized'?'Email exists already':'Unauthorized';
        alert('warning', 'Oops!', ' Could not register: ' + error);
      });

    };
  });
