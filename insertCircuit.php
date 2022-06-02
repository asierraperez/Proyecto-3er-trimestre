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
     * Objeto Circuit para almacenar temporalmente los datos
     */
    class Circuit{
        public $code;
        public $name;
        public $laps;
        function __construct($code,$name,$laps){
            $this->code=$code;
            $this->name=$name;
            $this->laps=$laps;
        }
    }
    //Inicializo la variable 'newCircuito' con los datos recibidos desde js
    $newCircuit= new Circuit($_POST["code"],$_POST["name"],$_POST["laps"]);
    $newCircuit->laps=(int)$newCircuit->laps;
    echo json_encode($newCircuit);
    //los inserto en la BD
    $consultCircuit = "INSERT INTO circuito VALUES('$newCircuit->code', '$newCircuit->name', $newCircuit->laps);";
    if($connection->query($consultCircuit)==TRUE){
        echo "insercion correcta";
    } else {
        echo "fallo en insercion";
    }
   
?>