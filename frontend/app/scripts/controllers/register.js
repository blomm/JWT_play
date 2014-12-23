'use strict';

angular.module('jwtPlayApp').controller('RegisterCtrl', function ($scope, alert, $auth) {
    $scope.submit = function(){

      $auth.signup({email:$scope.email, password: $scope.password}).then(function(res){
        alert('success', 'Account created!', ' Welcome, '+ res.data.user.email + '! Please check your email to activate your account in the next two days.');
      }).catch(function(error){
        error.data = error.data === 'Unauthorized'?'Email exists already':'Unauthorized';
        alert('warning', 'Oops!', ' Could not register: ' + error.data);
      });
    };
  });
