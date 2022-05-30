/**
 * Clase Modelo
 */
class Model {
    constructor() {


        //----------------------------------------------------------------------
        //---------------------DECLARACIÓN DE VARIABLES-------------------------
        //----------------------------------------------------------------------


        this.preload = new Preload()
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
         * Datos de los usuarios
         * @type {Array}
         */
        this.users = []

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


        //----------------------------------------------------------------------
        //------------------------LLAMADAS A FUNCIONES--------------------------
        //----------------------------------------------------------------------


        if (this.preload.driversAdded != 1) {
            /**
            * Número maximo de equipos
            */
            this.nMaxTeams = this.teams[0].maxTeams()
            //Elimino el valor que inicialice en la declaración
            this.teams.pop()

            for (this.nTeam; this.nTeam < this.nMaxTeams; this.nTeam++) {
                this.addTeam()
            }
            localStorage.setItem("teamsAdded", 1)

        } else {
            this.teams = this.preload.preloadTeam
        }


        if (this.preload.driversAdded != 1) {
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

        } else {
            this.drivers = this.preload.preloadDrivers
        }

        if (this.preload.circuitsAdded != 1) {
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
            localStorage.setItem("circuitsAdded", 1)

        } else {
            this.circuits = this.preload.preloadCircuits
        }

        if (localStorage.getItem("carsAdded") != 1) {
            /**
            * Número máximo de coches
            */
            this.nMaxCars = this.nMaxTeams
            for (this.nCar; this.nCar < this.nMaxCars; this.nCar++) {
                this.addCar()
            }
            console.log(this.cars)
            localStorage.setItem("carsAdded", 1)
        } else {
            this.cars = this.preload.preloadCars
        }


        //this.addUser()


    }



    //----------------------------------------------------------------------
    //----------------------------FUNCIONES---------------------------------
    //----------------------------------------------------------------------


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
        newDriver.setTeamName = null
        newDriver.setPoints = 0
        this.drivers.push(newDriver)
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
                var checkUserDrivers = this.checkUserDriver(nDriver)
                if (!checkUserDrivers) {
                    this.drivers[nDriver].setTeamName = this.teams[i].getCode
                }
                auxDrivers[0] = nDriver
                auxDrivers.push(nDriver)
            }
        }

        return "pilotos repartidos correctamente"


    }
    /**
     * Comprobación de si el piloto está asignado a un equipo o no
     * @param {number} driverNumber - número del piloto
     * @param {Array} driversAssigned - array con los numeros de pilotos asignados
     * @returns {boolean}
     */
    checkDriver(driverNumber, driversAssigned) {
        for (let k = 0; k < driversAssigned.length; k++) {
            if (this.drivers[driverNumber].getCode != "") {
                if (driversAssigned[k] == driverNumber) {
                    var auxCheck = true
                }
            }

        }
        if (auxCheck) {
            return true
        } else {
            return false
        }

    }
    /**
     * Compruebo si el piloto ya está asignado al usuario
     * @param {number} driverNumber 
     * @returns {boolean}
     */
    checkUserDriver(driverNumber) {
        if (this.users[0].getCodeFirstDiver == this.drivers[driverNumber].getCode |
            this.users[0].getCodeSecondDriver == this.drivers[driverNumber].getCode) {
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

    /**
     * Subit el array de conductores a la BD
     */
    driversToDB() {
        for (let i = 0; i < this.drivers.length; i++) {
            this.drivers[i].uploadDriverToDB()
        }
        localStorage.setItem("driversAdded", 1)
    }


    /**
     * Añadir usuario
     * @returns {Console} - salida por consola de comandos
     */
    addUser() {
        const newUser = new User()
        this.users.push(newUser)
        return "User OK"
    }

    /**
     * Selección de equipo, previamente tiene que haber un user declarado
     * @param {string} teamCode 
     * @returns {Console} - salida por consola de comandos
     */
    userSelectTeam(teamCode) {
        if (this.users[0]) {
            if (this.users[0].getTeamCode == "") {
                var teamFound = false
                teamFound = this.searchTeam(teamCode)

                if (teamFound) {
                    return "escudería encontrada"
                } else {
                    return "escudería NO encontrada"
                }
            } else {
                return "el usuario ya tiene escudería"
            }
        } else {
            return "no hay un usuario declarado"
        }
    }

    /**
     * Busqueda del equipo. recorrer el array de equipos para buscarlo
     * @param {string} searchTeamCode 
     * @returns {boolean} 
     */
    searchTeam(searchTeamCode) {
        var found = false
        for (let i = 0; i < this.teams.length; i++) {
            if (searchTeamCode == this.teams[i].getCode) {
                this.users[0].setTeamCode = this.teams[i].getCode
                found = true
            }
        }
        return found
    }

    /**
     * Selección de pilotos, previamente tiene que haber un user declarado y con
     * equipo asignado. 
     * Se asignan dos 
     * @param {string} driverCode 
     * @returns {Console} - salida por consola de comandos
     */
    userSelectDriver(driverCode) {
        if (this.users[0]) {
            if (this.users[0].getTeamCode != "") {
                if (this.users[0].getCodeFirstDiver == "") {
                    var driver1Found = this.searchDriver(driverCode, 1)

                    if (driver1Found) {
                        return "piloto 1 encontrado"
                    } else {
                        return "piloto NO encontrada"
                    }

                } else if (this.users[0].getCodeSecondDriver == "") {
                    var driver2Found = this.searchDriver(driverCode, 2)

                    if (driver2Found) {
                        return "piloto 2 encontrado"
                    } else {
                        return "piloto NO encontrada"
                    }
                } else {
                    return "el usuario ya tiene pilotos"
                }
            } else {
                return "usuario sin equipo"
            }

        } else {
            return "no hay un usuario declarado"
        }

    }
    /**
     * Busqueda del piloto. recorrer el array de equipos para buscarlo
     * @param {string} searchDriverCode 
     * @param {number} nDriver - 1er o 2o piloto del equipo
     * @returns {boolean}
     */
    searchDriver(searchDriverCode, nDriver) {
        var found = false
        for (let i = 0; i < this.drivers.length; i++) {
            if ((searchDriverCode == this.drivers[i].getCode) & (this.drivers[i].getTeamName == null)) {
                switch (nDriver) {
                    case 1:
                        this.users[0].setCodeFirstDiver = this.drivers[i].getCode
                        this.drivers[i].setTeamName = this.users[0].getTeamCode
                        break;

                    case 2:
                        this.users[0].setCodeSecondDriver = this.drivers[i].getCode
                        this.drivers[i].setTeamName = this.users[0].getTeamCode
                        break;
                }
                found = true
            }
        }
        return found
    }
}
