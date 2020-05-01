(function(){
  'use strict';

  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var showlist = this;
    showlist.to_buy = ShoppingListCheckOffService.getItems();
    showlist.removeItem = function (itemIndex) {
      try{
      ShoppingListCheckOffService.removeItem(itemIndex);
    }catch (error){
      showlist.errorMessage = error.message;
    }

      };
  }

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService','$scope'];
function AlreadyBoughtController(ShoppingListCheckOffService,$scope) {
  var showlist = this;
  $scope.IsVisible = false;
  showlist.bought = ShoppingListCheckOffService.getItems1();
}


  function ShoppingListCheckOffService() {
    var service = this;

    var to_buy = [{ name: "cookies", quantity: 10 },{ name: "chips", quantity: 2 },{ name: "cold-drinks", quantity: 5 },{ name: "milk", quantity: 4 },{ name: "banana", quantity: 12 }];
    var bought= [];

    service.getItems = function () {
      return to_buy;
    };

    service.getItems1 = function () {

      return bought;
    };

    service.removeItem = function (itemIndex) {
      if (to_buy.length !=1){
        bought.push(to_buy[itemIndex]);
        to_buy.splice(itemIndex,1);
      }
      else{
        bought.push(to_buy[itemIndex]);
        to_buy.splice(itemIndex,1);
        throw new Error("Everything is bought!");
      }
    };

  }
})();