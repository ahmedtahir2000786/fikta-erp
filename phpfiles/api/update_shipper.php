<?php

require 'connect.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);
   
    //Sanitize
    $id = 1;
    $name=$request->name;
    $email=$request->email;
    $phone=$request->phone;
    $address=$request->address;
    $city=$request->city;
    $city_short=$request->city_short;
    
     //store
          $sql = "UPDATE `shipper_detail` SET `name`='$name',`phone`='$phone', `address`='$address', `city`='$city', `email`='$email', `city_short`='$city_short' WHERE `sno`=1";


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