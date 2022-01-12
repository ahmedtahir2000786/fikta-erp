<?php

require 'connect.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);
    //Sanitize
    $name=$request->p_name;
    $color=json_encode($request->p_color);
    $type=$request->p_type;
    $b_type=json_encode($request->b_type);
    $h_type=json_encode($request->h_type);
    $h_color=json_encode($request->h_color);
    $b_color=json_encode($request->b_color);
    $p_heel=json_encode($request->p_heel);
    $p_sole_type=json_encode($request->p_sole_type);
    $image_url=json_encode($request->url);
    
   print_r ($image_url);
     //store
    
     $sql="INSERT INTO `products`(`name`, `type`, `pic_url`, `color`, `sole_type`, `h_type`, `h_color`, `b_type`, `b_color`, `p_heel`) VALUES ('{$name}','{$type}','{$image_url}','{$color}','{$p_sole_type}','{$h_type}','{$h_color}','{$b_type}','{$b_color}','{$p_heel}'  )";

     /*$sql = "INSERT INTO orders(
        name,
        cust_id,
        address, 
        phone, 
        amount, 
        color, 
        size, 
        design_name,
        status)
        VALUES(
            '{$name}',
            '{$custid}',
            '{$phone}',
            '{$amount}', 
            '{$color}',
            '{$size}',
            '{$design_name}',
            'Booked'

            )
    
    ";*/
    if(mysqli_query($con, $sql)){
        echo ("Data Success");
        http_response_code(201);
    }else{
        http_response_code(422);
    }
    
}
$con->close();

    ?>