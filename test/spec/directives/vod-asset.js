'use strict';

describe('Directive: vodAsset', function () {

  // load the directive's module
  beforeEach(module('vodAssignmentApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<vod-asset></vod-asset>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the vodAsset directive');
  }));
});
