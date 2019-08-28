<?php
    $json=file_get_contents('php://input');
    $file=fopen('users.json','w');
    fwrite($file,$json);
    fclose($file);

    // $tmp=file_get_contents('listauserstemp.txt');
    // $a= str_replace('}{','},{',$tmp);
    // $file=fopen('listausers.txt','w');
    // fwrite($file,$a);
    // fclose($file);
