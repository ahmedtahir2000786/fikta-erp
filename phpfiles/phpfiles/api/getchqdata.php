<?php
require 'connect.php';
$date = $_GET['date'];
$fdate = $_GET['fromDate'];
$txt = $_GET['chqname'];
$st = $_GET['cat'];

    $orders=[];
    $sql="";
    if($txt=="all" and $st=="all"){
    $sql = "SELECT * FROM chqdata WHERE `date` BETWEEN '$fdate 00:00:00' AND '$date 23:59:59'";
    }elseif($txt!="all" and $st=="all"){
         $sql = "SELECT * FROM chqdata WHERE (name LIKE '%{$txt}%') AND `date` BETWEEN '$fdate 00:00:00' AND '$date 23:59:59'";
    }elseif($txt!="all" and $st!="all"){
         $sql = "SELECT * FROM chqdata WHERE (name LIKE '%{$txt}%') AND (sub_status LIKE '%{$st}%') AND `date` BETWEEN '$fdate 00:00:00' AND '$date 23:59:59'";
    }elseif($txt=="all" and $st!="all"){
         $sql = "SELECT * FROM chqdata WHERE (sub_status LIKE '%{$st}%') AND `date` BETWEEN '$fdate 00:00:00' AND '$date 23:59:59'";
    }
    if($result = mysqli_query($con, $sql)){
        $cr=0;
        while($row=mysqli_fetch_assoc($result)){
            $dt = explode(" ", $row['date']);
            $orders[$cr]['sub_status'] = $row['sub_status'];
            $orders[$cr]['sno'] = $row['sno'];
            $orders[$cr]['name'] = $row['name'];
            $orders[$cr]['consignmentnum'] = $row['consignmentnum'];
            $orders[$cr]['status'] = $row['status'];
            $orders[$cr]['status_reason'] = $row['status_reason'];
            $orders[$cr]['date'] = $row['date'];
            $orders[$cr]['only_date'] = $dt[0];
            $orders[$cr]['only_time'] = $dt[1];
            $orders[$cr]['resolved'] = $row["resolved"];
            $cr++;
        }
    
    echo json_encode($orders);

    }else{
        http_response_code(404);
    }

?>

