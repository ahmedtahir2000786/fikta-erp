<?php
require 'connect.php';

    $orders=[];
    $sql = "SELECT * FROM add_prod_dtl";
    if($result = mysqli_query($con, $sql)){
        $cr=0;
        while($row=mysqli_fetch_assoc($result)){
            $orders[$cr]['type'] = $row['type'];
            $orders[$cr]['data'] = $row['data'];
            $cr++;
        }
    
    echo json_encode($orders);

    }else{
        http_response_code(404);
    }

?>