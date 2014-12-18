'use strict';


angular.module('jwtPlayApp').controller('LoginCtrl', function ($scope, alert, auth) {

  $scope.submit = function(){
    auth.login($scope.email, $scope.password).success(function(res){
      alert('success', 'Logged in!', ' Welcome, '+ res.user.email);
    }).error(function(err){
      handleError(err);
    });
  };

  $scope.google = function(){
      auth.googleAuth().then(function(res){
      alert('success', 'Logged in!', ' Welcome, '+ res.user.displayName);
    },function(err){
      handleError(err);
    });
  };

  function handleError(err){
    alert('warning', 'Oops!', ' Could not log in: ' + err);
  }
});
