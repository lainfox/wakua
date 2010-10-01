<?
//header("Content-type: text/javascript");

$title = '"title" : "'.$_REQUEST['title'].'"';
$dataUrl = '"dataUrl" : "'.$_REQUEST['dataUrl'].'"';
$data = '"data" : "'.$_REQUEST['data'].'"';

echo $_GET['jsoncallback'] . 
    '({' .         
        $title . ', ' .
        $dataUrl . ', ' .
        $data .
    '});';
?>


<style>
html, body {color:#FFF; font:8pt verdana;}
</style>