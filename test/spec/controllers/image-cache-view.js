'use strict';

describe('Controller: ImageCacheViewCtrl', function () {

  // load the controller's module
  beforeEach(module('vodAssignmentApp'));

  var ImageCacheViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ImageCacheViewCtrl = $controller('ImageCacheViewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
