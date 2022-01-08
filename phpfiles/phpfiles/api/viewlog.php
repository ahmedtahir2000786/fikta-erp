<?php
require 'connect.php';
$id = $_GET['id'];
$orders=[];
$sql = "SELECT * FROM order_status WHERE ord_id='{$id}'";
    if($result = mysqli_query($con, $sql)){
        $cr=0;
        $row=mysqli_fetch_assoc($result);
        $orders[$cr]['status_date'] = json_decode($row['status_date']);
       
    echo json_encode($orders);

    }else{
        http_response_code(404);
    }
  $con->close();

?>