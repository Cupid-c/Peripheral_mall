<?php 
	include 'DBHelper.php';
	$account = $_POST['name'];
	$psw = $_POST['password'];
	$phone = $_POST['phone'];
	$sql = "insert into user_info(account,password,phone) values('$account','$psw','$phone')";
	$sql_cart =  "insert into cart(phone) values('$phone')";
	$checkSql = "select * from user_info where phone = '$phone';";
	$array = query($checkSql);
	if(count($array) > 0){
		echo '{"state": false, "message": "phone already exists!"}';
	}else{
		$result = excute($sql);
		if($result){
			excute($sql_cart);
			echo '{"state": true, "message":"register success!"}';
		}else{
			echo '{"state": false, "message": "register fail!"}';
		}
	}
?>