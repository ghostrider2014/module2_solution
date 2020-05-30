(function (){
  'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var toBuyItemsList = this;

  toBuyItemsList.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

  toBuyItemsList.buyItem = function(itemIndex,item_quantity,item_name){
    try {
      ShoppingListCheckOffService.addItem(item_name,item_quantity);
      ShoppingListCheckOffService.removeItem(itemIndex);
    } catch (error) {
      toBuyItemsList.emptyMessage = error.message;
    }
  }

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var addBoughtItem = this;
  addBoughtItem.alreadyBuyItems = ShoppingListCheckOffService.getAlreadyBuyItems();

}

function ShoppingListCheckOffService(){
  var service = this;
  var toBuyItems = [];
  var alreadyBuyItems = [];
  var items = [
    {name: "Cookies", quantity: 10},
    {name: "Chips", quantity: 4},
    {name: "Pepto Bismol", quantity: 5},
    {name: "Sugary Drinks", quantity: 15},
    {name: "Ketchup Bottles", quantity: 2},
    {name: "Vegetables", quantity: 7},
    {name: "Milk Cartons", quantity: 10}
  ];
  toBuyItems = items;

  service.addItem = function(itemName, itemQuantity){

    var item = {
      name: itemName,
      quantity: itemQuantity
    };
    alreadyBuyItems.push(item);

  };


  service.removeItem = function(itemIndex){

    toBuyItems.splice(itemIndex, 1);
    if(toBuyItems.length == 0){
      throw new Error("Everything is bought!");
    }


  };

  service.getToBuyItems = function(){
    return toBuyItems;
  }

  service.getAlreadyBuyItems = function(){
    return alreadyBuyItems;
  }

}
})();
