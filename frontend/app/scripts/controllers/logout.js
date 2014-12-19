'use strict';

angular.module('jwtPlayApp').controller('LogoutCtrl', function ($auth, $state) {
    $auth.logout();
    $state.go('main');
  });
