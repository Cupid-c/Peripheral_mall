$(function () {
//	var _obj = {
//		baseDom: '#scroller ul .det-pro',
//		cloneSize: 20,
//		url: 'libs/data/product.json'
//	};
//	var products1 = new cloneDom(_obj);
	
	 
	 var swiper = new Swiper('.swiper-container', {
		        pagination: '.swiper-pagination',
		        paginationClickable: true,
		        autoplay: 2000,
		        autoplayDisableOnInteraction : false,
		        loop : true,
    	}); 
    	
	 var swiper2 = new Swiper('.swiper-container2', {
        slidesPerView: 2,
        paginationClickable: true,
        spaceBetween: 30
    });
});
var myScroll;

	

function loaded () {
	setTimeout(function(){
		myScroll = new IScroll('#wrapper', { mouseWheel: true,useTransition: true,click:true,scrollbars:true});
		myScroll.on('scrollEnd', function(){
			if (myScroll.y<-260) {
				$("#top").fadeIn(100)
			}else{
				$("#top").fadeOut(100)
			}
			$("#top").on('touchstart',function(){
				myScroll.scrollTo(0, 0, 500)
			})
		});
	},200)
	
}
window.addEventListener('load',loaded,false)		
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

