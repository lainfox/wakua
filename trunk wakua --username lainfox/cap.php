<?php
require_once('imageshack.class.php');


// imageshack and yFrog api key
//key 1: 146CDGJY4ab039507779ef6e0ec281c181c678e7
//key 2: 19BCGIQY18e728ba16638ba63d8969f645139bb3


$img = new imageShack;
$img->setURL('http://www.nemopan.com/pan_star/845311/page/files/attach/images/6295/311/845/7.jpg');
$img->main();

?>
<?php
/*
//echo $_SERVER['HTTP_USER_AGENT']; 

echo "<pre>";

//print_r($_REQUEST);

echo "</pre>";

//*/
?>


<hr />

<script>

var scrap = "<?php echo $_REQUEST['scrapValue'];?>"; 

document.write(unescape(scrap));
</script>

