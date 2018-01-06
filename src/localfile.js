var localMap = {
	'local_zepto_js': '//ossweb-img.qq.com/images/js/zepto/zepto.min.js?v=pvpm-201801051648',
	'local_tgadshow_js': '//ossweb-img.qq.com/images/clientpop/js/tgadshow.min.js?v=pvpm-201801051648',
	'local_base_css': '//game.gtimg.cn/images/yxzj/m/m201706/css/base.css?v=pvpm-201801051808',
	'local_resetcp_css': '//game.gtimg.cn/images/yxzj/m/m201706/css/reset-cp.css?v=pvpm-201801051808',
	'local_strategycenter_css': '//game.gtimg.cn/images/yxzj/m/m201706/css/strategycenter.css?v=pvpm-201801051808'
};

var init = function () {
	console.log(1111);
	initMap();
};

var initMap = function() {
	var $sources = document.querySelectorAll('localsource');
	$sources.forEach(function (i) {
		var url = localMap[i.dataset.local];
		getFileType(i.dataset.local, url);
	})
};

var getFileType = function(_key, _url) {
	var fileName = /(.*)(\/)(.*)(\?v=)(.*)/.exec(_url)[3];
	var fileType = /(.*)(\.)(.*)/.exec(fileName)[3];
	
	if (fileType == 'css') {
		initCss(_key, _url);
	}else {
		initScript(_key, _url);
	}
};

var Script = function (_key, _url) {
	getScriptContent();

	function getScriptContent() {
		var request = new XMLHttpRequest();
		request.open('GET', _url);
		request.responseType = 'text';

		request.onload = function () {
			pushScriptContent(_key, request.response);
		};

		request.send();
	}

	function pushScriptContent(_key, _res) {
		console.log('push js');
		var dom = document.createElement('script');
		dom.innerHTML = _res;
		var $currSrc = document.querySelector('localsource[data-local="' + _key + '"]');
		document.body.insertBefore(dom, $currSrc);
		$currSrc.parentNode.removeChild( $currSrc );
		localStorage.setItem(_key, _res);
	}
};

var CSS = function (_key, _url) {
	getCssContent();

	function getCssContent() {
		var request = new XMLHttpRequest();
		request.open('GET', _url);
		request.responseType = 'text';

		request.onload = function () {
			pushCssContent(request.response);
		};

		request.send();
	}

	function pushCssContent(_res) {
		var dom = document.createElement('style');
		dom.innerHTML = _res;
		var $currSrc = document.querySelector('localsource[data-local="' + _key + '"]');
		$currSrc.parentNode.removeChild( $currSrc );
		document.head.appendChild( dom );
		localStorage.setItem(_key, _res);
	}
};

var initCss = function (_key, _url) {
	var localName = _key + '@' + getFileVersion( _url );
	
	if( localStorage.getItem(localName) == null ) {
		var script = new CSS(_key, _url);
	}else {
		var dom = document.createElement('style');
		dom.innerHTML = localStorage.getItem(localName);
		var $currSrc = document.querySelector('localsource[data-local="' + _key + '"]');
		$currSrc.parentNode.removeChild( $currSrc );
		document.head.appendChild( dom );
	}
}

var initScript = function (_key, _url) {
	var localName = _key + '@' + getFileVersion( _url );
	
	if( localStorage.getItem(localName) == null ) {
		var script = new Script(_key, _url);
	}else {
		var dom = document.createElement('script');
		dom.innerHTML = localStorage.getItem(localName);
		var $currSrc = document.querySelector('localsource[data-local="' + _key + '"]');
		document.body.insertBefore(dom, $currSrc);
		$currSrc.parentNode.removeChild( $currSrc );
	}
}

var getFileVersion = function (_url) {
	return /(v=)(.*)/.exec(_url)[2];
}

init();