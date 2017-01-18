// IIFE to not bleed anything to the global scope
(function () {
  // define angular module and attach it to an html tag
  angular.module('my-app', [])
    // define angular controller and attach it to an html tag inside the ng-app
    .controller('controller-1', function() {
      // logic goes here
    });
})();