'use strict';

angular.module('jwtPlayApp').controller('HeaderCtrl', function ($scope, authToken) {

  $scope.isAuthenticated = function(){
    return authToken.isAuthenticated();
  };


});
