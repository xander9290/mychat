
<?php 
    header("Content-Type: application/json; charset=UTF-8");

    // $json=file_get_contents('php://input');
    // $file_temp=fopen('msgchat.json','w');
    // fwrite($file_temp,$json);
    // fclose($file_temp);

        $json=file_get_contents("php://input");
        //$data=json_decode($json,true);
        $filtrar=str_replace('{',',{',$json);
        //crea el archivo temporal
        $file_temp=fopen('chattemp.txt','a');
        //escribe el nuevo obj enviado desde la app
        fwrite($file_temp,$filtrar);
        //obtiene todo el contenido del archivo temporal
        // $tmp=file_get_contents('chattemp.txt');
        // //agrega comas al final de cada llave
        // $a= str_replace('}{','},{',$tmp);
        //$b='{"chat":['.$a.']}';
        fclose($file_temp);
        
        // //abre el archvivo legitimo
        // $file=fopen('chatdata.txt','w');
        // //escribe todo lo anterior con comas
        // fwrite($file,$a);
        // fclose($file);
        
?>