// start with an IIFE
(function(){
  'use strict';

  // declare constants
  let comma = ',';

  // declare the angular module
  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckCtrl);

  // inject the dependencies
  LunchCheckCtrl.$inject = ['$scope'];

  // declare the functions
  function LunchCheckCtrl($scope) {
    // declare variables
    var aLunchItems = [];

    // initialize scope variables
    $scope.textbox = "";
    $scope.message = "";
    $scope.border = "";
    $scope.font = "";

    // declare handlers
    $scope.CheckIfTooMuch = function() {
      var lunchItems = $scope.textbox;

      if (lunchItems.length == 0) {
        // output message according to the number of items found
        $scope.message = "Please enter data first";
        // bonus optional: change the textbox border to red
        $scope.border = "has-error";
        // bonus optional: change the font color to red
        $scope.font = "text-danger";
      } else {
        aLunchItems = lunchItems
                        // split items using , as separator
                        .split(comma)
                        // bonus optional: remove empty items
                        .filter(function(item) {return item.trim().length > 0});
        // output message according to the number of items found
        if (aLunchItems.length <= 3) {
          $scope.message = "Enjoy!";
        } else if (aLunchItems.length > 3) {
          $scope.message = "Too much!";
        };
        // bonus optional: change the textbox border to green
        $scope.border = "has-success";
        // bonus optional: change the font color to green
        $scope.font = "text-success";
      };
    };
  };

})();