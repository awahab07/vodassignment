"use strict";angular.module("vodAssignmentApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).constant("defaultSizes",{width:960,height:600,tileWidth:340,tileHeight:225}).run(["$rootScope","$location","VodAssets","defaultSizes",function(a,b,c,d){a.getImagesCachedIfNotCached=function(e,f){if(e=e||{w:d.width,h:d.height},f=f||{w:d.tileWidth,h:d.tileHeight},!c.imagesCached()){a.pathBeforeCaching=b.path();var g=["/caching/",e.w,"/",e.h,"/",f.w,"/",f.h].join("");b.path(g)}}}]).config(["$routeProvider",function(a){a.when("/titles",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/movie/:id",{templateUrl:"views/movie-view.html",controller:"MovieViewCtrl"}).when("/caching/:width/:height/:tileWidth/:tileHeight",{templateUrl:"views/image-cache-view.html",controller:"ImageCacheViewCtrl"}).otherwise({redirectTo:"/titles"})}]),angular.module("vodAssignmentApp").controller("MainCtrl",["$rootScope","$scope","VodAssets",function(a,b,c){b.records=[],b.recordsWithCachedImages=null,b.imageSize={w:960,h:600},b.tileSize={w:340,h:225},c.imagesCached()||a.getImagesCachedIfNotCached(b.imageSize,b.tileSize),c.loadRecords().then(function(){b.records=c.getRecords(),c.cacheImagesForRecordsAndSize(b.records,b.imageSize,b.tileSize).then(function(){b.recordsWithCachedImages=b.records})})}]),angular.module("vodAssignmentApp").constant("vodAssetsUrl","data/vod_assets.json").service("VodAssets",["$http","$q","vodAssetsUrl",function(a,b,c){var d=[],e=null,f=!1,g=null,h=null,i=0,j=0,k=[],l=function(){return e?e:e=a.get(c,{method:"GET",cache:!0}).then(function(a){d=a.data},function(a){console.error("Error fetching records",a)})},m=function(a,b,c,d){return $(new Image(c.w,c.h)).prop("src",a).load(function(){j++,d.notify(j/i),j===i&&(d.resolve("All Images Cached Successfully"),f=!0),h=this})},n=function(a,c,d){if(g)return g;i=a.length;var e=b.defer();return angular.forEach(a,function(a,b,f){angular.forEach(a.cardImages,function(b,f,g){b.w===c.w&&b.h===c.h&&(a.cachedImages=a.cachedImages||[],a.cachedImages[c.w]=a.cachedImages[c.w]||[],a.cachedImages[c.w][c.h]=m(b.url,c,d,e),k.push(c))})}),g=e.promise,e.promise},o=function(a){for(var b=0,c=d.length;c>b;++b)if(d[b].id==a)return d[b];return null},p=function(){return k};return{loadRecords:l,getRecords:function(){return d},getRecord:o,getRecordById:o,cacheImagesForRecordsAndSize:n,getCachedSizes:p,imagesCached:function(){return f},imagesCount:function(){return i},cachedCount:function(){return j},percentImagesCached:function(){return Math.ceil(j/i*100)},getRecentlyLoadedImage:function(){return h}}}]),angular.module("vodAssignmentApp").directive("vodAsset",function(){return{templateUrl:"views/directives/vod-asset.html",restrict:"E",scope:!1,link:{pre:function(a,b,c){a.record.starClass="star-rating-0"+(a.record.rating||0)},post:function(a,b,c){var d=a.record.cachedImages[a.imageSize.w][a.imageSize.h],e=b.find(".vod-asset-card");e&&(e.width(a.tileSize.w).height(a.tileSize.h),d.width(a.tileSize.w).height(a.tileSize.h),e.append(d))}}}}),angular.module("vodAssignmentApp").controller("MovieViewCtrl",["$rootScope","$scope","$routeParams","VodAssets",function(a,b,c,d){d.imagesCached()||a.getImagesCachedIfNotCached();var e=d.getCachedSizes()[0]||null;b.record=d.getRecordById(c.id)||{},b.topImageObj=e&&b.record.cachedImages[e.w][e.h].get(0)||null,b.record.starClass="star-rating-0"+(b.record.rating||0),b.durationMinutes=b.record.duration/60|0}]),angular.module("vodAssignmentApp").filter("propJoin",function(){return function(a,b,c){return a.map(function(a){return a[b]}).join(c)}}),angular.module("vodAssignmentApp").controller("ImageCacheViewCtrl",["$rootScope","$scope","$location","$routeParams","VodAssets","defaultSizes",function(a,b,c,d,e,f){if(b.nImagesToCache="Calculating...",b.percentImagesCached=0,b.nImagesCached=0,e.imagesCached())b.nImagesToCache="All Images are already cached",b.percentImagesCached=100,b.nImagesCached="All";else{var g=0|d.width||f.width,h=0|d.height||f.height,i=0|d.tileWidth||f.tileHeight,j=0|d.tileHeight||f.tileHeight;e.loadRecords().then(function(){var d=e.cacheImagesForRecordsAndSize(e.getRecords(),{w:g,h:h},{w:i,h:j});b.nImagesToCache=e.imagesCount(),d.then(function(){c.path(a.pathBeforeCaching||"/titles")},function(a){alert("Error while loading images"+a.toString())},function(a){b.percentImagesCached=e.percentImagesCached(),b.nImagesCached=e.cachedCount();var c=e.getRecentlyLoadedImage();c&&$("#display-cached-image-container").empty().append(c)})},function(a){alert("Error loading records"+a.toString())})}}]);