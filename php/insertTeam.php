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
     * Objeto Team para almacenar temporalmente los datos
     */
    class Team{
        public $code;
        public $name;
        public $points;
        function __construct($code,$name,$points){
            $this->code=$code;
            $this->name=$name;
            $this->points=$points;
        }
    }
    //Inicializo la variable 'newTeam' con los datos recibidos desde js
    $newTeam= new Team($_POST["code"],$_POST["name"],$_POST["points"]);
    $newTeam->points=(int)$newTeam->points;
    echo json_encode($newTeam);
    //los inserto en la BD
    $consultTeam = "INSERT INTO escuderia VALUES('$newTeam->code', '$newTeam->name', $newTeam->points);";
    if($connection->query($consultTeam)==TRUE){
        echo "insercion correcta";
    } else {
        echo "fallo en insercion";
    }
   
?>