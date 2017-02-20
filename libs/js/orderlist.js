var mainapp = angular.module('mainapp', ['commonApp']);

mainapp.controller('maincontroller', function ($scope, $http) {
   $http.get('orderlist.php').success(function(datalist){
   		$scope.datalist = datalist;
   		console.log($scope.datalist)
   })
});
$(function(){
	$(document).on('touchend',function(e){
		if ($(e.target).is('.shopname i')) {
			$(e.target).toggleClass("fa-dot-circle-o")
		}
		if ($(e.target).is('.item-control a:nth-child(2)')) {
			var order_id =  $(e.target).attr('ngid');
			$.get(common.baseUrl+'dele_order.php',{id:order_id},function(d){
					d = JSON.parse(d);
					if (d.state) {
						 $(e.target).closest('li').remove();
					} else{
						alert(d.message);
					}
    		});
		}
	})
})
var myScroll;
function loaded() {
    setTimeout(function () {
        myScroll = new IScroll('#wrapper', { mouseWheel: true,click:true});
    }, 300);
}
window.addEventListener('load', loaded, false);
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);