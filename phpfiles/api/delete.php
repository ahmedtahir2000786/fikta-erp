<?php

require 'connect.php';
$id = $_GET['id'];
$reason = $_GET['reason'];
//$date = $_GET['date'];

$sql = "UPDATE `orders` SET `delete_ord`='1', `status`='Deleted', `reason`='$reason', `date`=CONVERT_TZ(CURRENT_TIMESTAMP(), '+00:00','+11:00') WHERE `ord_id`='{$id}'";
//print_r ($id);

     /*$sql = "INSERT INTO orders(
        name,
        cust_id,
        address, 
        phone, 
        amount, 
        color, 
        size, 
        design_name,
        status)
        VALUES(
            '{$name}',
            '{$custid}',
            '{$phone}',
            '{$amount}', 
            '{$color}',
            '{$size}',
            '{$design_name}',
            'Booked'

            )
    
    ";*/
     if(mysqli_query($con, $sql)){
        echo "Data Success";
        http_response_code(201);
    }else{
        http_response_code(422);
    }
   


    ?>