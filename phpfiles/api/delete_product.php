<?php

require 'connect.php';
$name = $_GET['name'];
$img_name = json_decode(file_get_contents("php://input"));
$upload_dir =  "../products/";
for ($x = 0; $x < count($img_name); $x++) {
  $file_path = $upload_dir.$img_name[$x];
echo $file_path;
if (file_exists($file_path)) 
               {
                 unlink($file_path);
                  echo "File Successfully Delete."; 
              }
              else
              {
               echo "File does not exists"; 
              }
}

//echo $img_name;

$sql = "DELETE FROM `products` WHERE `name`='{$name}'";


     if(mysqli_query($con, $sql)){
        echo "Data Success";
        http_response_code(201);
    }else{
        http_response_code(422);
    }
    
   


    ?>