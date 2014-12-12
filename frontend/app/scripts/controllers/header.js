'use strict';

angular.module('jwtPlayApp').controller('HeaderCtrl', function ($scope, authToken) {

  $scope.isAuthenticated = authToken.isAuthenticated();

});
