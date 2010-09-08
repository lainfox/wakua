var viewFrame;
var isError = null;

String.prototype.escapeHTML = function () {                                        
    return(                                                                 
        this.replace(/&/g,'&amp;').                                         
            replace(/>/g,'&gt;').                                           
            replace(/</g,'&lt;').                                           
            replace(/"/g,'&quot;')                                         
    );                                                                      
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
            //loadJqueryUI();
            runthis();             
        }
    };    
    document.getElementsByTagName("head")[0].appendChild(script);
}


/* frame finder */        
function findFrame(tObj) {            
    var tempFrame = '';              
    frame = jQuery("frame");
    if (frame.length > 0) {
        // 프레임이다                
        if(frame[1] == null || frame[1].height == 'undefined' || frame[1].height == 0)
        {
            alert(' O_o;\n oops frame site \n we\'ll redirect to the frame url now. \n plz, do again wakua! >_<');
            for(var i = 0; i < frame.length; i++) {
                if(frame[i].height > 100)
                    window.location = frame[i].src;
            }                  
        }                               
    }
    else if(jQuery('iframe[id^=cafe_main]').length > 0) {  // fucking naver cafe
        alert('not support yet .. Q.Q');
        $sourceTxt = jQuery('iframe[id^=cafe_main]').contents().find('html body').clone();
        $sourceTxt.removeAttr('script');
        document.write('<h1>zz</h1><pre>' + $sourceTxt.html().escapeHTML()  + '</pre>');
        //return false;              
        /*
        var tempIframe = iframe.contents()
                            .find('div#main-area').clone();
                            //.find('embed,object,iframe').remove().end()
        $(document.body).html(tempIframe.html()).css('border','5px solid red');
        //*/
    } 
}

 
function runthis() {
(function($) { 
    $(function() { 
        if (window.document.getElementsByTagName('body').length > 0);
        else {    
            window.document.getElementsByTagName('html')[0].appendChild(document.createElement('body'));
        }
        
        viewFrame = findFrame(self); // find frame
        
        function enableScrap(tFrame) {          
            $('#wakuaFrame').css({'right':'-30px', 'opacity':'0.1', 'display':''}).animate({
                opacity: 1,
                right: '+=50px'                
                }, 500
            );
            
            var tempColor = '';
            var tempScript = ''; 
            var $width;
            
            var wakuaDivMap = {
                click : function(e){
                    $scrapContent = $(this);
                    tempScript = $scrapContent.find('script');
                    //alert(tempScript.length);
                    
                    if($scrapContent.children('iframe').length > 0) {// daum blog iframe, cyclub
                        alert('O_o iframe; \nreplace content with iframe')
                        $scrapContent = $(this).find('iframe').contents().find('html body');
                    } //,iframe[id^=cafe_main] -- naver cafe
                    
                    //alert($scrapContent.has('iframe[id^=if_]').length);
                    $scrapContent.find('script').remove();
                    
                    ($.browser.msie )? $width = '250%' : $width = '100%';                    
                    $scrapContent.clone().removeClass().removeAttr('style').removeAttr('id').css('width', $width)
                        .children().removeClass().removeAttr('style').removeAttr('id').parent()
                        .hide().fadeIn(1000)
                        .prependTo("#resultFrame").wrap("<div style='display:block;clear:both; border-bottom:10px dashed #CCC; padding:5px 5px 10px 5px; margin-bottom:10px;' />");
                        
                    if($('#relFrame').outerHeight(true) > $("#wakuaFrame").outerHeight() - 90)
                    { 
                        $("#scrapFrame").css({"height":"94%"});
                        $("#relFrame").css({"height":$('#scrapFrame').height()-80,"overflow-y":"auto"});
                    }
                    //$(this).append(tempScript);                                       
                },
                mouseover : function(e) {
                    tempColor = $(this).css('background-color');                    
                    
                    if($(this).children('iframe').length > 0) {// iframe
                        $(this).css({"background-color":"#FFCBCB",'outline':'3px solid red'});                        
                    }
                    else {
                        if($.browser.msie) {
                            $(this).css({"background-color":"#DAE9BC"});                            
                        }
                        else {
                            $(this).css({"background-color":"rgba(210,240,220,0.7)"});    
                        }
                        //$(this).css({"background-color":"#DAE8DB"});                        
                    }
                },
                mouseout : function(e) {
                    $(this).css({"background-color":tempColor});
                }
            };            
            
            //$("div:not('#wakuaFrame, #wakuaFrame div'), table")                        
            $('body').delegate('div:not("#wakuaFrame, #wakuaFrame div")', 'click mouseover mouseout', function(e){
                if($.isFunction(wakuaDivMap[e.type])) {
                    wakuaDivMap[e.type].call(this, e);
                }                
            }).end().delegate('table', 'click mouseover mouseout', function(e){
                if($.isFunction(wakuaDivMap[e.type])) {
                    wakuaDivMap[e.type].call(this, e);
                }                
            });
                             
        }
        function disableScrap(tFrame) 
        {
            $('body').undelegate();
            $('a').unbind('.killlink');
            /*
            $('#wakuaFrame').hide('drop', {direction:'right'},500, function(){
                $(this).remove();
            });
           
             
            $('#wakuaFrame').hide(500,function(){
                $(this).remove();
            });
             */
            $('#wakuaFrame').animate({
                opacity: 0.1,
                right: '-=50px'                
                }, 500, function() {
                    $(this).remove();                    
            });
        }
      
        if ($("#wakuaFrame").length == 0) {
            // create div
            // window.document.getElementsByTagName('body')            
            $("<div id='wakuaFrame' style='display: none;'></div>").appendTo($('body'));            
            $frame = $("#wakuaFrame");              
            $frame.html("\
                <div id='scrapFrame'>\
                <div id='wakuaHead'>\
                    <div id='optionFrame'><img src='"+ $scrapKua.path +"scrap/images/folder_heart.png' id='imgHandle' alt='get imgList' /></div>\
                    <div id='xHandle'>CLOSE</div>\
                </div>\
                <div id='wakuaLogo'><button class='wakua-button'><img src='"+ $scrapKua.path +"scrap/images/wakua_logo2.png' alt='scrap wakua!' /></button></div>\
                <div id='relFrame'>\
                <div id='resultFrame'>\
                </div></div></div>");
                                         
            $("#xHandle").click(function(event) {
                disableScrap(self);                      
            });
            // image lists
            $('#optionFrame > img').css('cursor','pointer').click(function(event) {                
                var $imgs = $('img').removeAttr('style').removeAttr('width').removeAttr('height').removeClass();
                                                                             
                $("link[type='text/css'],link[rel='stylesheet'],script,style,noscript").remove();
                $('body').empty()
                    .html('<style>body{font-family:georgia,sans-serif;text-shadow: 2px 2px 5px #aaa;} img{border:1px solid #CCC; margin:2px;} h2:before {content: "\'";} h2:after {content: "\'";}</style>')
                    .append('<h1 style="color:#CC0033;font-size:60pt;">Image Lists :D</h1>')
                    .append('<h2 style="color:#608E6F; "><a href="'+encodeURI(window.location)+'">' + encodeURI(window.location) + '</a></h2><hr />')
                    .append($imgs)
                    .append($('#resultFrame').text())
                    .append('<h2 style="text-align:right;">from <a href="http://wakua.com">wakua! </a></h2>');
            });
             
            $('a').bind('click.killlink',function(event){
                event.preventDefault();                
            });
            
            enableScrap(viewFrame); // scrapable now
            
            
            String.prototype.escapeHTML = function () {                                        
                return(                                                                 
                    this.replace(/&/g,'&amp;').                                         
                        replace(/>/g,'&gt;').                                           
                        replace(/</g,'&lt;').                                           
                        replace(/"/g,'&quot;')                                         
                );                                                                      
            };
            
            
            document.onkeydown=checkKey; // esc to escape
            function checkKey(){
                if(window.event.keyCode == 27){
                    disableScrap(self);
                    // 테스트 용 코드. 소스 보기 - esc
                    var sourceText = window.document.documentElement.innerHTML;
                    $(sourceText).find('script').remove();
                    sourceText = sourceText.escapeHTML();
                    document.write('<h1>zzzz</h1>');
                    document.write('<div><pre>'+ sourceText +'</pre></div>');    
                    return false;
                }
            }
            
        } else {disableScrap(self);}
    });     // jquery no conflict
})(jQuery); // jquery no conflict
}   // end runthis func







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
        $input.val( escape( $scrap.html()) ); // 값 셋팅
        
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
    
      

      

