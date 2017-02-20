<?php
	include 'DBHelper.php';
	session_start();
	$phone = $_SESSION['phone'];
	$sql = "select pro from cart where phone = '$phone';";
	$array =json_decode(query($sql)[0]->pro);
	$pros = array();
	foreach($array as $x=>$x_value) 
	{
		$sql_se = "select * from product where id = '$x';";
		$pro = query($sql_se)[0];
		$pro->num = $x_value;
		$pros[] =  $pro;
	} 
	echo(json_encode($pros));
?>