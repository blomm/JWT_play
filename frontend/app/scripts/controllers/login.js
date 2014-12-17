'use strict';


angular.module('jwtPlayApp').controller('LoginCtrl', function ($scope, alert, auth) {

  $scope.submit = function(){
    auth.login($scope.email, $scope.password).success(function(res){
      alert('success', 'Logged in!', ' Welcome, '+ res.user.email);
    }).error(function(error){
      alert('warning', 'Oops!', ' Could not log in: ' + error);
    });
  };
});
