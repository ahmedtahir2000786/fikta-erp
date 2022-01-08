<?php

require 'connect.php';
$name = $_GET['name'];

//echo $img_name;
$sql = "DELETE FROM `chqname` WHERE `chqName_name`='{$name}'";


     if(mysqli_query($con, $sql)){
        echo "Data Success";
        http_response_code(201);
    }else{
        http_response_code(422);
    }
   


    ?>