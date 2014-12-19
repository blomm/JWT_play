'use strict';


angular.module('jwtPlayApp').controller('LoginCtrl', function ($scope, alert, auth, $auth) {

  $scope.submit = function(){
    $auth.login({email:$scope.email, password:$scope.password}).then(function(res){
      alert('success', 'Logged in!', ' Welcome, '+ res.data.user.email);
    }).catch(
      handleError
    );
  };

  $scope.authenticate = function(provider){
    $auth.authenticate(provider).then(function(res){
      alert('success', 'Logged in!', ' Welcome, '+ res.data.user.displayName);
    }).catch(
      handleError
    );
  };

  function handleError(err){
    alert('warning', 'Oops!', ' Could not log in: ' + err);
  }
});
