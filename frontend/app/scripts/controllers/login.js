'use strict';


angular.module('jwtPlayApp').controller('LoginCtrl', function ($scope, $http, alert, authToken, API_URL) {
  $scope.submit = function(){

    var url = API_URL+ 'login';

    var user = {email:$scope.email,password:$scope.password};

    $http.post(url, user).success(function(resp){
      authToken.setToken(resp.token);
      alert('success', 'Logged in!', ' Welcome, '+ resp.user.email);
    }).error(function(error){
      alert('warning', 'Oops!', ' Could not log in: ' + error);
    });
  };
});
