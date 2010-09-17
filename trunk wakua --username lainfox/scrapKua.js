(function(){
    String.prototype.escapeHTML = function () {                                        
        return(                                                                 
            this.replace(/&/g,'&amp;').                                         
                replace(/>/g,'&gt;').                                           
                replace(/</g,'&lt;').                                           
                replace(/"/g,'&quot;')                                         
        );                                                                      
    };
    function checkKey(){
        if(window.event.keyCode == 27){
            disableScrap(self);            
            return false;
        }
    }
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
        (versionArray[1] < 4) ? loadJquery() : runthis();       
    }
    
    function loadJquery() {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";    
        script.onload = script.onreadystatechange = function(){
            if(!this.readyState || this.readyState=='loaded' || this.readyState=='complete'){
                jQuery.noConflict();
                runthis();             
            }
        };    
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    
    function runthis() {
        (function($) { 
        $(function() { 
            
            // click content - scrap it!
            function doScrap($scrapContent) {                 
                if($scrapContent.find('iframe').length > 0) {// find iframe and replace contents of iframe with tag, daum blog cyclub ,etc                    
                    $scrapContent.find('iframe').replaceWith($(this).contents().find('html body'));
                    //$scrapContent = $scrapContent.find('iframe[height!=0]').contents().find('html body');
                } //,iframe[id^=cafe_main] -- naver cafe
                
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
            
             
            function enableScrap() {          
                $('#wakuaFrame').css({'right':'-30px', 'opacity':'0.1', 'display':''}).animate({
                    opacity: 1,
                    right: '+=50px'                
                    }, 500
                );
                
                var tempColor = '';                 
                var $width;
                                
                var wakuaDivMap = {
                    click : function(e){
                        // scrap
                        doScrap($(this).clone());                                                               
                    },
                    mouseover : function(e) {
                        tempColor = $(this).css('background-color');                    
                        
                        if($(this).children('iframe').length > 0) {// iframe
                            $(this).css({"background-color":"#FFCBCB",'outline':'3px solid red'})
                                .children('iframe').css({"background-color":"#ECECEC",'outline':'3px solid #CCC'})
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
            
            function disableScrap() 
            {
                $('body').undelegate();
                $('a').unbind('.killlink');
                
                $('#wakuaFrame').animate({
                    opacity: 0.1,
                    right: '-=50px'                
                    }, 500, function() {
                        $(this).remove();                    
                });
            }
            
            /* frame finder */
            var findFrame = function(tObj){  
                frame = jQuery("frame");
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
                else if(jQuery('iframe[id^=cafe_main]').length > 0) {  // fucking naver cafe !
                    $sourceTxt = jQuery('iframe[id^=cafe_main]').contents().find('div[id^=tbody]').clone();
                    (jQuery.browser.msie )? $tempWin = window : $tempWin = window.open("", "scrapWin", "width=800,height=620,scrollBars, resizable");
                     
                    $body = jQuery('body', $tempWin.document);
                    $body.html('<style>body{font-family:georgia,sans-serif;text-shadow: 1px 1px 5px #aaa;} h2:before {content: "\'";} h2:after {content: "\'";}</style>')
                          .append('<h1 style="margin:.5em;">O_o;</h1><h2 style="color:#EBEBEB;margin:.5em;">i hate naver cafe & blog and IE - _-;  (not user\'s contents ;p)</h2>')                                
                          .append($sourceTxt)                                
                          .find('div, a, li, img').removeAttr('onmouseover').removeAttr('onclick').removeAttr('style').removeAttr('onload').removeClass();
                    
                    doAgainWakua($tempWin);
                    if(jQuery.browser.msie ) {alert('damn IE - _-;');}            
                } 
            };
            
            // again! running application
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
                    $(this).attr("onClick", 'document.getElementById("AXframe").style.height = "'+ ($(this).height()+90) +'px"; document.getElementById("AXframe").style.border = "solid red 1px"; document.f.url.value="'+ $(this).get(0).src +'";document.f.submit(); return false;')
                        .removeAttr('style').removeAttr('width').removeAttr('height').removeClass().removeAttr('url').attr('alt',$(this).attr("src"))                   
                        .css('cursor','pointer');
                });
                
                //console.log($imgs[0]);

                $("link[type='text/css'],link[rel='stylesheet'],script,style,noscript").remove();
                $('body').empty()
                    .html('<style>body{font-family:georgia,sans-serif;text-shadow: 2px 2px 5px #aaa;} img{margin:2px;} h2:before {content: "\'";} h2:after {content: "\'";}</style>')
                    .append('<h1 style="color:#CC0033;font-size:60pt;">Image Lists :D</h1>')
                    .append('<h2 style="color:#608E6F; "><a href="'+encodeURI(window.location)+'">' + encodeURI(window.location) + '</a></h2><hr />')
                    .append("\
                        <form action='http://wakua.com/scrap/cap.php' name='f' target='AXframe' method='get' enctype='multipart/form-data'>\
                        <input type='hidden' name='url' /></form>\
                        <div style='text-align:center;'><iframe id='AXframe' style='width:95%;height:0;border:0;' name='AXframe'></iframe></div>")
                    .append($imgs)
                    .append('<hr />' + $('#resultFrame').text())
                    .append('<h2 style="text-align:center;">from <a href="http://wakua.com">wakua! </a></h2>');
                
                    
                //doAgainWakua();
                disableScrap(self);
            }
            
            
            
            
            if ($("#wakuaFrame").length == 0) {
                // create wakuaFrame Div
                $("<div id='wakuaFrame' style='display: none;'></div>").appendTo($('body'));            
                $frame = $("#wakuaFrame");              
                $frame.html("\
                    <div id='scrapFrame'>\
                    <div id='wakuaHead'>\
                        <div id='optionHandle' title='option panel'>OPT</div>\
                        <div id='xHandle'>CLOSE</div>\
                        <div id='optionPanel'>\
                            <button class='optionBtn' id='icoImage' ><image src='http://wakua.com/scrap/images/image.png' title='image list' alt='image list' /><br />IMG</button>\
                        </div>\
                    </div>\
                    <div id='wakuaLogo'><button class='wakua-button'><img src='http://wakua.com/scrap/images/wakua_logo2.png' alt='scrap wakua!' /></button></div>\
                    <div id='relFrame'>\
                    <div id='resultFrame'>\
                    </div></div></div>");
                                             
                $("#xHandle").click(function(event) {
                    disableScrap(self);                      
                });
                
                                
                // image lists
                $('#optionHandle').siblings('#optionPanel').hide().end().toggle(
                    function () {
                        $(this).siblings('#optionPanel').show('fast');
                    },
                    function () {
                      $(this).siblings('#optionPanel').hide('fast');
                    }
                );
                
                $('#icoImage').click(function(e){
                    $(this).children('img').attr('src','http://wakua.com/scrap/images/ajax-loader.gif').attr('width','16');
                    imgList();
                });
                                
                                 
                $('a').bind('click.killlink',function(event){
                    event.preventDefault();                
                });
                
                
                findFrame(self); // check frame site
                        
                enableScrap(); // scrapable now - div
                                                
                document.onkeydown=checkKey; // esc to escape
                
                
            } else {disableScrap(self);}
        });     // jquery no conflict
    })(jQuery); // jquery no conflict
    }   // end runthis func
    
    
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
    $input.val( escape( $scrap.html()) ); // ê°??‹íŒ…
    
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
