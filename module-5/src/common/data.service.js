(function () {
  "use strict";

  angular.module('common')
    .service('DataService', DataService);

  DataService.$inject = ['$http', 'ApiPath'];
  function DataService($http, ApiPath) {
    var service = this;

    service.info = {};

    service.validateShortName = function (shortName) {
      return $http
        .get(ApiPath + '/menu_items/' + shortName + '.json')
        .then(function(response) {
          return response;
        }, function (response) {
          return false;
        });
    };

    service.saveInformation = function (information) {
      service.info = information;
      service.info.saved = true;
    };

    service.retrieveInformation = function () {
      return service.info;
    };
  }

})();
