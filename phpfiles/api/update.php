<?php

require 'connect.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);
   // print_r($request);
    //Sanitize
    $id = $_GET['id'];
    $name=$request->name;
    $custid=$request->cust_id;
    $phone=$request->phone;
    $address=$request->address;
    $amount=$request->amount;
   $color= json_encode($request->color);
    $size= json_encode($request->size);
    $design_name= json_encode($request->design_name);
    $status=$request->status;
   print_r ($id);
     //store
          $sql = "UPDATE `orders` SET `name`='$name',`phone`='$phone', `address`='$address', `amount`='$amount', `cust_id`='$custid', `color`='$color',`size`='$size',`design_name`='$design_name' WHERE `ord_id`='{$id}'";


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
        echo "Data Success";
        http_response_code(201);
    }else{
        http_response_code(422);
    }
    
}
$con->close();

    ?>