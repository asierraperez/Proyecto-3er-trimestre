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
    //echo "Conectado correctamente <br>";

    /**
     * Establecer base a usar
     */
    $consult = "use proyecto";
    if($connection->query($consult)==TRUE){
        //echo "Base de datos creada correctamente";
    } else{
       // echo "Error al crear la base de datos: ".$connection->error;
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
    

    $selectTeam = "SELECT * FROM escuderia;";
    $result = $connection->query($selectTeam);
    $response = array();
    if($result->num_rows>0){
        
        //echo "Exito en select <br>";
        while($row=$result->fetch_assoc()){
            $newTeam=new Team($row["ID"],$row["nombre"],$row["puntos"]);  
            array_push($response,$newTeam);  
        }


    } else {
        //echo "Error en select";
    }
    echo json_encode($response)
?>