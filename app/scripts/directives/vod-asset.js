'use strict';

/**
 * @ngdoc directive
 * @name vodAssignmentApp.directive:vodAsset
 * @description
 * # vodAsset
 */
angular.module('vodAssignmentApp')
  .directive('vodAsset', function () {
    return {
      templateUrl: 'views/directives/vod-asset.html',
      restrict: 'E',
      scope: false,
      link: {
        pre: function(scope, element, attrs) {
          // Injecting appropriate start class into record to iconify the rating star indicator appropriately
          scope.record.starClass = "star-rating-0" + (scope.record.rating || 0);
        },
        post: function(scope, element, attrs) {
          var imageObj = scope.record.cachedImages[scope.imageSize.w][scope.imageSize.h];
          var vodAssetCardElement = element.find(".vod-asset-card");
          if(vodAssetCardElement) {
            // Resizing tile/card
            vodAssetCardElement.width(scope.tileSize.w).height(scope.tileSize.h);

            // Scaling image
            imageObj.width(scope.tileSize.w).height(scope.tileSize.h);

            // Rendering cached image
            vodAssetCardElement.append(imageObj);
          }
        }
      }
    }
  });
