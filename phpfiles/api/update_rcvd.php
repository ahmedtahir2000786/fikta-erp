<?php

require 'connect.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
   // print_r($request);
    //Sanitize
    $id = $_GET['id'];
    $date = $_GET['date'];
    $change = $_GET['change'];
 
   $sql="";
   if($change == "replacement"){
     //store
          $sql = "UPDATE `orders` SET `replacementRcvd`='$postdata', `date`='$date' WHERE `ord_id`='{$id}'";
   }else{
       $sql = "UPDATE `orders` SET `returnRcvd`='$postdata', `date`='$date' WHERE `ord_id`='{$id}'";
   }



    if(mysqli_query($con, $sql)){
        echo "Data Success";
        http_response_code(201);
    }else{
        http_response_code(422);
    }
    
}
$con->close();

    ?>