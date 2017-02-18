(function () {
  "use strict";

  angular.module('public')
    .controller('InfoController', InfoController);

  InfoController.$inject = ['$state', 'DataService'];
  function InfoController($state, DataService) {
    var infoCtrl = this;
    // get registration information
    infoCtrl.info = DataService.retrieveInformation();
    // determine the view to display
    if (infoCtrl.info.saved === true) {
      $state.transitionTo('public.info.success');
    } else {
      $state.transitionTo('public.info.error');
    };
  }

})();