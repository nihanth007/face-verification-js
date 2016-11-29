<?php

if(isset($_POST['dataUrl']))
{
	$rawImage = $_POST['dataUrl'];
	$fileName = $_POST['fileName'];
	$removeHeaders = substr($rawImage, strpos($rawImage, ",")+1);
	$removeHeaders = str_replace(' ','+',$removeHeaders);
	$fopen = fopen('temp/temp.txt','wb');
	fwrite($fopen , $removeHeaders);
	fclose($fopen);
	$decode = base64_decode($removeHeaders);
	$fileLoc = 'temp/'.$fileName.'.png';
	$fopen = fopen($fileLoc,'wb');
	fwrite($fopen , $decode);
	fclose($fopen);
}

?>