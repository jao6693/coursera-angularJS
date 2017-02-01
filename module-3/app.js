// IIFE to not bleed anything to the global scope
(function () {
  'use strict';

  // define angular module and attach it to an html tag
  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('APIBasePath', "http://davids-restaurant.herokuapp.com");

  NarrowItDownController.$inject = ['MenuSearchService'];
  // implement controller
  function NarrowItDownController(MenuSearchService) {
    console.log("Initializing NarrowItDown controller...");
    var menuChoice = this;
    // declare found as an array attached to the controller instance
    menuChoice.found = [];
    // declare the search term
    menuChoice.searchTerm = "";
    // declare and expose to the view a function to handle the call to the restaurant server
    menuChoice.getMatchedMenuItems = function(searchTerm) {
      console.log("Calling getMatchedMenuItems function from controller...");
      // get the menu items from the server and pass the search term to narrow the list
      // it returns a promise
      MenuSearchService.getMenuItems(searchTerm)
        .then(function (response) {
          console.log("Filtered data returned by the promise...");
          console.log(response);
          menuChoice.found = response;
        })
        .catch(function (error) {
          console.log("Error calling the restaurant server");
        });
    };
  }

  MenuSearchService.$inject = ['$http', 'APIBasePath'];
  // implement service
  function MenuSearchService($http, APIBasePath) {
    console.log("Initializing MenuSearch service...");
    var service = this;

    service.getMenuItems = function(searchTerm) {
      console.log("Calling getMenuItems function from service...");
      return $http({
        // no parameter is passed as the narrowItDown logic is not performed on server side
        method: "GET",
        url: (APIBasePath + "/menu_items.json"),
        })
        .then(function (result) {
          console.log("Unfiltered data returned by the server...");
          console.log(result);
          // process result and only keep items that match
          var foundItems = result.data.menu_items.filter(filterBySearchTerm);
          // return processed items
          console.log("The search term passed is...");
          console.log(searchTerm);
          return foundItems;
        }
      );

      // define a filter to apply to the array of returned values
      function filterBySearchTerm(item) {
        var found = false;
        // lowercase everything before comparison to ignore case
        var _searchTerm = searchTerm.toLowerCase();
        var _description = item.description.toLowerCase();
        if (_description.search(_searchTerm) != -1) {
          found = true;
        }
        return found;
      }
    }
  }

}) ();