<?php

require 'connect.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);
    //Sanitize
    $name=$request->name;
    $consg=$request->consignmentnum;
    $custid=$request->cust_id;
    $phone=$request->phone;
    $address=$request->address;
    $city = $request->city_name;
    $amount=$request->amount;
    $color= json_encode($request->color);
    $size= json_encode($request->size);
    $design_name= json_encode($request->design_name);
    $catg=$request->category;
   print_r ($city);
     //store
     
     $sql = "INSERT INTO `orders`(`consignmentnum`,`city`, `cust_id`, `name`, `phone`, `address`, `amount`, `color`, `size`, `design_name`, `status`, `date`, `delete_ord`, `category`) VALUES ('{$consg}','{$city}','{$custid}','{$name}','{$phone}','{$address}', '{$amount}', '{$color}', '{$size}','{$design_name}', 'Booked', CONVERT_TZ(CURRENT_TIMESTAMP(), '+00:00','+11:00'), false, '{$catg}')";
     //echo $sql;
     
     /*$sql = "INSERT INTO `orders`(`cust_id`, `name, `phone`, `address`, `amount`, `color`, `size`, `design_name`, `status`, `date`, `delete_ord`) VALUES ('{$custid}','{$name}','{$phone}','{$address}', '{$amount}', '{$color}', '{$size}','{$design_name}', 'Booked', CONVERT_TZ(CURRENT_TIMESTAMP(), '+00:00','+5:00'), false)";*/
     
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
    if($con->query($sql) === TRUE){
        $last_id = $con->insert_id;
        $status=  [[
    "date" => date("Y-m-d H:i:s", strtotime('+5 hours')),
    "st" => "Booked",
    "reason"=>"None",
    "updated" => []
]];
        
        $status= json_encode($status);

        
        $sql2= "INSERT INTO `order_status`(`ord_id`, `status_date`) VALUES ('{$last_id}','{$status}')";
        mysqli_query($con, $sql2);
        
        /* if($con->query($sql2) === TRUE){
             echo "New record created successfully. Last inserted ID is: " . $status;
         }*/
        echo "Data Success";
        http_response_code(201);
        
    }else{
        http_response_code(422);
    }
    
}
$con->close();

    ?>