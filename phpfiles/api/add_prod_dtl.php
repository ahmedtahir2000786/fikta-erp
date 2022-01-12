<?php
require 'connect.php';
$type = $_GET['type'];
$data = $_GET['data'];
$process = $_GET['process'];

if($process=="add"){
    $sql = "INSERT INTO `add_prod_dtl`(`type`, `data`) VALUES ('{$type}','{$data}')";
}else if($process=="delete"){
    $sql = "DELETE FROM `add_prod_dtl` WHERE (`type`='{$type}') AND (`data`='{$data}')";
}



    if($result = mysqli_query($con, $sql)){
     http_response_code(200);


    }else{
        http_response_code(404);
    }

?>

