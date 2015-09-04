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
  .config(function ($routeProvider) {
    $routeProvider
      .when('/titles', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/titles'
      });
  });
