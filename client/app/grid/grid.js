'use strict';

angular.module('fullGridApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/grid', {
        templateUrl: 'app/grid/grid.html',
        controller: 'GridCtrl'
      });
  });
