'use strict';

/**
 * @ngdoc function ViewController that initiate caching if image aren't cached already
 * and provide statistics of caching progress
 * @name vodAssignmentApp.controller:ImageCacheViewCtrl
 * @description
 * # ImageCacheViewCtrl
 * Controller of the vodAssignmentApp
 */
angular.module('vodAssignmentApp')
  .controller('ImageCacheViewCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'VodAssets', 'defaultSizes',
    function ($rootScope, $scope, $location, $routeParams, vodAssetsService, defaultSizes) {
      $scope.nImagesToCache = "Calculating...";
      $scope.percentImagesCached = 0;
      $scope.nImagesCached = 0;

      if(!vodAssetsService.imagesCached()) {
        // val | 0 => will parse strings and floats to integers
        var imageWidth =  ( $routeParams.width | 0 ) || defaultSizes.width,
            imageHeight = ( $routeParams.height | 0 ) || defaultSizes.height,
            tileWidth = ( $routeParams.tileWidth | 0 ) || defaultSizes.tileHeight,
            tileHeight = ( $routeParams.tileHeight | 0 ) || defaultSizes.tileHeight;

        vodAssetsService.loadRecords().then(function() {

          var cachePromise = vodAssetsService.cacheImagesForRecordsAndSize(
            vodAssetsService.getRecords(),
            { w: imageWidth, h: imageHeight },
            { w: tileWidth, h:tileHeight }
          );

          // updating image count, need to be cached
          $scope.nImagesToCache = vodAssetsService.imagesCount();

          cachePromise.then(function() {
            // @TODO: Inform user all images have been successfully cached

            // Redirecting to previous/list view
            $location.path($rootScope.pathBeforeCaching || '/titles');
          }, function(error) {
            alert("Error while loading images" + error.toString());
          }, function (progress) {
            // This part will be executed every time an image successfully loads
            $scope.percentImagesCached = vodAssetsService.percentImagesCached();
            $scope.nImagesCached = vodAssetsService.cachedCount();

            // Displaying recently cached image
            var recentlyCachedImage = vodAssetsService.getRecentlyLoadedImage();
            if(recentlyCachedImage) {
              $("#display-cached-image-container").empty().append(recentlyCachedImage);
            }
          });

        }, function(error) {
          alert("Error loading records" + error.toString());
        })
      } else {
        $scope.nImagesToCache = "All Images are already cached";
        $scope.percentImagesCached = 100;
        $scope.nImagesCached = "All"
      }
  }]);
