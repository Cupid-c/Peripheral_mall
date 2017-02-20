<?php
include 'DBHelper.php';
	session_start();
	$phone = $_SESSION["phone"];
	$pro_id=$_GET['id'];
	$pro_num = $_GET['num'];
	$checkSql = "select pro from cart where phone='$phone'";
	$array =json_decode(query($checkSql)[0]->pro,true);
	if(isset($pro_num)){
		$array[$pro_id]=$pro_num;	
	}else{
		$keys = array_keys($array);  
	    $index = array_search($pro_id,$keys);   
	    array_splice($array,$index,1);
	}
	if(count($array)==0){
		$array = '{}';
	}else{
		$array = json_encode($array);
	}
	$sql = "update cart set pro='$array' where phone='$phone'";
	$result = excute($sql);                                                      
?>