'use strict';

describe('Service: VodAssets', function () {

  // load the service's module
  beforeEach(module('vodAssignmentApp'));

  // instantiate service
  var VodAssets;
  beforeEach(inject(function (_VodAssets_) {
    VodAssets = _VodAssets_;
  }));

  it('should do something', function () {
    expect(!!VodAssets).toBe(true);
  });

});
