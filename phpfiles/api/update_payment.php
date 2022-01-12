<?php

require 'connect.php';
$cnd = $_GET['cnd'];
$id = $_GET['cn'];
if($cnd == "getdate"){
    $sql = "Select `date` FROM `orders` WHERE `consignmentnum`='{$id}'";
    if($result=mysqli_query($con, $sql)){
        $res=mysqli_fetch_assoc($result);
        echo $res['date'];
            //http_response_code(201);
    }
}else{
if($cnd == "onlyresolve"){
    $sql3 = "UPDATE `chqdata` SET `resolved`='1' WHERE `consignmentnum`='{$id}'";
    if(mysqli_query($con, $sql3)){    
        echo "Onli res";
        http_response_code(201);
    }
}else{
 $date = $_GET['date'];
 echo $date;
$sql2 = "UPDATE `orders` SET `paymentrcvd`='1', `date` ='{$date}'  WHERE `consignmentnum`='{$id}'";
if(mysqli_query($con, $sql2)){
    echo "data";
    $sql4 = "UPDATE `chqdata` SET `resolved`='1' WHERE `consignmentnum`='{$id}'";
    if(mysqli_query($con, $sql4)){    
        echo "Data Success";
        http_response_code(201);
    }
    }else{
        http_response_code(422);
    }   
}

}


?>