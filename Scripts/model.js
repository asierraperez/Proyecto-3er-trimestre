/**
 * Clase Modelo
 */
class Model {
    constructor() {
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
        this.teams = [new Team()]
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

        /**
         * Número maximo de equipos
         */
        this.nMaxTeams = this.teams[0].maxTeams()
        //Elimino el valor que inicialice en la declaración
        this.teams.pop()

        for (this.nTeam; this.nTeam < this.nMaxTeams; this.nTeam++) {
            this.addTeam()
        }
        console.log(this.teams)


        /**
         * Número máximo de pilotos
         */
        this.nMaxDrivers = this.drivers[0].maxDrivers()
        //Elimino el valor que inicialice en la declaración
        this.drivers.pop()

        for (this.nDriver; this.nDriver < this.nMaxDrivers; this.nDriver++) {
            this.addDriver()
        }
        console.log(this.drivers)

        /**
         * Número máximo de circuitos
         */
        this.nMaxCircuits = this.circuits[0].maxCircuits()
        //Elimino el valor que inicialice en la declaración
        this.circuits.pop()

        for (this.nCircuit; this.nCircuit < this.nMaxCircuits; this.nCircuit++) {
            this.addCircuit()
        }
        console.log(this.circuits)

        /**
         * Número máximo de coches
         */
        this.nMaxCars = this.nMaxTeams
        for (this.nCar; this.nCar < this.nMaxCars; this.nCar++) {
            this.addCar()
        }
        console.log(this.cars)



    }
    /**
     * Añadir escudería
     */
    addTeam() {
        const newTeam = new Team()
        newTeam.assignName(this.nTeam)
        newTeam.assignCode(this.nTeam)
        newTeam.setPoints = 0
        newTeam.uploadTeamToDB()

        this.teams.push(newTeam)
        //console.log(this.teams)
        //this.nTeam++
    }
    /**
     * Añadir circuitos
     */
    addCircuit() {
        const newCircuit = new Circuit()
        newCircuit.assignName(this.nCircuit)
        newCircuit.assignCode(this.nCircuit)
        newCircuit.assignLaps()
        newCircuit.uploadCircuitToDB()
        this.circuits.push(newCircuit)
    }
    /**
     * Añadir piloto
     */
    addDriver() {
        const newDriver = new Driver()
        newDriver.setAttributes()
        newDriver.assignName(this.nDriver)
        newDriver.assignCode(this.nDriver)
        newDriver.assignSurname(this.nDriver)
        newDriver.setTeamName = this.teams[0].code
        newDriver.setPoints = 0
        newDriver.uploadDriverToDB()
        this.drivers.push(newDriver)
    }
    /**
     * Añadir Coche
     */
    addCar() {
        const newCar = new Car()
        newCar.setAttributes()
        newCar.setCode = "Car_" + this.teams[this.nCar].getCode;
        newCar.setTeamName = this.teams[this.nCar].getCode;
        newCar.uploadCarToDB();
        this.cars.push(newCar)
    }

}