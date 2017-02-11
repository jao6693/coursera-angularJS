(function() {
  'use strict';

  angular.module('data')
    .service('MenuDataService', MenuDataService)
    .constant('APIBasePath', "//davids-restaurant.herokuapp.com");

  MenuDataService.$inject = ['$http', 'APIBasePath'];

  function MenuDataService($http, APIBasePath) {
    var service = this;

    service.getAllCategories = function() {
      console.log('Get all categories');

      var categories = [];

      return $http({
        method: "GET",
        url: (APIBasePath + "/categories.json")
        }).then(
          function(response) {
            console.log(response.data);
            return response.data;
          }
      );
    };

    service.getItemsForCategory = function(shortName) {
      console.log('Get all items for short name');
      console.log(shortName);
      var items = [];

      return $http({
        method: "GET",
        url: (APIBasePath + "/menu_items.json?"),
        params: {category: shortName}
        }).then(
          function(response) {
            console.log(response.data);
            return response.data.menu_items;
          }
      );
    };

  }

})();