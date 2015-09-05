'use strict';

describe('Filter: propJoin', function () {

  // load the filter's module
  beforeEach(module('vodAssignmentApp'));

  // initialize a new instance of the filter before each test
  var propJoin;
  beforeEach(inject(function ($filter) {
    propJoin = $filter('propJoin');
  }));

  it('should return the input prefixed with "propJoin filter:"', function () {
    var text = 'angularjs';
    expect(propJoin(text)).toBe('propJoin filter: ' + text);
  });

  it('should filter an Object Array to string of concatenated asked attribute value', function () {
    var objArray = [
      {
        name: "Author1"
      },
      {
        name: "Author2",
        attr2: "something"
      },
      {
        name: "Author3",
        attr4: 450
      }
    ];
    expect(propJoin(objArray)).toBe("Author1, Author2, Author3");
  });

});
