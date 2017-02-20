//var common = common || {};
//common.baseUrl ="libs/php/";
//$(function(){
//	new Vue({
//		  el: '#lis',
//		  data: {
//		    data: '',
//		    togel:1,
//		    num:''
//		  },
//		  ready:function(){
//		  	var self = this;
//		  	$.get(common.baseUrl + "set_order.php",function(response){
//				response = JSON.parse(response);
//				self.data = response;
//				self.num = self.data.length;
//				for(var a in response){
//					self.togel += response[a]['num'] *response[a]['price'];
//					self.togel  *=1;
//				}
//			})
//		  }
//})
//})

var myApp = angular.module('myApp',['commonApp']);
myApp.config(function($controllerProvider){
	myApp.register = {
		controller: $controllerProvider.register
	}
})
myApp.controller('mycon',function($scope,$http,$compile){
	$scope.togel=0;
	$http.get('set_pro.php').success(function(response){
		$scope.data = response;
		$scope.num = $scope.data.length;
		for(var a in response){
			$scope.togel += response[a]['num'] *response[a]['price'];
		}
	})
	$scope.address = function(){	
		$http.get('order_address.html').success(function(response){
			$compile($('#address').html(response))($scope);
			$('#address').fadeIn(100);
			$('#address').on('touchend',function(e){	
					if ($(e.target).is('.list-group-item ,.list-group-item  *')) {
						$('.address .nam').html($(e.target).closest('a').find('h5').html()) 
						$('.address .pho').html($(e.target).closest('a').find('span').html()) 
						$('.address .addr').html($(e.target).closest('a').find('p').html()) 
						$('.address').show();
						$(this).fadeOut(100);
					}else if($(e.target).is('i')){
						$http.get('address.html').success(function(response){
							$compile($('#address').html(response))($scope);
						})
					}else if($(e.target).is('div#address')){
						$(this).fadeOut(100);
					}

			})
		})
	}
	$scope.submit = function(){
		if($('.address .nam').html()){
			var consignee  =$('.address .nam').html();
			var consignee_p = $('.address .pho').html();
			var address = $('.address .addr').html();
			$http.post('set_order.php',{consignee:consignee,consignee_p:consignee_p,address:address,togel:$scope.togel,num:$scope.num}).success(function(response){
				if (response.state) {
					window.location.href ="order_list.html";
				} else{
					$.alert("提交错误");
				}
			})
		}else{
			$.alert("请选择收货信息");
		}
		
	}
	
})

var myScroll;
function loaded() {
    setTimeout(function () {
        myScroll = new IScroll('#wrapper', { mouseWheel: true,click:true});
    }, 200);
}
window.addEventListener('load', loaded, false);
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);


