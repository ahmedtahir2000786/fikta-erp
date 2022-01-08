<?php
require 'connect.php';
$cnd = $_GET['cnd'];
$orders=[];
$sql="";
if($cnd == "shipper"){
    $sql = "SELECT * FROM shipper_detail WHERE sno=1";
    if($result = mysqli_query($con, $sql)){
        $cr=0;
        while($row=mysqli_fetch_assoc($result)){
            $orders['name'] = $row['name'];
            $orders['address'] = $row['address'];
            $orders['city'] = $row['city'];
            $orders['city_short'] = $row['city_short'];
            $orders['phone'] = $row['phone'];
            $orders['email'] = $row['email'];
            $cr++;
        }
    }
}else{
     $sql = "SELECT * FROM citylist";
    if($result = mysqli_query($con, $sql)){
        $cr=0;
        while($row=mysqli_fetch_assoc($result)){
            $orders[$cr]['city_name'] = $row['city_name'];
            $orders[$cr]['city_short'] = $row['city_short'];
            $cr++;
        }
    }
}

   
    
    echo json_encode($orders);

   

?>