'use strict';

/**
 * @ngdoc overview
 * @name vodAssignmentApp
 * @description
 * # vodAssignmentApp
 *
 * Main module of the application.
 */
angular
  .module('vodAssignmentApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .constant('defaultSizes', {width: 960, height: 600, tileWidth: 340, tileHeight: 225}) // Default image sizes
  .run(function ($rootScope, $location, VodAssets, defaultSizes) {
    $rootScope.getImagesCachedIfNotCached = function (imageSize, tileSize) {
      imageSize = imageSize || {w: defaultSizes.width, h: defaultSizes.height};
      tileSize = tileSize || {w: defaultSizes.tileWidth, h: defaultSizes.tileHeight};

      if(!VodAssets.imagesCached()) {
        $rootScope.pathBeforeCaching = $location.path();
        var cachingPath = ['/caching/', imageSize.w, '/', imageSize.h, '/', tileSize.w, '/', tileSize.h].join("");
        $location.path(cachingPath);
      }
    };
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/titles', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/movie/:id', {
        templateUrl: 'views/movie-view.html',
        controller: 'MovieViewCtrl'
      })
      .when('/caching/:width/:height/:tileWidth/:tileHeight', {
        templateUrl: 'views/image-cache-view.html',
        controller: 'ImageCacheViewCtrl'
      })
      .otherwise({
        redirectTo: '/titles'
      });
  });
