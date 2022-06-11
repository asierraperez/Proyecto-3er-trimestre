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
    class Car{
        public $code;
        public $velocity;
        public $handling;
        public $teamName;
        function __construct($code,$velocity,$handling,$teamName){
            $this->code=$code;
            $this->velocity=$velocity;
            $this->handling=$handling;           
            $this->teamName=$teamName;
            
        }
    }
    

    $selectCar = "SELECT * FROM coche";
    $result = $connection->query($selectCar);
    $response = array();
    if($result->num_rows>0){
        
        //echo "Exito en select <br>";
        while($row=$result->fetch_assoc()){
            $newCar=new Car($row["ID"],$row["velocidad"],$row["manejo"],$row["ID_escuderia"]);  
            array_push($response,$newCar);  
  
        }


    } else {
        //echo "Error en select";
    }
    echo json_encode($response);
?>