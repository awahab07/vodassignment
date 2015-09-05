'use strict';

/**
 * @ngdoc function Main controller called on load of application and provides data to list view of movie records/collection
 * @name vodAssignmentApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vodAssignmentApp
 */
angular.module('vodAssignmentApp')
  .controller('MainCtrl', ['$rootScope', '$scope', 'VodAssets', function ($rootScope, $scope, vodAssetsService) {
    $scope.records = [];
    $scope.recordsWithCachedImages = null; // This collection will be used to render vod-asset directive
    $scope.imageSize = {w: 960, h:600}; // smaller sizes aren't accessible from vodAssets AWS service
    $scope.tileSize = {w: 340, h:225}; // Scaling down

    // Ensure images are cached
    if(!vodAssetsService.imagesCached()) {
      $rootScope.getImagesCachedIfNotCached($scope.imageSize, $scope.tileSize);
    }

    // If records were loaded and cached already, their results will be reused instead of recalling the loading
    // and caching mechanism
    // Functionality is recalled here to keep flow descriptive
		vodAssetsService.loadRecords().then(function() {
			$scope.records = vodAssetsService.getRecords();
      vodAssetsService.cacheImagesForRecordsAndSize($scope.records, $scope.imageSize, $scope.tileSize).then(function() {
        $scope.recordsWithCachedImages = $scope.records;
        //console.log("images cached");
      });
		});
	}]
);
