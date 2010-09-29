<?
header("Content-type: text/javascript");

$test = '"title" : "nya~nya~nya~"';
$title = '"title" : "'.$_REQUEST['title'].'"';
$dataUrl = '"dataUrl" : "'.$_REQUEST['dataUrl'].'"';
$data = '"data" : "'.$_REQUEST['title'].'"';

echo $_GET['jsoncallback'] . 
    '({' . 
        $test . ', ' .
        $title . ', ' .
        $dataUrl . ', ' .
        $data .
    '});';
?>

<?
/*
//echo $_SERVER['HTTP_USER_AGENT']; 

echo "<pre>";

print_r($_REQUEST);

echo "</pre>";

//*/
?>
