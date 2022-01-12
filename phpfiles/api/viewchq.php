<?php
require 'connect.php';

    $orders=[];
    $sql = "SELECT `chqName_name` FROM `chqname`";
    if($result = mysqli_query($con, $sql)){
        $cr=0;
        while($row=mysqli_fetch_assoc($result)){
            $orders[$cr] = $row['chqName_name'];

            $cr++;
        }
    
    echo json_encode($orders);

    }else{
        http_response_code(404);
    }

?>