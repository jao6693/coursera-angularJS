(function() {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);
  
  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {
    // redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // UI states for the app
    $stateProvider
      .state('home', {
        // home page
        url: '/',
        templateUrl: 'src/menuapp/templates/home.template.html'
      })
      .state('categories', {
        // home page with categories
        url: '/categories',
        templateUrl: 'src/menuapp/templates/categories.template.html',
        controller: 'CategoriesController as list',
        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })
      .state('categories.items', {
        // home page with categories + items
        url: '/{categoryShortname}/items',
        templateUrl: 'src/menuapp/templates/items.template.html',
        controller: 'ItemsController as list',
        params: {
          categoryShortname: null
        },
        resolve: {
          items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
            // return MenuDataService.getItemsForCategory(categoryShortName);
              return MenuDataService.getItemsForCategory($stateParams.categoryShortname);
          }]
        }
      })
  }

})();