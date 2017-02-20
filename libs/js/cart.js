var myApp = angular.module('myApp',['commonApp']);
myApp.controller('mycon',function($scope,$http){
					$http.get('login_info.php').success(function(response){
						  if(response.state){
								$http.get('cart.php').success(function(data){
									$scope.data = data;
									if($scope.data.length==0){
										$.alert({
											title:"",
										    content: '购物车什么都没有！快去买点东西吧',
										    
										});
									}
								})
						  } else {
						   window.location.href = 'login.html';
						  }
					})				
})
var toPri = 0;
$(document).on('touchstart',function(evt){
    	function togal(){
    		toPri=0;
    		$('li .fa-check-square').each(function(index,obj){
    			
    			var pri =parseInt( $(obj).closest('li').find('.item-content .pri em ').html())
    			var num =parseInt( $(obj).closest('li').find('.item-calc .num ').html())
    			toPri += pri*num;
    		})   		
    		$('#bottom .pay').html('确认并支付('+toPri+')')	
    	}
    	function set_change(){
    		$.get(common.baseUrl+'TRASH.php',{id:$(evt.target).closest('li').attr('ngID'),num:$(evt.target).closest('li').find($('.item-calc .num')).html()});
    	}
    	
    	if($(evt.target).is('.item-option>i') ){
    		$(evt.target).toggleClass('fa-check-square')
    		togal()
    	}
    	if ($(evt.target).is('.item-calc .minu i') || $(evt.target).is('.item-calc .minu ')){
    		var num = $(evt.target).closest('li').find($('.item-calc .num')).html()
    		num--;
    		if (num<1) {
    			num=1;
    		}
    		$(evt.target).closest('li').find($('.item-calc .num')).html(num)
    		togal()
    		set_change()
    	}
    	if ($(evt.target).is('.item-calc .plus i') ||$(evt.target).is('.item-calc .plus') ) {
    		var num = $(evt.target).closest('li').find($('.item-calc .num')).html()
    		num++;
    		$(evt.target).closest('li').find($('.item-calc .num')).html(num)
    		togal()
    		set_change()
    	}
    	if ($(evt.target).is('.item-content .fa-trash-o')) {
    		$.get(common.baseUrl+'TRASH.php',{id:$(evt.target).closest('li').attr('ngID')});
    		$(evt.target).closest('li').remove()
    		togal()
    	}
    	if ($(evt.target).is('#bottom .change i')) {
    		if ($(evt.target).hasClass('fa-check-square')) {
    			$('.fa-square-o').removeClass('fa-check-square')
    		}else{
    			$('.fa-square-o').addClass('fa-check-square')
    		}
    		togal()
    	}
    	if($(evt.target).is('#bottom .pay')){
    		
    		if(toPri==0){
    			$.alert("请选择一件商品")
    		}else{
    			var pro_obj={};
    			$('li .fa-check-square').each(function(index,obj){
    				pro_obj[$(obj).closest('li').attr('ngID')]=$(obj).closest('li').find($('.item-calc .num')).html();
    			})
    			$.get(common.baseUrl+'put_pro.php',{pro:pro_obj},function(){
					window.location.href ="order.html";
    			});
    			
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

