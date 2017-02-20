<?php
include 'DBHelper.php';
	$order_id=$_GET['id'];
	$sql = "DELETE FROM orders WHERE orderID='$order_id';";
	$result = excute($sql);
	if($result){
		excute($sql_cart);
		echo '{"state": true, "message":" success!"}';
	}else{
		echo '{"state": false, "message": "fail!"}';
	}                                                    
?>