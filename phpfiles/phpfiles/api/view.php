<?php
require 'connect.php';
echo "Hello"
/*$date = $_GET['date'];
$fdate = $_GET['fdate'];
$checklist = $_GET['checklist'];
  $orders=[];
    $sql="";
$catselected = $_GET['catselected'];
echo json_decode($checklist);*/
/*
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);
if(count($request) == 6){
     if($catselected=="all"){
    $sql = "SELECT * FROM orders WHERE `date` BETWEEN '$fdate 00:00:00' AND '$date 23:59:59' ";
        }else{
             $sql = "SELECT * FROM orders WHERE `category`='{$catselected}' AND `date` BETWEEN '$fdate 00:00:00' AND '$date 23:59:59' ";
        };
}else if(count($request) == 5){
    if($catselected=="all"){
    $sql = "SELECT * FROM orders WHERE ((status='{$request[0]}') || (status='{$request[1]}') || (status='{$request[2]}') || (status='{$request[3]}') || (status='{$request[4]}')) AND `date` BETWEEN '$fdate 00:00:00' AND '$date 23:59:59' ";
        }else{
              $sql = "SELECT * FROM orders WHERE `category`='{$catselected}' AND ((status='{$request[0]}') || (status='{$request[1]}') || (status='{$request[2]}') || (status='{$request[3]}') || (status='{$request[4]}')) AND `date` BETWEEN '$fdate 00:00:00' AND '$date 23:59:59' ";
        }
    
}else if(count($request) == 4){
    if($catselected=="all"){
    $sql = "SELECT * FROM orders WHERE ((status='{$request[0]}') || (status='{$request[1]}') || (status='{$request[2]}') || (status='{$request[3]}') ) AND `date` BETWEEN '$fdate 00:00:00' AND '$date 23:59:59' ";
        }else{
              $sql = "SELECT * FROM orders WHERE `category`='{$catselected}' AND ((status='{$request[0]}') || (status='{$request[1]}') || (status='{$request[2]}') || (status='{$request[3]}')) AND `date` BETWEEN '$fdate 00:00:00' AND '$date 23:59:59' ";
        }
    
}else if(count($request) == 3){
     if($catselected=="all"){
    $sql = "SELECT * FROM orders WHERE ((status='{$request[0]}') || (status='{$request[1]}') || (status='{$request[2]}') ) AND `date` BETWEEN '$fdate 00:00:00' AND '$date 23:59:59' ";
        }else{
              $sql = "SELECT * FROM orders WHERE `category`='{$catselected}' AND ((status='{$request[0]}') || (status='{$request[1]}') || (status='{$request[2]}') ) AND `date` BETWEEN '$fdate 00:00:00' AND '$date 23:59:59' ";
        }
    
}else if(count($request) == 2){
    if($catselected=="all"){
    $sql = "SELECT * FROM orders WHERE ((status='{$request[0]}') || (status='{$request[1]}') ) AND `date` BETWEEN '$fdate 00:00:00' AND '$date 23:59:59' ";
        }else{
              $sql = "SELECT * FROM orders WHERE `category`='{$catselected}' AND ((status='{$request[0]}') || (status='{$request[1]}')) AND `date` BETWEEN '$fdate 00:00:00' AND '$date 23:59:59' ";
        }
    
}else if(count($request) == 1){
     if($catselected=="all"){
    $sql = "SELECT * FROM orders WHERE (status='{$request[0]}')  AND `date` BETWEEN '$fdate 00:00:00' AND '$date 23:59:59' ";
        }else{
              $sql = "SELECT * FROM orders WHERE `category`='{$catselected}' AND (status='{$request[0]}') AND `date` BETWEEN '$fdate 00:00:00' AND '$date 23:59:59' ";
        }
    
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
            $orders[$cr]['date'] = $row['date'];
            $orders[$cr]['delete_ord'] = $row['delete_ord'];
            $orders[$cr]['only_date'] = $dt[0];
            $orders[$cr]['only_time'] = $dt[1];
            $cr++;
        }
    
    echo json_encode($orders);
    */
    }

    }else{
        http_response_code(404);
    }
?>