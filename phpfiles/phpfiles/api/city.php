<?php

require 'connect.php';
$cnd = $_GET['cnd'];
$name = $_GET['name'];
$short = $_GET['short'];
$sql = "";
if($cnd=="add"){
    $sql = "INSERT INTO `citylist`(`city_name`, `city_short`) VALUES ('{$name}','{$short}')";
    
}else if($cnd=="del"){
    $sql = "DELETE FROM `citylist` WHERE (`city_name`='{$name}') AND (`city_short`='{$short}')";
}

if(mysqli_query($con, $sql)){
    echo "Data Success";
        http_response_code(201);
}else{
    http_response_code(422);
}


?>