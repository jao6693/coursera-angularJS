// IIFE to not bleed anything to the global scope
(function () {
  // define angular module and attach it to an html tag
  angular.module('ShoppingListCheckOff', [])
    // define angular controller and attach it to an html tag inside the ng-app
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    // define service (singleton) to share data among controllers
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  // inject service in both controllers to share data
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  // implement controllers
  function ToBuyController(ShoppingListCheckOffService) {
    console.log("Initializing ToBuy controller...");
    var toBuyList = this;
    // define To Buy items as property in this controller using service
    toBuyList.items = ShoppingListCheckOffService.getToBuyItems();
    // expose buyItem from service to html using the controller
    toBuyList.buyItem = function (itemIndex) {
      console.log("Calling buyItem from the controller...");
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  function AlreadyBoughtController(ShoppingListCheckOffService) {
    console.log("Initializing AlreadyBought controller...");
    var alreadyBoughtList = this;
    // define Already Bought items as property in this controller using service
    alreadyBoughtList.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
  }

  // implement service
  function ShoppingListCheckOffService() {
    console.log("Initializing service...");
    var service = this;

    // initialize 2 different lists of items
    // the first one is not empty
    var toBuyItems = [
      { name: "milk", quantity: 2 },
      { name: "bread", quantity: 5 },
      { name: "meatballs", quantity: 10 },
      { name: "eggplants", quantity: 4 },
      { name: "chilies", quantity: 20 }
    ];
    // the second one is empty
    var alreadyBoughtItems = [];

    // handler for button 'Bought'
    service.buyItem = function (itemIndex) {
      console.log("Calling buyItem from the service...");
      // add item to already bought items
      alreadyBoughtItems.push(toBuyItems[itemIndex]);
      // remove item from to buy items
      item = toBuyItems.splice(itemIndex, 1);
    };

    // list items to buy
    service.getToBuyItems = function () {
      console.log("Calling getToBuyItems...");
      return toBuyItems;
    };

    // list items already bought
    service.getAlreadyBoughtItems = function() {
      console.log("Calling getAlreadyBoughtItems...");
      return alreadyBoughtItems;
    };
  }

})();