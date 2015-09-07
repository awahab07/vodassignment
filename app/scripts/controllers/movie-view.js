'use strict';

/**
 * @ngdoc function This controller provides data to single detail view of a particular movie record
 * @name vodAssignmentApp.controller:MovieViewCtrl
 * @description
 * # MovieViewCtrl
 * Controller of the vodAssignmentApp
 */
angular.module('vodAssignmentApp')
  .controller('MovieViewCtrl', ['$rootScope', '$scope', '$routeParams', 'VodAssets', function ($rootScope, $scope, $routeParams, VodAssetsService) {

    // Ensure images are cached
    if(!VodAssetsService.imagesCached()) {
      $rootScope.getImagesCachedIfNotCached();
    }

    var imageSize = VodAssetsService.getCachedSizes()[0] || null;
    $scope.record = VodAssetsService.getRecordById($routeParams.id) || {};
    $scope.topImageObj = imageSize && $scope.record.cachedImages[imageSize.w][imageSize.h].get(0) || null;

    // Injecting appropriate start class into record
    $scope.record.starClass = "star-rating-0" + ($scope.record.rating || 0);

    $scope.durationMinutes = ($scope.record.duration/60) | 0;
  }]);
