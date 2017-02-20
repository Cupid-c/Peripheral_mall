
var cloneDom = function cloneDom(opts) {
	//默认配置
	var _default = {
		baseDom: null,
		baseDomOjb: null,
		url: null, // 权重次于 data， 如果 data 为空，url 不为空的情况下，则 ajax 请求 url 解析出 data
		data: [], // 权重最高，如果 data 不为空则直接当数据源使用
		cloneSize: 0,
		page: false, //如果 page = true 的情况，要实现分页
		pageContainer: null
	};
	var $this = this;
	//对象合并，生成一个全新的对象,
	//后面的对象属性替换前面对象已有的属性，如果是新属性，则添加
	//深度克隆	
	$this.newObj = $.extend(_default, opts);

	//确定数据源
	//初始化
	var init = function init(_callback) {
		//如果数据源为空则不执行其它操作
		if (!$this.newObj.data && !$this.newObj.url) {
			return false;
		}
		//如果 baseDom为空 或者 cloneSize 小于 0， 则不执行其它操作
		if (!$this.newObj.baseDom || $this.newObj.cloneSize < 1) {
			return false;
		}
		//如果 data 不为空则把 data 当数据源操作
		if ($this.newObj.data[0]) {
			$this.newObj.data = !$this.newObj.data instanceof Array ? [$this.newObj.data] : $this.newObj.data;
			if (_callback && typeof _callback == 'function') {
				_callback();
			}
		} else if ($this.newObj.url) {
			$.get($this.newObj.url + '?_=' + Math.random(), function (_response) {
				$this.newObj.data = typeof _response == 'string' ? JSON.parse(_response) : _response;
				//solution1
				if (_callback && typeof _callback == 'function') {
					_callback();
				}
			});
		}
		return true;
	};

	//生成 html
	var generateHtml = function generateHtml(_page) {
		_page = _page || 1;
		//计算每页显示的数量
		var _pageSize = $this.newObj.cloneSize;
		//每页显示的数组最小下标
		var _min = (_page - 1) * _pageSize;
		//每页显示的数组最大下标
		var _max = _page * _pageSize - 1;

		if (!$this.newObj.data[0]) {
			return false;
		}
		//body>tr
		if (typeof $this.newObj.baseDom == 'string') {
//			$($this.newObj.baseDom).not(':first-child').remove();
		} else {
			$('>*', $($this.newObj.baseDom).parent()).not($($this.newObj.baseDom)).remove();
		}

		// console.log($($this.newObj.baseDom).not(':first-child'));
		for (var i = _min; i <= _max; i++) {

			if ($this.newObj.data[i]) {
				var _cloneDom = $($this.newObj.baseDom).eq(0).clone().appendTo($($this.newObj.baseDom).parent());
				
				// _cloneDom[0].cartData = $this.newObj.data[i];
				_cloneDom.data('model', $this.newObj.data[i]).data('guid', $this.newObj.data[i].guid || Guid.NewGuid().ToString());
				$.each($('[dk-bind]', _cloneDom), function (_index, _element) {
					//dk-bind='pirce * count'
					if ($(_element).attr('dk-bind').indexOf('*') > -1) {
						//小计
						var _subtotal = 1;
						//['price', 'count']
						$.each($(_element).attr('dk-bind').split('*'), function (_i, _a) {
							//$this.newObj.data[i].price
							//$this.newObj.data[i].count
							_subtotal *= $this.newObj.data[i][$.trim(_a)];
						});
						$(_element).text(_subtotal);
						return true;
					}

					if ($(_element).is('img')) {
//						$(_element).attr('data-original', $this.newObj.data[i][$(_element).attr('dk-bind')]);
						$(_element).attr('src', $this.newObj.data[i][$(_element).attr('dk-bind')]);
					} else {
						$(_element).text($this.newObj.data[i][$(_element).attr('dk-bind')]);
					}
				});
			}
		}
		// $($this.newObj.baseDom) = $('tr', $($this.newObj.baseDom).parent()).eq(1);
		if (typeof $this.newObj.baseDom == 'string') {
			$($this.newObj.baseDom).eq(0).remove();
		} else {
			$this.newObj.baseDom = $($this.newObj.baseDom).next();
			$('tr', $($this.newObj.baseDom).parent()).eq(0).remove();
		}
//		$("img.lazy").lazyload();
	};

	//使用翻页插件（初始化）
	var dkpage = function dkpage(_flag) {
		$($this.newObj.pageContainer).pagination({
			dataSource: $this.newObj.data,
			pageSize: $this.newObj.cloneSize,
			callback: function callback(response, pagination) {
				generateHtml(pagination.pageNumber);
				// window.console && console.log(response, pagination);
			}

		});

		$($this.newObj.pageContainer).addHook('beforePageOnClick', function (_event, _pagenumber) {
			// arguments 是调用函数时的参数集合
			// console.log(arguments);
			// $this.refresh(_pagenumber);
		});
		$($this.newObj.pageContainer).addHook('beforeInit', function (_event, _pagenumber) {
			// arguments 是调用函数时的参数集合
			// console.log(arguments);
			// $this.refresh(123);
		});
	};

	init(function () {
		if ($this.newObj.page) {
			dkpage();
		} else {
			generateHtml();
		}
	});
};


$(function(){
	$('#header .fa-th-list').on('touchstart',function(){
		$('#header ul').toggleClass('show')		
	})
})