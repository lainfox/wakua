<html>
<head></head>

<body>

<form enctype="multipart/form-data" id="uploadform" method="post" action="upload.php">
<input type="hidden" name="MAX_FILE_SIZE" value="1048576">
<input id="anchor_file" type="file" name="files[]" />
<input type="submit" value="submit" id="submitimages" name="submitimages" />
</form>

  
<?php
// imageshack and yFrog api key
//key 1: 146CDGJY4ab039507779ef6e0ec281c181c678e7
//key 2: 19BCGIQY18e728ba16638ba63d8969f645139bb3


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
