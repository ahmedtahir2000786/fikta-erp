<?php
require 'connect.php';

    $prods=[];
    $sql = "SELECT * FROM products";
    if($result = mysqli_query($con, $sql)){
        $cr=0;
        while($row=mysqli_fetch_assoc($result)){
            $prods[$cr]['pic_url'] = json_decode($row['pic_url']);
            $prods[$cr]['name'] = $row['name'];
            $prods[$cr]['color'] = json_decode($row['color']);
            $prods[$cr]['sole_type'] = json_decode($row['sole_type']);
             $prods[$cr]['b_color'] = json_decode($row['b_color']);
            $prods[$cr]['b_type'] = json_decode($row['b_type']);
            $prods[$cr]['h_type'] = json_decode($row['h_type']);
            $prods[$cr]['h_color'] = json_decode($row['h_color']);
            $prods[$cr]['p_heel'] = json_decode($row['p_heel']);
            $prods[$cr]['type'] = $row['type'];
            

            $cr++;
        }
    
    echo json_encode($prods);

    }else{
        http_response_code(404);
    }

?>