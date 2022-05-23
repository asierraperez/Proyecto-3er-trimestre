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

    /*$consult = "CREATe DATABASE basedepruebas";
    if($connection->query($consult)==TRUE){
        echo "Base de datos creada correctamente";
    } else{
        echo "Error al crear la base de datos: ".$connection->error;
    }*/

    /*$consult = "Insert into escuderia values('ALP','Alpine',0)";
    if($connection->query($consult)==TRUE){
        echo "insercion correcta";
    } else {
        echo "fallo en insercion";
    }*/

    $selection = "select * from escuderia";
    $result = $connection->query($selection);

    if($result->num_rows>0){
        echo "Exito en select <br>";
        echo "Código | Nombre | Puntos <br>";
        while($row=$result->fetch_assoc()){
            echo $row["ID"]." | " . $row["nombre"]." | " . $row["puntos"] . "<br>"; 
        }


    } else {
        echo "Error en select";
    }

?>