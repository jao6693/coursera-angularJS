(function () {
  "use strict";

  angular.module('public')
    .controller('SignupController', SignupController);

  SignupController.$inject = ['SignupService'];
  function SignupController(SignupService) {
    var signupCtrl = this;

    signupCtrl.itemExist = true;

    signupCtrl.submit = function (shortName) {
      var validated = SignupService.validateShortName(shortName);
      validated.then(function(response) {
        if (response === true) {
          signupCtrl.itemExist = true;
        } else {
          signupCtrl.itemExist = false;
        };
      });
    };
  }

})();