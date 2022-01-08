<?php

require 'connect.php';
    $id = $_GET['id'];
$postdata = file_get_contents("php://input");
   $sql2 = "UPDATE `order_status` SET `status_date`='$postdata' WHERE `ord_id`='{$id}'";
     if(mysqli_query($con, $sql2)){
        http_response_code(201);
    }else{
        http_response_code(422);
    }
    

$con->close();

    ?>