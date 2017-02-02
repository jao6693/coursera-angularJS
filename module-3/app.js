// IIFE to not bleed anything to the global scope
(function () {
  'use strict';

  // define angular module and attach it to an html tag
  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItems)
    .constant('APIBasePath', "//davids-restaurant.herokuapp.com");

  NarrowItDownController.$inject = ['MenuSearchService'];
  // implement controller
  function NarrowItDownController(MenuSearchService) {
    console.log("Initializing NarrowItDown controller...");
    var menuChoice = this;
    // initialize found as an array attached to the controller instance
    menuChoice.found = [];
    // initialize the search term
    menuChoice.searchTerm = "";
    // initialize the nothing found indicator
    menuChoice.nothing = false;
    // declare and expose a function to handle the call to the restaurant server
    menuChoice.getMatchedMenuItems = function(searchTerm) {
      console.log("Calling getMatchedMenuItems function from controller...");
      // if search term is empty then just return the nothing found message
      if ( searchTerm == "" ) {
        console.log("No item matching the search term found...");
        menuChoice.nothing = true;
      } else {
        // get the menu items from the server and pass the search term to narrow the list
        // it returns a promise
        MenuSearchService.getMenuItems(searchTerm)
          .then(function (response) {
            console.log("Number of filtered data returned by the promise...");
            console.log(response.length);
            menuChoice.found = response;
            // if nothing found then return the nothing found message
            if (menuChoice.found.length == 0 ) {
              console.log("No item matching the search term found...");
              menuChoice.nothing = true;
            } else {
              menuChoice.nothing = false;
            }
          })
          .catch(function (error) {
            console.log("Error calling the server");
          });
      };
    };

    // declare and expose a function to handle the item removal from the list
    menuChoice.removeItem = function(itemIndex) {
      console.log("Removing Item " + itemIndex);
      menuChoice.found.splice(itemIndex, 1);
    };
  }

  function FoundItemsDirectiveController() {
    var menuItems = this;

  }

  MenuSearchService.$inject = ['$http', 'APIBasePath'];
  // implement service
  function MenuSearchService($http, APIBasePath) {
    console.log("Initializing MenuSearch service...");
    var service = this;

    service.getMenuItems = function(searchTerm) {
      console.log("Calling getMenuItems function from service...");

      var response = []

      return $http({
        // no parameter is passed as the narrowItDown logic is not performed on server side
        method: "GET",
        url: (APIBasePath + "/menu_items.json"),
        })
        .then(function (result) {
          console.log("Unfiltered data returned by the server...");
          console.log(result);
          if ( searchTerm == "" ) {
            console.log("The search term is empty...");
            // empty search term isn't processed
            response = [];
          } else {
            // process result and only keep items that match
            response = result.data.menu_items.filter(filterBySearchTerm);
            // return processed items
            console.log("The search term passed is...");
            console.log(searchTerm);

          }
          // return result to the caller
          return response;
        }
      );

      // define a filter to apply to the array of returned values
      function filterBySearchTerm(item) {

        // lowercase everything before comparison to ignore case
        return item.description.toLowerCase().search(searchTerm.toLowerCase()) + 1;
      };
    };

  }

  // implement custom directive
  function FoundItems() {
    // define and return the DDO 
    return {
      restrict: 'E',
      templateUrl: 'foundItems.html',
      scope: {
        foundItems: '<',
        nothingFound: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'menuItems',
      bindToController: true
    };
  }

}) ();