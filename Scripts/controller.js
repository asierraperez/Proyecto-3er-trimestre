/**
 * SIMULADOR DE F1
 * controlador de la aplicación
 */
class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view

        this.driverOrder
        this.teamOrder


        //----------------------------------------------------------------------
        //------------------------LLAMADAS A FUNCIONES--------------------------
        //----------------------------------------------------------------------

        this.teamsStatus = this.getTeams()
        console.log(this.teamsStatus)

        this.driversStatus = this.getDrivers()
        console.log(this.driversStatus)

        this.circuitsStatus = this.getCircuits()
        console.log(this.circuitsStatus)

        this.carsStatus = this.getCars()
        console.log(this.carsStatus)


        this.displayTeams()
        this.displayCars()
        this.displayDrivers()

        this.view.bindMainWindow(this.handleDeclareUser.bind(this))
        this.view.bindSelectTeam(this.handleSelectUserTeam.bind(this))
        this.view.bindSelectDrivers(this.handleSelectUserDriver.bind(this))

        //this.model.addUser()
        //this.model.userSelectTeam('ferrari')
        //this.model.userSelectDriver('VET')
        //this.model.userSelectDriver('HUL')

        //this.model.assignDriversToTeams()

        //this.polePosition = this.positions()
        //console.log(this.polePosition)

        //this.raceTime = null
    }

    /**
     * Obtener Equipos
     * @returns {string}
     */
    getTeams() {
        if (this.model.preload.teamsAdded != 1) {
            /**
            * Número maximo de equipos
            */
            this.model.nMaxTeams = this.model.teams[0].maxTeams()
            //Elimino el valor que inicialice en la declaración
            this.model.teams.pop()

            for (this.model.nTeam; this.model.nTeam < this.model.nMaxTeams; this.model.nTeam++) {
                this.model.addTeam()
            }
            localStorage.setItem("teamsAdded", 1)

        } else {
            this.model.teams = this.model.preload.preloadTeam
            this.model.nMaxTeams = this.model.preload.preloadTeam.length
        }
        return "equipos OK"
    }

    /**
     * Obtener pilotos
     * @returns {string}
     */
    getDrivers() {
        if (this.model.preload.driversAdded != 1) {
            /**
             * Número máximo de pilotos
             */
            this.model.nMaxDrivers = this.model.drivers[0].maxDrivers()
            //Elimino el valor que inicialice en la declaración
            this.model.drivers.pop()

            for (this.model.nDriver; this.model.nDriver < this.model.nMaxDrivers; this.model.nDriver++) {
                this.model.addDriver()
            }

        } else {
            this.model.drivers = this.model.preload.preloadDrivers
            this.model.nMaxDrivers = this.model.preload.preloadDrivers.length
        }
        return "pilotos OK"
    }

    /**
    * Obtener circuitos
    * @returns {string}
    */
    getCircuits() {
        if (this.model.preload.circuitsAdded != 1) {
            /**
            * Número máximo de circuitos
            */
            this.model.nMaxCircuits = this.model.circuits[0].maxCircuits()
            //Elimino el valor que inicialice en la declaración
            this.model.circuits.pop()

            for (this.model.nCircuit; this.model.nCircuit < this.model.nMaxCircuits; this.model.nCircuit++) {
                this.model.addCircuit()
            }
            console.log(this.model.circuits)
            localStorage.setItem("circuitsAdded", 1)

        } else {
            this.model.circuits = this.model.preload.preloadCircuits
            this.model.nMaxCircuits = this.model.preload.preloadCircuits.length
        }
        return "circuitos OK"
    }

    /**
    * Obtener coches
    * @returns {string}
    */
    getCars() {
        if (this.model.preload.carsAdded != 1) {
            /**
            * Número máximo de coches
            */
            this.model.nMaxCars = this.model.nMaxTeams
            for (this.model.nCar; this.model.nCar < this.model.nMaxCars; this.model.nCar++) {
                this.model.addCar()
            }
            console.log(this.model.cars)
            localStorage.setItem("carsAdded", 1)
        } else {
            this.model.cars = this.model.preload.preloadCars
            this.model.nMaxCars = this.model.preload.preloadCars.length
        }
        return "coches OK"
    }

    /**
     * Obtener posiciones de salida
     * @returns {Array}  posiciones con los códigos de salida
     */
    positions() {
        var positions = []
        for (let i = 0; i < this.model.nMaxDrivers; i++) {
            positions[i] = new Array(2)
            positions[i][0] = this.model.drivers[i].getCode
            positions[i][1] = this.search(positions[i][0])
        }
        //Posiciones de salida aleatorias
        positions = this.randomPosition(positions)
        return positions
    }
    /**
    * Busco el piloto para asociarlo al coche y tener el total de puntos de atributo
    * @param {String} searchPositions - código identificativo del piloto
    * @returns {Number}
    */
    search(searchPositions) {
        //busco el piloto y lo guardo 
        var driver = this.model.searchDrivers(searchPositions)
        //busco el coche 
        var car = this.model.searchCar(this.model.drivers[driver])
        var totalAtributePoints = this.model.drivers[driver].getLuck + this.model.drivers[driver].getDexterity
            + this.model.cars[car].getVelocity + this.model.cars[car].getHandling
        return totalAtributePoints
    }
    /**
     * aleatorizar posiciones
     * @param {Array} rPositions - array con os códigod identificativos de cada piloto
     * @returns {Array}
     */
    randomPosition(rPositions) {
        var auxPositions = rPositions
        auxPositions.sort(function () {
            return Math.random() - 0.5
        })
        return auxPositions
    }

    /**
     * Activación del intervalo que maneja la carrera
     */
    race(nCircuit) {
        var time = this.model.circuits[nCircuit].getLaps * 1000
        this.model.circuits[nCircuit].setCurrentLap = 1
        var raceInterval = window.setInterval(this.startRace, 1000, this.model.circuits[nCircuit], this.polePosition)
        var raceTimeout = window.setTimeout(this.finishRace, time, raceInterval, raceTimeout)

    }
    /**
     * Gestion del intervalo
     * @param {object} circuit - circuito actual
     * @param {Array} positions - posiciones de parrilla
     */
    startRace(circuit, positions) {
        console.log("vuelta " + circuit.getCurrentLap + "/" + circuit.getLaps)
        //cada 5 vueltas hago un adelantamiento
        if (circuit.getCurrentLap % 5 == 0) {
            positions = app.surpass(positions)


            //-------------------------------------
            document.getElementsByTagName("body")[0].innerHTML = ""
            for (let i = 0; i < positions.length; i++) {
                var posicion = document.createElement("div")
                posicion.innerHTML = positions[i]
                document.getElementsByTagName("body")[0].appendChild(posicion)
            }
            //-------------------------------------

        }
        //sumo una vuelta
        circuit.countLaps()
    }
    /**
     * Adelantamientos durante la carrera
     * @param {Array} positions - Posiciones actuales
     * @returns {Array}
     */
    surpass(positions) {
        var auxPositions = positions
        //empiezo desde el último
        for (let i = (auxPositions.length - 1); i >= 1; i--) {
            //comparo la puntuación asociada al piloto i y al i-1
            //si es mayor, adelanta esa posición
            if (auxPositions[i][1] > auxPositions[i - 1][1]) {
                var aux = auxPositions[i]
                var aux1 = auxPositions[i - 1]
                auxPositions[i] = aux1
                auxPositions[i - 1] = aux
                //para controlarlo un poco mejor, 
                //solo permito un adelantamiento por piloto
                i--
            }

        }
        return auxPositions
    }
    /**
     * fin de la carrera (termina el temporizador)
     * @param {TimerHandler} interval - intervalo de la carrera
     * @param {TimerHandler} timeout - temporizador
     */
    finishRace(interval, timeout) {
        console.log('fin de la carrera')
        //reseteo ambos
        clearInterval(interval)
        clearTimeout(timeout)

        //app.addPoints()
    }
    /**
     * clasificación general
     */
    clasification() {
        this.driverOrder = this.model.driverClasification()
        this.teamOrder = this.model.teamClasification()
    }

    /**
     * mostrar equipos 
     */
    displayTeams() {
        for (let i = 0; i < this.model.teams.length; i++) {
            this.view.teamsInformation(this.model.teams[i])
        }
    }
    /**
     * mostrar coches
     */
    displayCars() {
        for (let i = 0; i < this.model.teams.length; i++) {
            this.view.carInformation(this.model.cars[i])
        }
    }
    /**
     * mostrar conductores
     */
    displayDrivers() {
        for (let i = 0; i < this.model.drivers.length; i++) {
            this.view.driverInformation(this.model.drivers[i])
        }
    }
    /**
     * evento para declarar usuarios
     */
    handleDeclareUser() {
        var statusUser = this.model.addUser()
        console.log(statusUser)
    }

    handleSelectUserTeam(code) {
        if (this.model.users[0].getTeamCode == "") {
            this.model.userSelectTeam(code)
        } else {
            this.model.users[0].setTeamCode = ""
            this.model.userSelectTeam(code)
        }

    }

    handleSelectUserDriver(code) {
        this.model.userSelectDriver(code)
    }









}

const app = new Controller(new Model, new View);