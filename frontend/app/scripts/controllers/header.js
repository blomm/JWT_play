'use strict';

angular.module('jwtPlayApp').controller('HeaderCtrl', function ($scope, $auth) {

  $scope.isAuthenticated = function(){
    return $auth.isAuthenticated();
  };
});
