<?php
	header("Cache-Control: no-cache, must-revalidate");
	header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");

	if (@$_GET['id']) {
		echo json_encode(uploadprogress_get_info($_REQUEST['id']));
		exit();
	}

	if (@$_POST['UPLOAD_IDENTIFIER'])
		exit();
	
	$uuid = uniqid();
?>

<style>
    body {background: #FFFFFF; font:9pt solid verdana; color:black;}
    img {border:1px solid silver; margin-bottom:4px;}
    input {width:80%; text-align:center; }
</style>

<?php
require_once('imageshack.class.php');


// imageshack and yFrog api key
//key 1: 146CDGJY4ab039507779ef6e0ec281c181c678e7
//key 2: 19BCGIQY18e728ba16638ba63d8969f645139bb3

$imgUrl = $_REQUEST['url'];

$img = new imageShack;
$img->setURL($imgUrl);
$captura = $img->getSrc();

//print_r($captura);

echo "<div style='text-align:center'>";
echo "<img src='" . $captura[1][0] ."' alt='". $captura[1][0]."' /><br />";
echo "<input type='text' onclick='this.select()' value='". $captura[1][0] ."' /><br />";
echo "<input type='text' onclick='this.select()' value='&lt;img src=\"" . $captura[1][0] ."\" alt=\"". $captura[1][0]."\" /&gt;' /><br />";
//echo '<script>prompt("Uploaded image complete! - copy this URL >_<","'.$captura[1][0].'")</script>';
echo "</div>";  
?>

var progress_key = '<?= $uuid ?>';


<?php
/*
//echo $_SERVER['HTTP_USER_AGENT']; 

echo "<pre>";

//print_r($_REQUEST);

echo "</pre>";

//*/
?>



<script>

var scrap = "<?php echo $_REQUEST['scrapValue'];?>"; 

document.write(unescape(scrap));
</script>

