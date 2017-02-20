<?php
	include 'DBHelper.php';
	session_start();
	$phone = $_SESSION['phone'];
	$sql = "select orderID,products,togelPri,num from orders where phone = '$phone';";
	$array =query($sql);
	$num = count($array); 
	$prolist = array();
	$prolists = array();
	for($i=0;$i<$num;++$i){
		 $proArray = $array[$i]->products;
		$pros = array();
		foreach(json_decode($proArray) as $x=>$x_value) 
		{
				
			$sql_se = "select * from product where id = '$x';";			
			
			$pro = query($sql_se)[0];
			$pro->num = $x_value;
			$pros[] =  $pro;
		} 
		$prolist['pro'] =  $pros;
		$prolist['oid']= $array[$i]->orderID;
		$prolist['togel']= $array[$i]->togelPri;
		$prolist['num']= $array[$i]->num;
		$prolists[] = $prolist;
	}
	echo(json_encode($prolists)) ;
?>