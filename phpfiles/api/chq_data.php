<?php

require 'connect.php';
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){
   
    $request = json_decode($postdata);

    
    //Sanitize
    $name=$request->name;
    $consg=$request->consignmentnum;
    $status = $request->status;
    $sub_status = $request->sub_status;
    $reason = $request->reason;

   

     //store
     
    //$sql = "INSERT INTO `chqdata`(`name`, `consignmentnum`, `status`, `sub_status`, `status_reason`, `date`) VALUES ('{$name}','{$consg}', '{$status}', '{$sub_status}', '{$reason}', CONVERT_TZ(CURRENT_TIMESTAMP(), '+00:00','+5:00'))";
    $sql = "INSERT INTO `chqdata`(`name`, `consignmentnum`, `status`, `sub_status`, `status_reason`, `date`) VALUES ('{$name}','{$consg}', '{$status}', '{$sub_status}', '{$reason}', CURRENT_TIMESTAMP())";
     
    
    if($con->query($sql) === TRUE){
      
        echo "Data Success";
        http_response_code(201);
        
    }else{
        http_response_code(422);
    }
    
}
$con->close();

    ?>