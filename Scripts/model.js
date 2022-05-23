/**
 * Clase Modelo
 */
class Model {
    constructor() {
        this.uploadTeam = new Team()
        this.uploadCircuit = new Circuit()
        /**
         * Array con los datos de los pilotos
         * Inicializo uno para poder acceder a sus funciones
         * @type {Array}
         */
        this.drivers = [new Driver()]
        /**
         * Datos de las escuderías
         * Inicializo uno para poder acceder a sus funciones
         * @type {Array}
         */
        this.teams = []
        /**
         * Datos de los circuitos
         * Inicializo uno para poder acceder a sus funciones
         * @type {Array}
         */
        this.circuits = [new Circuit()]
        /**
         * Datos de los coches
         * @type {Array}
         */
        this.cars = []

        /**
         * Numero de conductores; Parametro para el for
         */
        this.nDriver = 0
        /**
         * Número de escuderías; Parametro para el for
         */
        this.nTeam = 0
        /**
         * Número de circuitos; Parametro para el for
         */
        this.nCircuit = 0
        /**
         * Número de coches; Parametro para el for
         */
        this.nCar = 0
        //this.teamDBUploaded = localStorage.getItem("teamDBUploaded")
        if (this.teamDBUploaded != "true") {
            this.teamsToDB()

        }
        for (this.nTeam; this.nTeam < 10; this.nTeam++) {
            this.addTeam()
        }
        console.log(this.teams)


        /**
         * Número máximo de pilotos
         */
        //this.nMaxDrivers = this.drivers[0].maxDrivers()
        //Elimino el valor que inicialice en la declaración
        /*this.drivers.pop()

        for (this.nDriver; this.nDriver < this.nMaxDrivers; this.nDriver++) {
            this.addDriver()
        }
        console.log(this.drivers)

        /**
         * Número máximo de circuitos
         */
        this.circuitsToDB()
        for (let i = 0; i < 22; i++) {
            this.addCircuit()
        }
        console.log(this.circuits)
        //this.nMaxCircuits = this.circuits[0].maxCircuits()
        //Elimino el valor que inicialice en la declaración
        /*this.circuits.pop()

        for (this.nCircuit; this.nCircuit < this.nMaxCircuits; this.nCircuit++) {
            this.addCircuit()
        }
        console.log(this.circuits)

        /**
         * Número máximo de coches
         */
        /*this.nMaxCars = this.nMaxTeams
        for (this.nCar; this.nCar < this.nMaxCars; this.nCar++) {
            this.addCar()
        }
        console.log(this.cars)
*/


    }
    teamsToDB() {
        this.uploadTeam.maxTeams()
        for (let i = 0; i < this.uploadTeam.getNMaxTeams; i++) {
            this.uploadTeam.getFromAPI(i)
            this.uploadTeam.setPoints = 0;
            this.uploadTeam.uploadTeamToDB()

        }

        localStorage.setItem("teamDBUploaded", true)
    }
    /**
     * Añadir escudería
     */
    addTeam() {
        const newTeam = new Team()
        newTeam.assignNameCodeDB()
        this.teams.push(newTeam)
    }

    circuitsToDB() {
        this.uploadCircuit.maxCircuits()
        for (let i = 0; i < this.uploadCircuit.getNMaxCircuits; i++) {
            this.uploadCircuit.getFromApi(i)
            this.uploadCircuit.setLaps = 0
            this.uploadCircuit.uploadCircuitToDB()
        }
    }
    /**
    * Añadir circuitos
    */
    addCircuit() {
        const newCircuit = new Circuit()
        newCircuit.assignNameCode(this.nCircuit)
        newCircuit.assignLaps()
        newCircuit.uploadCircuitToDB()
        this.circuits.push(newCircuit)
    }
    /**
     * Añadir piloto
     *//*
addDriver() {
const newDriver = new Driver()
newDriver.setAttributes()
newDriver.assignName(this.nDriver)
newDriver.assignCode(this.nDriver)
newDriver.assignSurname(this.nDriver)
newDriver.setTeamName = ""
newDriver.setPoints = 0
this.drivers.push(newDriver)
}
/**
* Añadir Coche
*//*
                                                                                                                                        addCar() {
                                                                                                                                            const newCar = new Car()
                                                                                                                                            newCar.setAttributes()
                                                                                                                                            newCar.setName = "Coche de " + this.teams[this.nCar].getName
                                                                                                                                            newCar.setCode = "Car_" + this.teams[this.nCar].getCode
                                                                                                                                            newCar.setteamName = this.teams[this.nCar].getCode
                                                                                                                                            this.cars.push(newCar)
                                                                                                                                        }
                                                                                                                                        /**
                                                                                                                                         * Actualizar base de datos de equipos
                                                                                                                                         * @param {Object} team - datos de la escudería
                                                                                                                                         * @returns {Boolean}
                                                                                                                                         *//*
uploadTeamToDB(team) {
$.ajax({
data: {
"name": team.getName,
"code": team.getCode,
"points": team.getPoints
},
url: "insertTeam.php",
type: "POST",
success: function (response) {
console.log(response)
}
})
}*/
}