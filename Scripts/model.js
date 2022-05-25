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



        //if (localStorage.getItem("teamsAdded") != 1) {
        /**
        * Número maximo de equipos
        */
        this.nMaxTeams = this.teams[0].maxTeams()
        //Elimino el valor que inicialice en la declaración
        this.teams.pop()

        for (this.nTeam; this.nTeam < this.nMaxTeams; this.nTeam++) {
            this.addTeam()
        }

        localStorage.setItem("teams", JSON.stringify(this.teams))
        // } else {
        // this.teams = localStorage.getItem("teams")
        console.log(this.teams)
        //this.teams = JSON.parse(this.teams)
        //}


        //if (localStorage.getItem("driversAdded") != 1) {
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
        // }

        // if (localStorage.getItem("circuitsAdded") != 1) {
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
        //}

        //if (localStorage.getItem("carsAdded") != 1) {
        /**
     * Número máximo de coches
     */
        this.nMaxCars = this.nMaxTeams
        for (this.nCar; this.nCar < this.nMaxCars; this.nCar++) {
            this.addCar()
        }
        console.log(this.cars)
        //}


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
        localStorage.setItem("teamsAdded", 1)
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
        localStorage.setItem("circuitsAdded", 1)
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
        newDriver.setTeamName = null
        newDriver.setPoints = 0
        newDriver.uploadDriverToDB()
        this.drivers.push(newDriver)
        localStorage.setItem("driversAdded", 1)
    }
    /**
     * Añadir Coche
     */
    addCar() {
        const newCar = new Car()
        newCar.setAttributes()
        newCar.setCode = this.teams[this.nCar].getCode;
        newCar.setTeamName = this.teams[this.nCar].getCode;
        newCar.uploadCarToDB();
        this.cars.push(newCar)
        localStorage.setItem("carsAdded", 1)
    }
    /**
     * Reparto a los pilotos entre todas las escuderías al azar
     */
    assignDriversToTeams() {
        /**
         * Control de los pilotos ya asignados
         */
        var auxDrivers = []
        /**
         * número de piloto a asignar,
         * inicializado a 0 para tener un valor
         */
        var nDriver = 0
        //Recorro el array de escuderías
        for (let i = 0; i < this.teams.length; i++) {
            //Cada una tiene 2 pilotos
            for (let j = 0; j < 2; j++) {
                do {
                    //asigno el piloto al azar, número de [0-20]
                    nDriver = this.randomNumber(this.drivers.length, 0)
                    //compruebo si ya salió o no
                    var check = this.checkDriver(nDriver, auxDrivers)
                } while (check)

                this.drivers[nDriver].setTeamName = this.teams[i].getCode
                auxDrivers[0] = nDriver
                auxDrivers.push(nDriver)
            }
        }


    }
    /**
     * Comprobación de si el piloto esta asignado a un equipo o no
     * @param {number} driverNumber - número del piloto
     * @param {Array} driversAssigned - array con los numeros de pilotos asignados
     * @returns {boolean}
     */
    checkDriver(driverNumber, driversAssigned) {
        for (let k = 0; k < driversAssigned.length; k++) {
            if (driversAssigned[k] == driverNumber) {
                var auxCheck = true
            }
        }
        if (auxCheck) {
            return true
        } else {
            return false
        }

    }

    /**
     * Devuelve un número aleatorio
     * @param {number} maxValue - valor máximo
     * @param {number} minValue - valor mínimo
     * @returns {number}
     */
    randomNumber(maxValue, minValue) {
        return Math.floor(Math.random() * (maxValue - minValue) + minValue)
    }
}
