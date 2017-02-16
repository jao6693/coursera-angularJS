(function () {
  "use strict";

  angular.module('common')
    .service('SignupService', SignupService);

  SignupService.$inject = ['$http', 'ApiPath'];
  function SignupService($http, ApiPath) {
    var service = this;

    service.validateShortName = function (shortName) {
      return $http
        // .get(APIBasePath + '/menu_items/' + shortName + '.json')
        .get(ApiPath + '/categories/' + shortName + '.json')
        .then(function(response) {
          return true;
        }, function (response) {
          return false;
        });
    };
  }

})();
