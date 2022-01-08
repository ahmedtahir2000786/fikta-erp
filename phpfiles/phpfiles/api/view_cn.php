<?php
require 'connect.php';

    $orders=[];
    $sql = "SELECT * FROM orders";
    if($result = mysqli_query($con, $sql)){
        $cr=0;
        while($row=mysqli_fetch_assoc($result)){
            $orders[$cr]['consignmentnum'] = $row['consignmentnum'];
            $orders[$cr]['amount'] = $row['amount'];
            $orders[$cr]['status'] = $row['status'];
            $orders[$cr]['category'] = $row['category'];
            $cr++;
        }
    
    echo json_encode($orders);

    }else{
        http_response_code(404);
    }

?>