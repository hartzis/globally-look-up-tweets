'use strict';
(function(){
  var mapTweetInfoApp = angular.module('mapTweetInfoApp', [
    'ngResource',
    'ngRoute',
    'ngAnimate',
    'searchControllers',
    'resultsControllers',
    'historyControllers',
    'latLngServices',
    'twitterSearchServices',
    'mapServices',
    'historyServices',
    'ngEnterDirectives',
    'tweetDirectives',
    'historyDirectives',
    'ui.bootstrap',
    'ui.map',
    'mapDirectives'

  ]);

  // setup angular single page routes
  mapTweetInfoApp.config(['$routeProvider', '$locationProvider',
      function($routeProvider, $locationProvider) {
          $routeProvider
              .when('/', {
                  templateUrl: 'partials/search',
                  controller: 'searchCtrl'
              })
              .when('/search/:searchId', {
                  templateUrl: 'partials/searchResults',
                  controller: 'resultsCtrl'
              })
              .when('/history', {
                  templateUrl: 'partials/history',
                  controller: 'historyCtrl',
                  resolve: {
                    searchHistory: ['historyFactory',
                      function(historyFactory) {
                        return historyFactory.retrieveSearchHistory();
                      }
                    ]
                  }
              })
              .when('/about', {
                  templateUrl: 'partials/about'
              })
              .otherwise({
                  redirectTo: '/'
              });
          // remove # in the address bar
          // $locationProvider.html5Mode(true).hashPrefix('!');
      }
  ]);
})();


function onGoogleReady() {
  // console.log('google maps ready - loading angular glutApp');
  angular.bootstrap(document.body, ['mapTweetInfoApp']);
}