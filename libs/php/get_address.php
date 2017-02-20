<?php
include 'DBHelper.php';
	session_start();
	$phone = $_SESSION['phone'];
	$sql = "select addressee from user_info where phone = '$phone';";
	$array =query($sql)[0]->addressee;
	$array =explode("|",$array);
	$num = count($array); 
	for($i=0;$i<$num;++$i){
		 $array[$i] = explode("&",$array[$i]);
	} 
	echo(json_encode($array));
?>