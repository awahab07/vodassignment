'use strict';

/**
 * @ngdoc filter
 * @name vodAssignmentApp.filter:propJoin
 * @function
 * @description extract a property from a list of objects and join them with separator
 * # propJoin
 * Filter in the vodAssignmentApp.
 */
angular.module('vodAssignmentApp')
  .filter('propJoin', function () {
    return function (objArray, prop, separator) {
      return objArray.map(function(obj) {
        return obj[prop];
      }).join(separator);
    };
  });
