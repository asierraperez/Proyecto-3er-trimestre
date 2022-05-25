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
     * Objeto Driver para almacenar temporalmente los datos
     */
    class Driver{
        public $code;
        public $name;
        public $surname;
        public $dexterity;       
        public $luck;
        public $points;
        public $teamID;        
        function __construct($code,$name,$surname,$dexterity,$luck,$points,$teamID){
            $this->code=$code;
            $this->name=$name;
            $this->surname=$surname;
            $this->dexterity=$dexterity;
            $this->luck=$luck;
            $this->points=$points;
            $this->teamID=$teamID;
            
        }
    }
    

    $selectDriver = "SELECT * FROM piloto";
    $result = $connection->query($selectDriver);
    $response = array();
    if($result->num_rows>0){
        
        //echo "Exito en select <br>";
        while($row=$result->fetch_assoc()){
            $newDriver= new Driver($row["ID"],$row["nombre"],$row["apellidos"],$row["destreza"],
            $row["suerte"],$row["puntos"],$row["ID_escuderia"]);
                array_push($response,$newDriver);  
  
        }


    } else {
        //echo "Error en select";
    }
    echo json_encode($response)
?>