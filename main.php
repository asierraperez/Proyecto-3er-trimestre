<?php
    $serverName = "localhost";
    $user = "root";
    $pass = "";
    $dataBase = "proyecto";

    $connection = new mysqli($serverName, $user, $pass, $dataBase);
    if($connection->connect_error){
        die("Conexión fallida: ".$connection->connect_error);
    }
    echo "Conectado correctamente <br>";

    $consult = "CREATe DATABASE basedepruebas";
    if($connection->query($consult)==TRUE){
        echo "Base de datos creada correctamente";
    } else{
        echo "Error al crear la base de datos: ".$connection->error;
    }

?>