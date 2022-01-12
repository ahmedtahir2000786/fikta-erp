<?php

require 'connect.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    //Sanitize
    $chqName=$postdata;
    
     //store
     
     $sql = "INSERT INTO `chqname`(`chqName_name`) VALUES ('{$chqName}')";
     
    if($con->query($sql) === TRUE){
       

        echo "Data Success";
        http_response_code(201);
        
    }else{
        http_response_code(422);
    }
    
}
$con->close();

    ?>