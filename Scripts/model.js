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

            var checkUserTeam = this.checkUserTeam(this.teams[i].getCode)

            if (!checkUserTeam) {
                //Cada una tiene 2 pilotos
                for (let j = 0; j < 2; j++) {
                    // if (!checkUserTeam) {
                    do {
                        //asigno el piloto al azar, número de [0-20]
                        nDriver = this.randomNumber(this.drivers.length, 0)
                        //compruebo si ya salió o no
                        var check = this.checkDriver(nDriver, auxDrivers)

                    } while (check)
                    var checkUserDriver = this.checkUserDriver(nDriver)

                    if (!checkUserDriver) {
                        this.drivers[nDriver].setTeamName = this.teams[i].getCode
                    } else {
                        j--
                    }
                    //auxDrivers[0] = nDriver
                    auxDrivers.push(nDriver)
                }
            } else {
                for (let j = 0; j < this.drivers.length; j++) {
                    if (this.drivers[j].getTeamName == this.teams[i].getCode) {
                        auxDrivers.push(j)
                    }
                }
            }

        }/*
        if (this.preload.driversAdded != 1) {
            this.driversToDB()
            localStorage.setItem("driversAdded", 1)
        }*/



        //console.log("pilotos repartidos correctamente")
        return auxDrivers


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

            //if (this.users[0].getTeamCode == teamCode) {
            return true

        } else {
            return false
        }
    }
    checkUserTeam(teamCode) {
        if (this.users[0].getTeamCode == teamCode) {
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
        return Math.floor(Math.random() * (maxValue - minValue)) + minValue
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
                teamFound = this.searchUserTeam(teamCode)

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
    searchUserTeam(searchTeamCode) {
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
                    var driver1Found = this.searchUserDriver(driverCode, 1)

                    if (driver1Found) {
                        return "piloto 1 encontrado"
                    } else {
                        return "piloto NO encontrada"
                    }

                } else if (this.users[0].getCodeSecondDriver == "") {
                    var driver2Found = this.searchUserDriver(driverCode, 2)

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
    searchUserDriver(searchDriverCode, nDriver) {
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
    /**
     * busco el piloto por su código
     * @param {String} code 
     * @returns {Object}
     */
    searchDrivers(code) {
        for (let i = 0; i < this.drivers.length; i++) {
            if (this.drivers[i].getCode == code) {
                var found = i
            }
        }
        return found
    }
    /**
     * Busco el coche por el código del piloto
     * @param {Object} driver 
     * @returns {Object}
     */
    searchCar(driver) {
        //primero busco el equipo al que pertenece el piloto
        for (let i = 0; i < this.teams.length; i++) {
            if (driver.getTeamName == this.teams[i].getCode) {
                //una vez encontrado busco el coche del equipo
                for (let j = 0; j < this.cars.length; j++) {
                    if (this.teams[i].getCode == this.cars[j].getCode) {
                        var found = j
                    }
                }
            }
        }
        return found
    }
    /**
     * Busqueda de equipo dado un codigo
     * @param {string} code 
     * @returns {number}
     */
    searchTeam(code) {
        for (let i = 0; i < this.teams.length; i++) {
            if (code == this.teams[i].getCode) {
                var found = i
            }
        }
        return found
    }
    /**
     * Sumar puntos en función de las posiciones
     * @param {Array} endingPositions 
     */
    addPoints(endingPositions) {
        var driverNumber
        var teamNumber
        for (let i = 0; i < 10; i++) {
            driverNumber = this.searchDrivers(endingPositions[i][0])
            teamNumber = this.searchTeam(this.drivers[driverNumber].getTeamName)
            switch (i) {
                case 0:
                    this.drivers[driverNumber].addPoints(25)
                    this.teams[teamNumber].addPoints(25)
                    break;
                case 1:
                    this.drivers[driverNumber].addPoints(18)
                    this.teams[teamNumber].addPoints(18)
                    break;
                case 2:
                    this.drivers[driverNumber].addPoints(15)
                    this.teams[teamNumber].addPoints(15)
                    break;
                case 3:
                    this.drivers[driverNumber].addPoints(10)
                    this.teams[teamNumber].addPoints(10)
                    break;
                case 4:
                    this.drivers[driverNumber].addPoints(8)
                    this.teams[teamNumber].addPoints(8)
                    break;
                case 5:
                    this.drivers[driverNumber].addPoints(6)
                    this.teams[teamNumber].addPoints(6)
                    break;
                case 6:
                    this.drivers[driverNumber].addPoints(5)
                    this.teams[teamNumber].addPoints(5)
                    break;
                case 7:
                    this.drivers[driverNumber].addPoints(3)
                    this.teams[teamNumber].addPoints(3)
                    break;
                case 8:
                    this.drivers[driverNumber].addPoints(2)
                    this.teams[teamNumber].addPoints(2)
                    break;
                case 9:
                    this.drivers[driverNumber].addPoints(1)
                    this.teams[teamNumber].addPoints(1)
                    break;
            }
            this.drivers[driverNumber].uploadPointsToDB()
            this.teams[teamNumber].uploadPointsToDB()
        }
    }
    /**
     * Clasificación de los pilotos
     * @returns {JSON}
     */
    driverClasification() {
        var driver = new Driver()
        var clasification = driver.getFromDB()
        var clasificationOrdered = this.order(clasification)
        return clasificationOrdered
    }
    /**
     * Clasificación de los equipos
     * @returns {JSON}
     */
    teamClasification() {
        var team = new Team()
        var clasification = team.getFromDB()
        var clasificationOrdered = this.order(clasification)
        return clasificationOrdered
    }
    /**
     * Los arrays de datos de mayor a menor
     * @param {JSON} data 
     * @returns {JSON}
     */
    order(data) {
        var auxData = data
        var auxDataPosition
        for (let i = 0; i < auxData.length; i++) {
            for (let j = 0; j < (auxData.length - 1); j++) {
                if (auxData[j].points < auxData[j + 1].points) {
                    auxDataPosition = auxData[j]
                    auxData[j] = auxData[j + 1]
                    auxData[j + 1] = auxDataPosition
                }
            }
        }

        return auxData
    }

    checkDriverWinner({ code }) {
        if (this.users[0].getCodeFirstDiver == code |
            this.users[0].getCodeSecondDriver == code) {
            return true

        } else {
            return false
        }

    }

    checkTeamWinner({ code }) {
        if (this.users[0].getTeamCode == code) {
            return true

        } else {
            return false
        }
    }

}
