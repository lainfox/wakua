(function(){
    String.prototype.escapeHTML = function () {                                        
        return(                                                                 
            this.replace(/&/g,'&amp;').                                         
                replace(/>/g,'&gt;').                                           
                replace(/</g,'&lt;').                                           
                replace(/"/g,'&quot;')                                         
        );                                                                      
    };
    /*
    function checkKey(){
        if(window.event.keyCode == 27){
            disableScrap(self);            
            return false;
        }
    }
    //*/
    Array.prototype.max = function() {
        return Math.max.apply(null, this);
    };
    String.prototype.trim = function() {
        return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        //return this.replace(/^\s+|\s+$/g,"");
    };
    
    if (typeof jQuery == 'undefined') {    
    	loadJquery();    
    } else {
        jQVersion = jQuery.fn.jquery;
        versionArray = jQVersion.split('.');
        if(versionArray[1] < 4) loadJquery();
        else {loadAjaxPlugin();initWakua();}       
    }
    
    function loadJquery() {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";    
        script.onload = script.onreadystatechange = function(){
            if(!this.readyState || this.readyState=='loaded' || this.readyState=='complete'){
                loadAjaxPlugin();
                jQuery.noConflict();
                initWakua();             
            }
        };    
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    
    function loadAjaxPlugin() {
        var scriptPlugin = document.createElement('script');
        scriptPlugin.type = "text/javascript";
        scriptPlugin.src = "http://github.com/jamespadolsey/jQuery-Plugins/raw/master/cross-domain-ajax/jquery.xdomainajax.js";
        document.getElementsByTagName("head")[0].appendChild(scriptPlugin);
    }
    
    
    
function initWakua() {
    (function($) { 
        $(function() { // more code using $ as alias to jQuery
            
            // wakua Frame show & hide
            var showFrame = function(){
                $('#wakuaFrame').css({'right':'-30px', 'opacity':'0.1', 'display':''}).animate({
                    opacity: 1,
                    right: '+=50px'                
                    }, 500
                );
            } 
            var hideFrame = function() {
                $('#wakuaFrame').animate({
                    opacity: 0.1,
                    right: '-=50px'                
                    }, 500, function() {
                        $(this).remove();                    
                });
            }
            
            // click content - scrap it!
            var doScrap = function($obj) {
                $scrapContent = $obj.clone();
                
                if($scrapContent.find('iframe').is(':visible').length > 0) {// find iframe and replace contents of iframe with tag, daum blog cyclub ,etc                    
                    $scrapContent.find('iframe').is(':visible').each(function(){
                        if( $(this).get(0).id == '' || $(this).get(0).id == null || $(this).get(0).src == null || $(this).get(0).src  == '' || $(this).get(0).src  == 'about:blank'  ) {}
                        else {                            
                            var $f = $("#" + $(this).get(0).id, $scrapContent.document);                                                      
                            var fd = $f[0].document || $f[0].contentWindow.document; // document of iframe                            
                            $(this).replaceWith($(fd).find('html body').clone());
                        }
                    });                    
                } 
                // console.log('scrapContent size : ' + $scrapContent.find('iframe').length + '     original size : ' + $obj.find('iframe').length);
                
                $scrapContent.find('script').remove();
                
                ($.browser.msie )? $width = '250%' : $width = '100%';    // IE = 250% zoom = 0.4
                                
                $scrapContent.removeClass().removeAttr('style').removeAttr('id').css('width', $width)
                    .children().removeClass().removeAttr('style').removeAttr('id').parent()
                    .hide().fadeIn(1000)
                    .prependTo("#resultFrame").wrap("<div style='display:block;clear:both; border-bottom:10px dashed #CCC; padding:5px 5px 10px 5px; margin-bottom:10px;' />");
                    
                if($('#relFrame').outerHeight(true) > $("#wakuaFrame").outerHeight() - 90)
                { 
                    $("#scrapFrame").css({"height":"94%"});
                    $("#relFrame").css({"height":$('#scrapFrame').height()-80,"overflow-y":"auto"});
                }             
            }
            
            
            // enable scrap func 
            var enableScrap = function() {
                showFrame();
                
                var tempColor = '';                 
                var $width;
                                
                var wakuaDivMap = {
                    click : function(e){
                        // scrap                        
                        doScrap($(this).clone());                                                               
                    },
                    mouseover : function(e) {
                        tempColor = $(this).css('background-color');                    
                        
                        if($(this).children('iframe').is(':visible').length > 0) {// iframe
                            $(this).css({"background-color":"#FFCBCB",'border':'2px solid red'})
                                .children('iframe').is(':visible').css({"background-color":"#ECECEC",'outline':'3px solid #CCC'})
                        }
                        else {
                            if($.browser.msie) { // IE
                                $(this).css({"background-color":"#DAE9BC","border":"1px solid #AFD5B5"});                            
                            }
                            else { // Standard
                                $(this).css({"background-color":"rgba(210,240,220,0.7)", "outline":"1px solid #AFD5B5"});    
                            }                
                        }
                    },
                    mouseout : function(e) {
                        if($.browser.msie) { // IE
                            $(this).css({"background-color":tempColor, "border":"0"});                       
                        }
                        else { // Standard
                            $(this).css({"background-color":tempColor, "outline":"0"});   
                        }
                    }
                };            
                
                // setting div, table, ul tag
                $('body').delegate('div, table, ul', 'click mouseover mouseout', function(e){
                    if($.isFunction(wakuaDivMap[e.type])) {
                        //if(this.id == 'wakuaFrame' || this.parent());
                        if ( $(this).is('#wakuaFrame, #wakuaFrame *'));
                        else wakuaDivMap[e.type].call(this, e);
                    }                
                })                         
            }
            
            
            // disable scrap func 
            var disableScrap = function() 
            {
                $('body').undelegate();
                $('a').unbind('.killlink');
                hideFrame();
            }
            
            
            
            /* frame finder */
            var findFrame = function(tObj){  
                frame = $("frame");
                if (frame.length > 0) {                    
                    alert(' O_o;\n oops frame site \n we\'ll redirect to the frame url now. \n plz, do again wakua! >_<');
                    
                    var rowsArray = $('frameset').attr('rows').replace(/%/g,'').split(',');
                    var colsArray = $('frameset').attr('cols').replace(/%/g,'').split(',');
                    
                    var frameArray = (rowsArray == null || rowsArray == '') ? colsArray : rowsArray;
                    for(var i = 0; i < frameArray.length; i++) {// trim
                        frameArray[i] = frameArray[i].trim();
                    }                    
                    //console.log(frameArray);
                    
                    var realFrame = frameArray.max();                 
                                     
                    for(var i = 0; i < frameArray.length; i++) {
                        if(frameArray[i] == '*' || frameArray[i] == realFrame) 
                            window.location = frame[i].src;
                    }                         
                }
                else if($('iframe[id^=cafe_main]').length > 0) {  // fucking naver cafe !
                    $sourceTxt = $('iframe[id^=cafe_main]').contents().find('div[id^=tbody]').clone();
                    (jQuery.browser.msie )? $tempWin = window : $tempWin = window.open("", "scrapWin", "width=800,height=620,scrollBars, resizable");
                     
                    $body = $('body', $tempWin.document);
                    $body.html('<style>body{font-family:georgia,sans-serif;text-shadow: 1px 1px 5px #aaa;} h2:before {content: "\'";} h2:after {content: "\'";}</style>')
                          .append('<h1 style="margin:.5em;">O_o;</h1><h2 style="color:#EBEBEB;margin:.5em;">i hate naver cafe & blog and IE - _-;  (not user\'s contents ;p)</h2>')                                
                          .append($sourceTxt)                                
                          .find('div, a, li, img').removeAttr('onmouseover').removeAttr('onclick').removeAttr('style').removeAttr('onload').removeClass();
                    
                    doAgainWakua($tempWin);
                    if($.browser.msie ) {alert('damn IE - _-;');}            
                } 
            };
            
            // again! init running application
            var doAgainWakua = function(targetWindow) {
                if(targetWindow == null || targetWindow == '') targetWindow = window; 
                var cssNode = document.createElement('link');
                cssNode.type = 'text/css';    
                cssNode.rel = 'stylesheet';
                cssNode.media = 'screen';
                cssNode.href = window.$scrapKua.path + 'scrap/scrapKua.css';    
                targetWindow.document.getElementsByTagName('head')[0].appendChild(cssNode)
                var jsNode = document.createElement('script');
                jsNode.type = 'text/javascript'; 
                jsNode.charset = 'utf-8'; 
                jsNode.src = $scrapKua.path + 'scrap/scrapKua.js?rand=' + encodeURIComponent(Math.random());            
                targetWindow.document.getElementsByTagName('head')[0].appendChild(jsNode);
            }
            
            var imgList = function() {
                var $imgs = $('img').each(function(){
                    $(this).css('cursor','pointer').attr("onClick", 'document.getElementById("AXframe").style.height = "'+ ($(this).height()+90) +'px"; document.getElementById("AXframe").style.border = "solid red 1px"; document.f.url.value="'+ $(this).get(0).src +'";document.f.submit(); return false;')                    
                        .removeAttr('style').removeAttr('width').removeAttr('height').removeClass().removeAttr('url').attr('alt',$(this).attr("src"));                  
                        
                });
                
                $("link[type='text/css'],link[rel='stylesheet'],,style,noscript").remove();
                $('body').empty()
                    .html('<style>body{font-family:georgia,sans-serif;text-shadow: 2px 2px 5px #aaa;} img{margin:2px;} h2:before {content: "\'";} h2:after {content: "\'";}</style>')
                    .append('<script type="text/javascript">function beginUpload(src) {alert("uploading.. " + src);$("#uploadprogressbar").fadeIn();var i = setInterval(function() {$.getJSON("http://wakua.com/scrap/cap.php?id=" + "4c96fb3d03652" + "&url=" + src, function(data) {if (data == null) {clearInterval(i);/*location.reload(true);return;*/}var percentage = Math.floor(100 * parseInt(data.bytes_uploaded) / parseInt(data.bytes_total));$("#uploadprogressbar").html(percentage + "zzzz");});}, 1500);}')
                    .append('<h1 style="color:#CC0033;font-size:60pt;">Image Lists :D</h1>')
                    .append('<h2 style="color:#608E6F; "><a href="'+encodeURI(window.location)+'">' + encodeURI(window.location) + '</a></h2><hr />')
                    .append("\
                        <form action='http://wakua.com/scrap/cap.php' name='f' target='AXframe' method='get' onsubmit='beginUpload();'>\
                        <input type='hidden' name='url' /></form>\
                        <div style='text-align:center;'><iframe id='AXframe' style='width:95%;height:0;border:0;' name='AXframe'></iframe></div>")
                    .append('<div id="uploadprogressbar" style="display:none;">here</div>')
                    .append($imgs)
                    .append('<hr />' + $('#resultFrame').text())
                    .append('<h2 style="text-align:center;">from <a href="http://wakua.com">wakua! </a></h2>');
                
                    
                doAgainWakua();
            }
            
            var postData = function() {
                if( $('#resultFrame').is(':empty') ) {}
                else {
                    
                    var title = escape($('title').text());
                    var dataUrl = escape(window.location);
                    var stringData = escape($('#resultFrame').html().escapeHTML());                                        
                    
                    alert(stringData);
                                        
                    $('#resultFrame')
                        .html('<iframe id="AXframe" name="AXframe" style="width:100%; height:50%; border:0;" scrolling="no" ></iframe>')
                        .append("<form name='scrapKuaForm' id='scrapKuaForm' target='AXframe' action='http://localhost/hello' method='post' />");
                                        
                    $("<input type='hidden' id='title' name='title' />").val(title).appendTo('#scrapKuaForm');
                    $("<input type='hidden' id='dataUrl' name='dataUrl' />").val(dataUrl).appendTo('#scrapKuaForm');
                    $("<input type='hidden' id='data' name='data' />").val(stringData).appendTo('#scrapKuaForm');
                        
                    
                    if(data == '' || data == null) {
                        alert('empty data field.');
                    }
                    else {                        
                        $('#scrapKuaForm').submit();
                    }
                         
                    /*                        
                    $.getJSON(url + '&jsoncallback=?',
                    //$.getJSON('http://api.flickr.com/services/feeds/photos_public.gne?tags=cat&tagmode=any&format=json&jsoncallback=?',                    
                        function(data){
                            //var objJSON = eval('(' + jQuery.trim(data) + ')');
                            $('#resultFrame').html("JSON Data: <br />" + unescape(data.title) + "<br /> success :D");
                        }
                    );
                    */
                    /*
                    jQuery.ajax({
                        //type    :   'POST',
                        //dataType:   'json',
                        url     :   'http://localhost/scrap/getScrap.php',
                        //data    :   'name=' + 'hello' + '&title' + 'title123',
                        success :   function(msg) {
                            alert("data : " + msg + "\nend");
                        },
                        error : function(data) {
                            
                        }
                    });
                    */
                }
            }
            
            
            
            // create wakuaFrame div 
            if ($("#wakuaFrame").length == 0) {
                // create wakuaFrame Div
                $("<div id='wakuaFrame' style='display: none;'></div>").appendTo($('body'));            
                $frame = $("#wakuaFrame");              
                $frame.html("<div id='scrapFrame'>" + 
                            "<div id='wakuaHead'>" + 
                            "<div id='optionHandle' title='option panel'>OPT</div>" + 
                            "<div id='xHandle'>CLOSE</div>" + 
                            "<div id='optionPanel'>" + 
                                "<button class='optionBtn' id='icoImage' ><image src='http://wakua.com/scrap/images/image.png' title='image list' alt='image list' /><br />IMG</button>" + 
                            "</div>" +
                        "</div>" +
                        "<div id='wakuaLogo'><button class='wakua-button'><img src='http://wakua.com/scrap/images/wakua_logo2.png' alt='scrap wakua!' /></button></div>" +
                        "<div id='relFrame'><div id='resultFrame'></div></div></div>");
                                             
                                                
                // option pannel open & close, toggle
                $('#optionHandle').siblings('#optionPanel').hide().end().toggle(
                    function () {
                        $(this).siblings('#optionPanel').show('fast');
                    },
                    function () {
                      $(this).siblings('#optionPanel').hide('fast');
                    }
                );
                
                
                // get img lists ;p 
                $('#icoImage').click(function(e){
                    $(this).children('img').attr('src','http://wakua.com/scrap/images/ajax-loader.gif').attr('width','16');
                    imgList();
                });
                                
                                 
                $('a').bind('click.killlink',function(event){
                    event.preventDefault();                
                });
                
                
                // send data
                $('button.wakua-button').click(function(e){
                    postData();
                });
                
                
                findFrame(self); // check frame site
                enableScrap(); // scrapable now - div
                
                                
                $("#xHandle").click(function(event) {
                    disableScrap();                      
                });
                
            } else {disableScrap();}
        
        
        
        });     // jquery no conflict
    })(jQuery); // jquery no conflict
}   // end initWakua
    


    
})() //end script   
    
    
    
    
    
    
// window open
/*    
$tempWin = window.open("", "scrapWin", "width=800,height=620,scrollBars,dependent,resizable");

$body = $('body', $tempWin.document);    

// set printing css style
$body.load(function(){
   alert('onLoad!');
   $this.append(
    '<style type="text/css">' + 
    'body {font-family:Dotum serif; background:#f9f9f9; color:#111; margin:10px;}' +    
    'p {margin:0.6em 0; }' +
    'h1, h2, h3, br {line-height:1.3}' +
    '.right {text-align:right;}' +         
    '.scrapDiv {width:80%; border:1px solid blue; margin:5px auto; background:gray;}' + 
    '</style>'
    );
});




// append the title to the bottom of the page
($body.find('#fromSite').length > 0)?'':$body.append(
    "<h1 id='fromSite'>Title: " + $('title').text() + "</h1>" +
    "<p><b>From The Web Page</b>: " + window.location + "</p>" +

    "<form name='scrapKuaForm' id='scrapKuaForm' method='post' action=''>" +
    "<input type='hidden' id='scrapTitle' name='scrapTitle' value='"+ escape($('title').text()) +"' />" +
    "<input type='hidden' id='scrapFrom' name='scrapFrom' value='"+ escape(window.location) +"' />" +
    "<input type='hidden' id='scrapValue' name='scrapValue' value='' />" +
    "<input type='submit' value='scrap this kua!' />" +
    "</form>" +     
    "<button id='scrapBtn'>scrap this kua !</button>" +
    "<p class='right'>by wakua.com</p>" +
    "<hr nosade />" +
    "<div id='scrapContent'></div>"
);


$scrap = $('#scrapContent', $body);


var form = $('form[name=scrapKuaForm]', $body); 
form.submit(function(){
    $input = $('#scrapValue',$body);
    $input.val( escape( $scrap.html()) ); // �??�팅
    
    if($input.val().length == 0) { 
        alert('nothing!'); 
        return false; 
    } else {             
        form.attr('action', 'http://localhost/cap.php');
        return true;       
    } 
});

    
if(window.frames.length > 0) {   
    alert('frame exist');
    $("div,table", self.document).live('mouseover mouseout click', function(e) {
        if (e.type == 'mouseover') {
        $(this).css({"border":"1px solid red"});
        } else {
        $(this).css({"border":"none"});
        }
    
        if (e.type == 'click') {
            $(this).clone().appendTo($scrap);
        
        $("div,table", self.document).die("mouseover mouseout click");
        }return false;
    });
    for (var i =0; i <window.frames.length; i++) 
    {
        $("div,table", window.frames[i].document).live('mouseover mouseout click', function(e) {
            if (e.type == 'mouseover') {
            $(this).css({"border":"1px solid red"});
            } else {
            $(this).css({"border":"none"});
            }
        
            if (e.type == 'click') {
                $(this).clone().appendTo($scrap);
            
            $("div,table",window.frames[i].document).die("mouseover mouseout click");
            }return false;
        });
    }
    
}
else
{
    $("div,table").live('mouseover mouseout click', function(e) {
        if (e.type == 'mouseover') {
        $(this).css({"border":"1px solid red"});
        } else {
        $(this).css({"border":"none"});
        }
    
        if (e.type == 'click') {
            $(this).clone().appendTo($scrap);
            
        $("div,table").die("mouseover mouseout click");
        }return false;
    });
}

*/
