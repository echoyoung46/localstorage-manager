var localMap = {
	'local_zepto_js': '//ossweb-img.qq.com/images/js/zepto/zepto.min.js?v=pvpm-201801051648',
	'local_tgadshow_js': '//ossweb-img.qq.com/images/clientpop/js/tgadshow.min.js?v=pvpm-201801051648'
};

var init = function () {
	initScript();
};

var Script = function (_key, _url) {
	getUrlContent();

	function getUrlContent() {
		var request = new XMLHttpRequest();
		request.open('GET', _url);
		request.responseType = 'text';

		request.onload = function () {
			pushUrlContent(request.response);
		};

		request.send();
	}

	function pushUrlContent(_res) {
		var dom = document.createElement('script');
		dom.innerHTML = _res;
		document.body.appendChild(dom);
		console.log(_key);
		localStorage.setItem(_key, _res);
	}
};

var initScript = function () {
	var $scripts = document.querySelectorAll('localscript');
	$scripts.forEach(function (i) {
		var url = localMap[i.dataset.local];
		var localName = i.dataset.local + '@' + getFileVersion( url );
		
		if( localStorage.getItem(localName) == null ) {
			var script = new Script(localName, url);
		}else {
			var dom = document.createElement('script');
			dom.innerHTML = localStorage.getItem(localName);
			document.body.appendChild( dom );
		}
	})
}

var getFileVersion = function (_url) {
	return /(v=)(.*)/.exec(_url)[2];
}

init();