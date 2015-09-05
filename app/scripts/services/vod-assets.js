'use strict';

/**
 * @ngdoc service
 * @name vodAssignmentApp.VodAssets
 * @description
 * # VodAssets
 * Service in the vodAssignmentApp.
 */
angular.module('vodAssignmentApp')
	.constant('vodAssetsUrl', 'data/vod_assets.json'/*'http://s3.amazonaws.com/vodassets/showcase.json'*/)
	.service('VodAssets', ['$http', '$q', 'vodAssetsUrl', function ($http, $q, vodAssetsUrl) {
		// AngularJS will instantiate a singleton by calling "new" on this function
		var records = [],
        recordsPromise = null,
        allImagesCached = false,
        cachePromise = null,
        recentlyLoadedImage = null,
        nImagesToCache = 0,
        nCachedImages = 0,
        cachedSizes = [];

		var loadRecords = function() {
      // Reuse if already loaded
      if(recordsPromise) {
        return recordsPromise;
      }

      // If records aren't already loaded in application, send GET to load records
      recordsPromise = (
        $http.get(vodAssetsUrl, {
          method: 'GET',
          cache: true
        }).then(function(response) {
          // Success
          records = response.data;
        }, function(error) {
          // Error
          console.error("Error fetching records", error);
        })
      );

      return recordsPromise;
		};

    /**
     * Create Image object and listens load event to track progress of image caching
     * Images and loaded into data structures rather than on direct dom
     * @param imageLocation - the url/location of image
     * @param size - actual size of image
     * @param tileSize - assigned size when Image object is initialized
     * @param deferObj - promise to notify when this image will load
     * @returns {*|jQuery} jQuery wrapped Image Object
     */
    var createImageObjForLocation = function( imageLocation, size, tileSize, deferObj ) {
      return $(new Image(tileSize.w, tileSize.h))
        .prop("src", imageLocation)
        .load(function() {
          nCachedImages++;
          deferObj.notify(nCachedImages/nImagesToCache);
          if(nCachedImages === nImagesToCache) {
            deferObj.resolve("All Images Cached Successfully");
            allImagesCached = true;
          }

          recentlyLoadedImage = this;
        });
    };

    /**
     * This function will pre-load images for records and cache them in Image Objects
     * It will inject pre loaded image into object indexed as cachedImages[w][h] = Image()
     * @param records {Array<Object>} vodAssetObjects collection
     * @param size {Object} describing {w: number, h: number}
     */
    var cacheImages = function(records, size, tileSize) {
      // Reuse if already cached
      if(cachePromise) {
        return cachePromise;
      }

      nImagesToCache = records.length;

      var cacheDeferred = $q.defer();

      // Looping through loaded records to cache image for each one
      angular.forEach(records, function (item, index, arr) {
        // Loopin through available image sizes to load and cache appropriate one for this particular record
        angular.forEach(item.cardImages, function(cardImage, cardIndex, cards) {
          if(cardImage.w === size.w && cardImage.h === size.h) {
            item.cachedImages = item.cachedImages || [];
            item.cachedImages[size.w] = item.cachedImages[size.w] || [];
            item.cachedImages[size.w][size.h] = createImageObjForLocation(cardImage.url, size, tileSize, cacheDeferred);
            cachedSizes.push(size);
          }
        });
      });

      // To track progress of caching
      cachePromise = cacheDeferred.promise;
      return cacheDeferred.promise;
    };

    // Traverses the records collection and return the record upon id match
    var returnRecordById = function (recordId) {
      for(var i=0, l=records.length; i<l; ++i) {
        if(records[i].id == recordId) return records[i];
      }

      return null;
    };

    // Return available sizes of which image have been cached
    var getCachedSizes = function() {
      return cachedSizes;
    };

    // Service exposed API
		return {
			loadRecords: loadRecords, // To load records via Ajax
			getRecords: function() { return records; }, // To get loaded records
      getRecord: returnRecordById, // get a single record by ID
      getRecordById: returnRecordById, // get a single record by ID
      cacheImagesForRecordsAndSize: cacheImages, // Initiate image caching (if not already cached for provided size)
      getCachedSizes: getCachedSizes, // get available cache sizes for which images have been cached
      imagesCached: function () { return allImagesCached; }, // flag, to indicate whether images are cached or not
      imagesCount: function() { return nImagesToCache; }, // how many images will need to be cached
      cachedCount: function() { return nCachedImages; }, // how many images have been cached
      percentImagesCached: function() { return Math.ceil(nCachedImages/nImagesToCache*100); }, // helpful to show stats on UI elements
      getRecentlyLoadedImage: function( ) { return recentlyLoadedImage; } // useful to display a cached image
		}
	}]);
