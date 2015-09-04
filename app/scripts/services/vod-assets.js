'use strict';

/**
 * @ngdoc service
 * @name vodAssignmentApp.VodAssets
 * @description
 * # VodAssets
 * Service in the vodAssignmentApp.
 */
angular.module('vodAssignmentApp')
	.constant('vodAssetsUrl', 'http://s3.amazonaws.com/vodassets/showcase.json')
	.service('VodAssets', ['$http', '$q', 'vodAssetsUrl', function ($http, $q, vodAssetsUrl) {
		// AngularJS will instantiate a singleton by calling "new" on this function
		var records = [];
		
		window.customVodAssetsJSONP = function(response) {
			console.log(response);
		};
		
		var loadRecords = function() {
			return (
				$http.jsonp(vodAssetsUrl, {
					method: 'GET',
					cache: true,
					params: {
						callback: "customVodAssetsJSONP"
					}
				}).then(function(response) {
					// Success
					records = response.data;
					console.log(response);
				}, function(error) {
					// Error
					console.error("Error fetching records", error);
				})
			);
		};

		return {
			loadRecords: loadRecords,
			getRecords: function() {
				return records;
			}
		}
	}]);
