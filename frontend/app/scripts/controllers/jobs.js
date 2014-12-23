'use strict';

angular.module('jwtPlayApp').controller('JobsCtrl', function ($scope, $http, alert, API_URL) {

  $http.get('http://localhost:1337/job').success(function(jobs){
    $scope.jobs = jobs;
  }).error(function(err){
    alert('warning', 'Unable to get jobs: ', err.message);
  });

});
