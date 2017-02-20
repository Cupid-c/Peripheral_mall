var myApp = angular.module('myApp',['commonApp']);
myApp.controller('mycon',function($scope,$http){
			$http.get('login_info.php').success(function(data){
				  if (data.state) {
				  	$scope.account = data.account;
					$('#menber').html('普通会员');
					$scope.img = data.img;
					$('.datum>.out').on('touchend',function(){
						$http.get('out.php').success(function(){
					  	window.location.href = "login.html";
						})
					})
					$('#changedatu').on('touchend',function(){	
					  	window.location.href = "datum.html";
					})
					$('#orderL').on('touchend',function(){	
					  	window.location.href = "order_list.html";
					})
				} else{
					$('#name').html('<a href="login.html">请登陆</a>');
					$('li>a').on('touchend',function(){
						window.location.href = "login.html";
					})
				}
			})	
})
