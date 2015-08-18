'use strict';

describe('Controller: MaintCtrl', function () {

  // load the controller's module
  beforeEach(module('fullGridApp'));

  var MaintCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MaintCtrl = $controller('MaintCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
