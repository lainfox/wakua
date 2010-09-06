<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Tangerine">
    <style>
    @charset "utf-8";
    
    body {
        font-family: 'Tangerine', serif;
        font-size: 48px;
        text-shadow: 4px 4px 4px #aaa;
    }
    
    @font-face {
        font-family: 'Inconsolata';
        src: local('Inconsolata'), url('http://themes.googleusercontent.com/fonts/font?kit=J_eeEGgHN8Gk3Eud0dz8jw') format('truetype');
    }
    @font-face {
        font-family: 'Inconsolata';
        src: url('http://themes.googleusercontent.com/fonts/font?kit=J_eeEGgHN8Gk3Eud0dz8jw');
    }
        
    @font-face {
      font-family: 'Daum_SemiBold';
      font-style: normal;
      font-weight: normal;
      src: url('http://vible.tistory.com/attachment/cfile29.uf@1241F02F4C7F52213A13C5.eot');
      src: local('Daum_SemiBold'), 
            url("http://vible.tistory.com/attachment/cfile3.uf@1443582F4C7F522226B346.ttf") format("truetype"),
            url("http://typefront.com/fonts/825588234.woff") format("woff");;
      
    }



        /* 
        U+AC00-D7AF
        http://vible.tistory.com/attachment/cfile29.uf@1241F02F4C7F52213A13C5.eot
        http://vible.tistory.com/attachment/cfile3.uf@1443582F4C7F522226B346.ttf        
        */

        
        #daum { font-family: 'Daum_SemiBold','Malgun gothic', dotum; }

    </style>
  </head>
  <body>
    <h1 >Making the Web Beautiful!</h1>
    <h1 style="font-family:Inconsolata;">Making the Web Beautiful!</h1>
    
    <h1 id="daum">한글도 이쁘기만 하다</h1>
    
    
<?php
echo $_SERVER['HTTP_USER_AGENT']; 

echo "<pre>";

print_r($_REQUEST);

echo "</pre>";


?>


<hr />

<script>

var scrap = "<?php echo $_REQUEST['scrapValue'];?>"; 

document.write(unescape(scrap));
</script>
  </body>
</html>
