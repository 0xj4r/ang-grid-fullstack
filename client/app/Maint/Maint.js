'use strict';

angular.module('fullGridApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/Maint', {
        templateUrl: 'app/Maint/Maint.html',
        controller: 'MaintCtrl'
      });
  });
