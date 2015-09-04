'use strict';

/**
 * @ngdoc function
 * @name vodAssignmentApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vodAssignmentApp
 */
angular.module('vodAssignmentApp')
	.controller('MainCtrl', ['$scope', 'VodAssets', function ($scope, vodAssetsService) {
		vodAssetsService.loadRecords().then(function() {
			console.log(vodAssetsService.getRecords());
		})
	}]
);
