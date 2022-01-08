<?php

require 'connect.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
 
    //Sanitize
    $id =(int) $_GET['sno'];
    $st=$postdata;
   print_r ($st);
     //store
          $sql = "
          UPDATE chqdata
SET status_reason='{$st}'
WHERE sno='{$id}';
          ";


    if(mysqli_query($con, $sql)){
        echo "Data Success";
        http_response_code(201);
    }else{
        http_response_code(422);
    }
    
}
$con->close();

    ?>