<?php
	include 'DBHelper.php';
	session_start();
	$phone = $_SESSION["phone"];
	$addressee  = $_POST['addressee'];
	$checkSql = "select addressee from user_info where phone='$phone'";
	$address = query($checkSql)[0]->addressee;
	if(isset($address)){
		$address = $addressee . "|" . $address;
	}else{
		$address = $addressee;
	}
	$sql="update user_info set addressee='$address' where phone='$phone'";
	$result=excute($sql);
	if($result){
		echo '{"state": true, "message":"add success!"}';
	}else{
		echo '{"state": false, "message": "add fail!"}';
	}

?>