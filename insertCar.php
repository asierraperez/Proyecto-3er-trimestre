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
    
    /**
     * Objeto Car para almacenar temporalmente los datos
     */
    class Car{
        public $code;
        public $velocity;
        public $handling;
        public $teamID;
        function __construct($code,$velocity,$handling,$teamID){
            $this->code=$code;
            $this->velocity=$velocity;
            $this->handling=$handling;
            $this->teamID=$teamID;
        }
    }
    //Inicializo la variable 'newCar' con los datos recibidos desde js
    $newCar= new Car($_POST["code"],$_POST["velocity"],$_POST["handling"],$_POST["teamID"]);
    $newCar->velocity=(int)$newCar->velocity;
    $newCar->handling=(int)$newCar->handling;
    echo json_encode($newCar);
    //los inserto en la BD
    $consultCar = "INSERT INTO coche VALUES('$newCar->code', $newCar->velocity, $newCar->handling, '$newCar->teamID');";
    if($connection->query($consultCar)==TRUE){
        echo "insercion correcta";
    } else {
        echo "fallo en insercion";
    }
   
?>