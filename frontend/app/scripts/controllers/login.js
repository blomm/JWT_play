'use strict';


angular.module('jwtPlayApp').controller('LoginCtrl', function ($scope, alert, auth, $auth) {

  $scope.submit = function(){
    $auth.login({email:$scope.email, password:$scope.password}).then(function(res){
      var message = ' Welcome, '+ res.data.user.email;

      if(!res.data.user.active){
        message = ' Please remember to active your account soon.';
      }
      alert('success', 'Logged in!', message);
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
