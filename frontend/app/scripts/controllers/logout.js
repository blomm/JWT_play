'use strict';

angular.module('jwtPlayApp').controller('LogoutCtrl', function (authToken, $state) {
    authToken.removeToken();
    $state.go('main');
  });
