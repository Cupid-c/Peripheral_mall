<?php 
	include 'DBHelper.php';
	session_start();
	$phone = $_SESSION["phone"];
	$pro = $_SESSION['pro'];
	$products = json_encode($pro);
	$consignee = $_POST['consignee'];
	$consignee_p = $_POST['consignee_p'];
	$address = $_POST['address'];
	$togel = $_POST['togel'];
	$num = $_POST['num'];
	$orderID =  date('Y-m-d H:i:s');
	$orderID=str_ireplace("-","",$orderID);
	$orderID=str_ireplace(":","",$orderID);
	$orderID=str_ireplace(" ","",$orderID).rand(1, 100000);
	$sql = "insert into orders(phone,orderID,consignee,consignee_p,address,products,togelPri,num) values('$phone','$orderID','$consignee','$consignee_p','$address','$products','$togel','$num')";
	$result = excute($sql);
	if($result){
		echo '{"state": true, "message":"register success!"}';
	}else{
		echo '{"state": false, "message": "register fail!"}';
	}
	
	
	
	
	$checkSql = "select pro from cart where phone='$phone'";
	$array =json_decode(query($checkSql)[0]->pro,true);
	foreach($pro as $x=>$x_value) 
	{
		$keys = array_keys($array);  
   		$index = array_search($x,$keys);   
   		array_splice($array,$index,1);
	} 
	if(count($array)==0){
		$array = '{}';
	}else{
		$array = json_encode($array);
	}
	$sql = "update cart set pro='$array' where phone='$phone'";
	excute($sql);  
	
?>