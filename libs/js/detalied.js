var cf = angular.module('detaApp',['commonApp']);
		cf.controller('cfcontrnller',['$scope','$http',function($scope,$http){
			$http.get('DETALIED.php').success(function(response){
				$scope.name = response[0].proName;
				$scope.pri = response[0].price;
			})
			$('#bottom>a').on('touchend',function(){
		    	$http.get('login_info.php').success(function(response){
		    		
				  if(response.state){
						$http.get('buy.php').success(function(){
							window.location.href = 'cart.html';
						})
				  } else {
				   window.location.href = 'login.html';
				  }

		    	})
		    })
}])
$(function(){

	
	var _obj = {
		baseDom: '#scroller .dis>li',
		cloneSize: 20,
		url: 'libs/data/product.json'
	};
	var dis = new cloneDom(_obj);
	
	
	$('#header>div').on('touchend',function(){
		
		$('#header>div').toggleClass("active")
		if ($(this).html()==$('#header div.detaled').html()) {
			$('#scroller ul.det').slideDown()
			$('#scroller ul.dis').slideUp()
		} else{
			$('#scroller ul.det').slideUp()
			$('#scroller ul.dis').slideDown()
			
		}
		loaded () 
	})
	

	 var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true
        },
		autoplay: 2000,
		autoplayDisableOnInteraction : false,
		loop : true,
    }); 
    
    	
    
    
})

var myScroll;
function loaded() {
    setTimeout(function () {
        myScroll = new IScroll('#wrapper', { mouseWheel: true,click:true});
    }, 400);
}
window.addEventListener('load', loaded, false);
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);