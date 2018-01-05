window.onload = function() {
    initScript();
    console.log(123);
    console.log(Zepto);
}

var initScript = function() {
    var $scripts = document.querySelectorAll('localscript');
    console.log($scripts);
    $scripts.forEach(function(i) {
        console.log(i.outerHTML);
        console.log(i.dataset.local);
    })
}