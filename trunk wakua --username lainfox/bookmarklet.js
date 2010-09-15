javascript: (function () {
    if (document.getElementsByTagName('html').length > 0);
    else {
        return
    }
    if (window.$scrapKua);
    else {
        window.$scrapKua = {};
        window.$scrapKua.path = 'http://localhost/'
    }
    window.$scrapKua.options = {};
    if (window.$scrapKua.callScript) {
        window.$scrapKua.callScript();
        return
    }
    if (document.getElementsByTagName('head').length > 0);
    else {
        document.getElementsByTagName('html')[0].appendChild(document.createElement('head'))
    }
    if (document.getElementsByTagName('body').length > 0);
    else {    
        document.getElementsByTagName('html')[0].appendChild(document.createElement('body'));
    }
    
    var cssNode = document.createElement('link');
    cssNode.type = 'text/css';    
    cssNode.rel = 'stylesheet';
    cssNode.media = 'screen';
    cssNode.href = window.$scrapKua.path + 'scrap/scrapKua.css';    
    document.getElementsByTagName('head')[0].appendChild(cssNode);
    var jsNode = document.createElement('script');
    jsNode.type = 'text/javascript';
    jsNode.charset = 'utf-8';
    jsNode.src = window.$scrapKua.path + 'scrap/scrapKua.js?rand=' + encodeURIComponent(Math.random());
    document.getElementsByTagName('head')[0].appendChild(jsNode)
})()

// javascript:(function(){if(document.getElementsByTagName('html').length>0);else{return}if(window.$scrapKua);else{window.$scrapKua={};window.$scrapKua.path='http://wakua.com/'}window.$scrapKua.options={};if(window.$scrapKua.callScript){window.$scrapKua.callScript();return}if(document.getElementsByTagName('head').length>0);else{document.getElementsByTagName('html')[0].appendChild(document.createElement('head'))}if(document.getElementsByTagName('body').length>0);else{document.getElementsByTagName('html')[0].appendChild(document.createElement('body'))}var cssNode=document.createElement('link');cssNode.type='text/css';cssNode.rel='stylesheet';cssNode.media='screen';cssNode.href=window.$scrapKua.path+'scrap/scrapKua.css';document.getElementsByTagName('head')[0].appendChild(cssNode);var jsNode=document.createElement('script');jsNode.type='text/javascript';jsNode.charset='utf-8';jsNode.src=window.$scrapKua.path+'scrap/scrapKua.js?rand='+encodeURIComponent(Math.random());document.getElementsByTagName('head')[0].appendChild(jsNode)})()