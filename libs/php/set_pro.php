<?php
	include 'DBHelper.php';
	session_start();
	$pro = $_SESSION['pro'];
	if(isset($pro)){
//		print_r($pro);
		$array = array();
		foreach($pro as $x=>$x_value) 
		{
			$sql = "select * from product where id = '$x';";
			$pros = query($sql)[0];
			$pros->num = $x_value;
			$array[] =  $pros;
		} 
		echo json_encode($array);
	}else{
		echo '{"state": false, "message":"register success!"}';
	}
?>