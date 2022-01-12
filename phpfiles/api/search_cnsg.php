<?php
require 'connect.php';
$searchby = $_GET['SearchBy'];
$orders=[];
$sql="";

if($searchby == "cnsg") {
    $cnsg =$_GET['cnsg'];
    $sql = "SELECT * FROM orders WHERE (consignmentnum = $cnsg)";
}else if($searchby == "name") {
    $cnsg = $_GET['cnsg'];
    $sql = "SELECT * FROM orders WHERE (name = '{$cnsg}') ";
}else if($searchby == "phone") {
    $cnsg =(int) $_GET['cnsg'];
    $sql = "SELECT * FROM orders WHERE (phone = $cnsg) ";
}
    if($result = mysqli_query($con, $sql)){
        $cr=0;
        while($row=mysqli_fetch_assoc($result)){
            $dt = explode(" ", $row['date']);
            $color = json_decode($row['color']);
            $size = json_decode($row['size']);
            $design = json_decode($row['design_name']);
            $orders[$cr]['ord_id'] = $row['ord_id'];
            $orders[$cr]['consignmentnum'] = $row['consignmentnum'];
            $orders[$cr]['cust_id'] = $row['cust_id'];
            $orders[$cr]['name'] = $row['name'];
            $orders[$cr]['phone'] = $row['phone'];
            $orders[$cr]['address'] = $row['address'];
            $orders[$cr]['amount'] = $row['amount'];
            $orders[$cr]['color'] = $color;
            $orders[$cr]['size'] = $size;
            $orders[$cr]['design_name'] = $design;
            $orders[$cr]['status'] = $row['status'];
            $orders[$cr]['reason'] = $row['reason'];
            $orders[$cr]['category'] = $row['category'];
            $orders[$cr]['date'] = $row['date'];
            $orders[$cr]['delete_ord'] = $row['delete_ord'];
            $orders[$cr]['only_date'] = $dt[0];
            $orders[$cr]['only_time'] = $dt[1];
            $cr++;
        }
    
    echo json_encode($orders);

    }else{
        http_response_code(404);
    }

?>