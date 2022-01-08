<?php
    require 'connect.php';
    $id = $_GET['id'];
    $sql = "SELECT * FROM `orders` WHERE `ord_id`='{$id}' LIMIT 1";
    $orders=[];
    if($result = mysqli_query($con, $sql)){
        $cr=0;
        while($row=mysqli_fetch_assoc($result)){
            $dt = explode(" ", $row['date']);
            $color = json_decode($row['color']);
            $size = json_decode($row['size']);
            $design = json_decode($row['design_name']);
            $orders['consignmentnum'] = $row['consignmentnum'];
            $orders['cust_id'] = $row['cust_id'];
            $orders['name'] = $row['name'];
            $orders['phone'] = $row['phone'];
            $orders['address'] = $row['address'];
            $orders['amount'] = $row['amount'];
            $orders['color'] = $color;
            $orders['size'] = $size;
            $orders['design_name'] = $design;
            $orders['status'] = $row['status'];
            $orders['reason'] = $row['reason'];
            $orders['date'] = $row['date'];
            $orders['delete_ord'] = $row['delete_ord'];
            $orders['only_date'] = $dt[0];
            $orders['only_time'] = $dt[1];
            $cr++;
        }
    
    echo json_encode($orders);
    }

?>