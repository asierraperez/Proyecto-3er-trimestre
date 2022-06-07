<?php

    /**
     * Conexion a base de datos
     */
    $serverName = "localhost";
    $user = "root";
    $pass = "";
    $dataBase = "proyecto";

    $connection = new mysqli($serverName, $user, $pass, $dataBase);
    if($connection->connect_error){
        die("Conexión fallida: ".$connection->connect_error);
    }
    echo "Conectado correctamente <br>";

    /**
     * Establecer base a usar
     */
    $consult = "use proyecto";
    if($connection->query($consult)==TRUE){
        echo "Base de datos creada correctamente";
    } else{
        echo "Error al crear la base de datos: ".$connection->error;
    }
    
    //Variables para almacenar los datos de los puntos
    $points = $_POST["points"];
    $code=$_POST["id"];
    $consultPoints="UPDATE escuderia SET puntos=$points WHERE ID ='$code';";
    
    if($connection->query($consultPoints)==TRUE){
        echo "insercion correcta";
        //echo json_encode($newDriver);
    } else {
        echo "fallo en insercion";
    }

?>