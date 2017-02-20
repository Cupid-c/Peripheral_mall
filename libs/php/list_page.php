<?php 
	include 'DBHelper.php';
	$checkSql = "select * from product;";
	$array = query($checkSql);
       echo json_encode($array, JSON_UNESCAPED_UNICODE);
?>
