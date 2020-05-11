(function(){
  angular.module("NarrowItDownApp",[])
  .controller("NarrowItDownController",NarrowItDownController)
  .service("MenuSearchService",MenuSearchService)
  .directive('foundItems',FoundItems);

  function FoundItems(){
    var ddo={
      templateUrl:'foundItems.html',
      scope:{
        items:"<",
        onRemove:"&"
      }

    };
    return ddo;
  }
  NarrowItDownController.$inject=['MenuSearchService','$q'];
  function NarrowItDownController(MenuSearchService,$q){
    var ctrl=this;
    ctrl.search="";
    ctrl.found=[];
    ctrl.findMatch=function(){
    //  console.log("search",ctrl.search.indexOf());
      ctrl.error="";
      if(ctrl.search==="")
      {
        //console.log("Search empty");
        ctrl.error="Nothing found!";
        ctrl.found=[];
        return;
      }

      var promise=MenuSearchService.getMatchedMenuItems(ctrl.search);
      promise.then(function(response){
        ctrl.found=response;
        if(ctrl.found.length===0)
        {
          ctrl.error="Nothing found!";
        }
      },
      function(error){
        console.log(error);
      }
    );

  }

    ctrl.removeItem=function(index){
      ctrl.found.splice(index,1);
    }

  }
  MenuSearchService.$inject=['$http'];
  function MenuSearchService($http){
    var service=this;
    service.getMatchedMenuItems=function(searchTerm){
      searchTerm=searchTerm.trim().toLowerCase();
      var foundItems=[];
      var result=$http({
        method:"GET",
        url:"https://davids-restaurant.herokuapp.com/menu_items.json"
      });
    return result.then(function(response){
      for(var i=0;i<response.data['menu_items'].length;i++)
      {
        var desc=response.data['menu_items'][i]['description'];
        if(desc.toLowerCase().indexOf(searchTerm)!==-1)
        {
          var item={
            name:response.data['menu_items'][i]['name'],
            short_name:response.data['menu_items'][i]['short_name'],
            description:response.data['menu_items'][i]['description']

          }
          foundItems.push(item);
        }
        }
      //  console.log("found items",foundItems);
    return foundItems;
          },
      function(error){
        console.log(error);
      }
    );
    }

    }
})();