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
    //Inicializo la variable 'newDriver' con los datos recibidos desde js
    $newDriver= new Driver($_POST["code"],$_POST["name"],$_POST["surname"],$_POST["dexterity"],
        $_POST["luck"],$_POST["points"],$_POST["teamID"]);
    $newDriver->points=(int)$newDriver->points;
    $newDriver->dexterity=(int)$newDriver->dexterity;
    $newDriver->luck=(int)$newDriver->luck;    
    //los inserto en la BD
    $consultDriver = "INSERT INTO piloto VALUES('$newDriver->code', '$newDriver->name', '$newDriver->surname',
        $newDriver->dexterity, $newDriver->luck, $newDriver->points, '$newDriver->teamID');";
    if($connection->query($consultDriver)==TRUE){
        echo "insercion correcta";
        echo json_encode($newDriver);
    } else {
        echo "fallo en insercion";
    }
   
?>