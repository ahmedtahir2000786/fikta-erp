<?php

require 'connect.php';
    $id = $_GET['id'];
    $lts_rsn = $_GET['lts_rsn'];
$postdata = file_get_contents("php://input");
   $sql2 = "UPDATE `order_status` SET `status_date`='$postdata' WHERE `ord_id`='{$id}'";
     if(mysqli_query($con, $sql2)){
         $sql = "UPDATE `orders` SET `reason`='$lts_rsn' WHERE `ord_id`='{$id}'";
         if(mysqli_query($con, $sql)){
        http_response_code(201);
         }
    }else{
        http_response_code(422);
    }
    

$con->close();

    ?>