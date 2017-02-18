(function () {
  "use strict";

  angular.module('public')
    .controller('SignupController', SignupController);

  SignupController.$inject = ['DataService'];
  function SignupController(DataService) {
    var signupCtrl = this;

    signupCtrl.completed = true;
    signupCtrl.ismessage = false;
    signupCtrl.info = DataService.retrieveInformation();

    signupCtrl.submit = function (info) {
  
      var promise = DataService.validateShortName(info.favourite);

      promise.then(function(response) {
        // message not empty then display it
        signupCtrl.ismessage = true;
        // send response accordingly
        if (response !== false) {
          signupCtrl.completed = true;
          signupCtrl.message = "Your information has been saved";
          signupCtrl.info.data = response.data;
          // save registration information
          DataService.saveInformation(info);
        } else {
          signupCtrl.completed = false;
          signupCtrl.message = "No such menu number exists";
        };
      });
    };
  }

})();