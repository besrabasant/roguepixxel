<?php
// if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') { 

    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    echo true;

//     // $to = 'besrabasant@gmail.com';
//     // $subject = 'Product Enquiry' ;
//     // if($_POST['enquiry_type'] == 1){
//     //     $subject = 'Product Enquiry';
//     // }
//     // if($_POST['enquiry_type'] == 2){
//     //     $subject = 'Corporate Enquiry';
//     // }
//     // // $message = 'Name: '. $_POST['name'].'<br />';
//     // // $message .= 'Mobile Number : '. $_POST['phone_no'].'<br />';
//     // // $message .= 'Address : '. $_POST['address'].'<br />';

//     // // $mail = mail ( $to ,$subject , $message ); 
//     // // echo $mail;
// } else {
//     $url = $_SERVER['SERVER_NAME'];
//     header('Location: http://'.$url.'/roguepixxel-alphav2');
// }

?>