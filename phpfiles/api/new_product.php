<?php
// Allow from any origin
 header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
       
    
$upload_dir =  __DIR__."/../../products/";
$server_url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$response=[];
if($_FILES['avatar'])
{
    
    $temp = $_FILES["avatar"]["name"];
    $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
    $avatar_name = trim(preg_replace('/\s\s+/', '-', $temp));
    $error = $_FILES["avatar"]["error"];
    
    if($error > 0){
        $response[0] = "error";
        $response[1] = true;
        $response[2] = "Error uploading the file!";
        
        
    }else 
    {
        $random_name = rand(1000,1000000)."-".$avatar_name;
        $upload_name = $upload_dir.strtolower($random_name);
        $upload_name = preg_replace('/\s+/', '-', $upload_name);
        $check = preg_replace('/\s+/', '-', $random_name);
        $url="https://meatncuts.com.pk/products/".strtolower($check);
    
        if(move_uploaded_file($avatar_tmp_name, $upload_name)) {
            $response[0] = "success";
        $response[1] = false;
        $response[2] = "File uploaded successfully";
        $response[3] = $url;
        $response[4] = $check;
            
        }else
        {
            
            $response[0] = "error";
        $response[1] = true;
        $response[2] = "Error uploading the file!";
        }
    }    

}else{
     $response[0] = "error";
        $response[1] = true;
        $response[2] = "No file was sent!";
}

echo json_encode($response);
?>
