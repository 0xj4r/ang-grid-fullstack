'use strict';

describe('Controller: ComparisonCtrl', function () {

  // load the controller's module
  beforeEach(module('fullGridApp'));

  var ComparisonCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComparisonCtrl = $controller('ComparisonCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});
