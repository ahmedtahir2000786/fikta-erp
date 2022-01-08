<?php
require 'connect.php';
    $orders=[];
    $sql = "SELECT * FROM orders
WHERE status<>'Deleted'";
    if($result = mysqli_query($con, $sql)){
        $cr=0;
        while($row=mysqli_fetch_assoc($result)){
            $dt = explode(" ", $row['date']);
            $orders[$cr]['ord_id'] = $row['ord_id'];
            $orders[$cr]['date'] = $row['date'];
            $orders[$cr]['cust_id'] = $row['cust_id'];
            $orders[$cr]['name'] = $row['name'];
            $orders[$cr]['phone'] = $row['phone'];
            $orders[$cr]['address'] = $row['address'];
            $orders[$cr]['amount'] = $row['amount'];
            $orders[$cr]['color'] = $row['color'];
            $orders[$cr]['size'] = $row['size'];
            $orders[$cr]['design_name'] = $row['design_name'];
            $orders[$cr]['status'] = $row['status'];
            $orders[$cr]['delete_ord'] = $row['delete_ord'];
             $orders[$cr]['only_date'] = $dt[0];
            $orders[$cr]['only_time'] = $dt[1];
            $cr++;
        }
    echo json_encode($orders);

    }else{
        http_response_code(404);
    }
  $con->close();

?>