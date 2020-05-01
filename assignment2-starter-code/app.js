(function () {
'use strict';

angular.module('LunchCheckApp', [])
.controller('LunchCheckController', LunchCheckController);
function LunchCheckController($scope) {
  $scope.lunchItems = "";
  $scope.message = "";
  $scope.len = 0;
  
  $scope.check = function(){
    $scope.items = $scope.lunchItems.split(',');
		$scope.lunchItems = $scope.items;
    $scope.len =$scope.lunchItems.length;

    if($scope.len==1 && $scope.lunchItems==""){
      $scope.message = "Please enter data first";
    } 
    else if ($scope.len>0 && $scope.len<=3){
      $scope.message = "Enjoy!";
    }
    else{
      $scope.message = "Too Much!";
    }
	}
}


})();