<?php

require 'connect.php';
    $id = $_GET['id'];
    $status = $_GET['status'];
    $statusReason = $_GET['statusReason'];

    $date = $_GET['date'];
       //print_r ($date);
     //store
          $sql = "UPDATE `orders` SET `status`='$status', `date`='$date' WHERE `ord_id`='{$id}'";

    $getstatus = "SELECT `status_date` FROM `order_status` WHERE `ord_id`='{$id}'";
    $result = $con->query($getstatus);
    $c = "";
  while($row = mysqli_fetch_assoc($result)) {
    $c = $row["status_date"];
  }
  $r =
      [
      "date" => date("Y-m-d H:i:s", strtotime('+5 hours')),
      "st" => $status,
      "reason"=>$statusReason,
	"updated" => []
      ];
      
      $c = json_decode($c);
     $c[count($c)] = $r;
  //array_push($c, $r);
      $c = json_encode($c);
   $sql2 = "UPDATE `order_status` SET `status_date`='$c' WHERE `ord_id`='{$id}'";
    if(mysqli_query($con, $sql)){
       if(mysqli_query($con, $sql2)){
  
        http_response_code(201);
    }else{
        http_response_code(422);
    }
    
        http_response_code(201);
    }else{
        http_response_code(422);
    }
    

$con->close();

    ?>