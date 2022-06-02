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
    

    $selectCircuit = "SELECT * FROM circuito";
    $result = $connection->query($selectCircuit);
    $response = array();
    if($result->num_rows>0){
        
        //echo "Exito en select <br>";
        while($row=$result->fetch_assoc()){
            $newCircuit=new Circuit($row["ID"],$row["nombre"],$row["vueltas"]);  
            array_push($response,$newCircuit);  
  
        }


    } else {
        //echo "Error en select";
    }
    echo json_encode($response)
?>