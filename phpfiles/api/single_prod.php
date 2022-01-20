<?php
require 'connect.php';
$date = $_GET['date'];
$fdate = $_GET['fromDate'];
$txt = $_GET['prod'];
$cnd = $_GET['getProducts'];
$orders=[];
$sql ="";
    if($cnd=="single"){
        $postdata = file_get_contents("php://input");
        $req = json_decode($postdata);
        $c = "";
        for ($x = 0; $x < count($req); $x++) {
            if($x==0){
            $c="(design_name LIKE '%$req[0]%')";
            }else{
                $c = $c."OR (design_name LIKE '%$req[$x]%')";
            }
        }
        $sql = "SELECT * FROM orders WHERE delete_ord != '1' AND (`date` BETWEEN '$fdate 00:00:00' AND '$date 23:59:59')";
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
    
    }else if($cnd == "type"){
        $sql = "SELECT * FROM products WHERE (type = '{$txt}') ";
    if($result = mysqli_query($con, $sql)){
        $cr=0;
        while($row=mysqli_fetch_assoc($result)){
           
            $color = json_decode($row['color']);
            $p_url = json_decode($row['pic_url']);
            $sole_type = json_decode($row['sole_type']);
            $orders[$cr]['name'] = $row['name'];
            $orders[$cr]['type'] = $row['type'];
            $orders[$cr]['b_color'] = json_decode($row['b_color']);
            $orders[$cr]['b_type'] = json_decode($row['b_type']);
            $orders[$cr]['h_type'] = json_decode($row['h_type']);
            $orders[$cr]['h_color'] = json_decode($row['h_color']);
            $orders[$cr]['p_heel'] = json_decode($row['p_heel']);
            $orders[$cr]['color'] = $color;
            $orders[$cr]['pic_url'] = $p_url;
            $orders[$cr]['sole_type'] = $sole_type;
            
            $cr++;
        }
    
    echo json_encode($orders);

    }else{
        http_response_code(404);
    }
    }

?>

