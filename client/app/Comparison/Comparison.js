'use strict';

angular.module('fullGridApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/comparison', {
        templateUrl: 'app/comparison/comparison.html',
        controller: 'ComparisonCtrl'
      });
  });
