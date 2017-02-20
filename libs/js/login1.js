
var myApp = angular.module('myApp',['commonApp']);
		myApp.controller('mycon',function($scope,$http){
			$scope.sumbit =  function(){
				$http.post('login.php',{phone:$scope.phone,password:$scope.psw}).success(function(response){
					  if(response.state){
					    window.location.href = 'index.html';
					  } else {
					    $.alert(response.message);
					  }
				})
			}
			
})