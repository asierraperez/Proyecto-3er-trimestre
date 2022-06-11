/**
 * SIMULADOR DE F1
 * controlador de la aplicación
 */
class Controller {


    constructor(model, view) {

        //----------------------------------------------------------------------
        //---------------------DECLARACIÓN DE VARIABLES-------------------------
        //----------------------------------------------------------------------


        /**
         * Model, almacenamiento de datos
         */
        this.model = model
        /**
         * View, vista en el HTML
         */
        this.view = view

        /**
         * Auxiliar con los pilotos ordenados por puntos
         */
        this.driverOrder
        /**
         * Auxiliar con los equipos por puntos
         */
        this.teamOrder

        /**
         * Cuenta de las carreras
         */
        this.raceNumber = 0

        /**
         * auxiliar con el nombre del equipo del usuario
         * Guarde el nombre mientras no es definitivo
         */
        this.auxTeamUser = ''
        /**
         * auxiliar con el nombre del primer piloto del usuario
         * Guarde el nombre mientras no es definitivo
         */
        this.auxDriver1User = ''
        /**
         * auxiliar con el nombre del segundo piloto del usuario
         * Guarde el nombre mientras no es definitivo
         */
        this.auxDriver2User = ''

        this.polePosition


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


        //Muestro los datos 
        this.displayTeams()
        this.displayCars()
        this.displayDrivers()


        //----------------------------------------------------------------------
        //---------------------------FUNCIONES BIND-----------------------------
        //----------------------------------------------------------------------



        //comienzo el juego y declaro un usuario
        this.view.bindMainWindow(this.handleDeclareUser.bind(this))

        //selecciono un equipo
        this.view.bindSelectTeam(this.handleSelectUserTeam.bind(this))
        //lo acepto
        this.view.acceptTeam(this.acceptTeam.bind(this))
        //selecciono 2 pilotos
        this.view.bindSelectDrivers(this.handleSelectUserDriver.bind(this))
        //los acepto
        this.view.acceptDrivers(this.acceptDrivers.bind(this))

        //evento de muestra de clasificación
        this.view.eventClasification(this.handleShowDrivers.bind(this),
            this.handleShowTeams.bind(this))

        //evento carrera
        this.view.eventRace(this.handleGetPolePositions.bind(this),
            this.handleStartRace.bind(this))
        //pasar a la siguiente carrera
        this.view.handleNextRaceButton(this.handlerNextRace.bind(this))


    }

    //----------------------------------------------------------------------
    //----------------------------FUNCIONES---------------------------------
    //----------------------------------------------------------------------


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
    race() {
        /**
         * tiempo a contar
         */
        var time = this.model.circuits[this.raceNumber].getLaps * 100
        this.model.circuits[this.raceNumber].setCurrentLap = 1
        /**
         * variable intervalo
         */
        var raceInterval = window.setInterval(this.startRace, 100, this.model.circuits[this.raceNumber], this.polePosition)
        /**
         * variable temporizador
         */

        var raceTimeout = window.setTimeout(this.finishRace, time, raceInterval, raceTimeout)
    }

    /**
     * Gestion del intervalo
     * @param {object} circuit - circuito actual
     * @param {Array} positions - posiciones de parrilla
     */
    startRace(circuit, positions) {


        app.view.raceInfo(circuit, 1)

        console.log("vuelta " + circuit.getCurrentLap + "/" + circuit.getLaps)
        //cada 5 vueltas hago un adelantamiento
        if (circuit.getCurrentLap % 5 == 0) {
            positions = app.surpass(positions)

            app.view.showPositions(positions, app.model.users[0])

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
        //sumo 1 al numero de circuito para pasar al siguiente
        app.raceNumber++
        //sumo puntos a pilotos y equipos
        app.model.addPoints(app.polePosition)
        //habilito el botón de pasar a otro circuito
        app.view.enableNextRace()
        if (app.raceNumber == app.model.circuits.length) {
            app.view.finishChampionship()
            app.showDriverWinner()
            app.showTeamWinner()
        }


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
     * Mostrar pilotos ordenados
     */
    driversOrdered() {
        var driversOrdered = this.model.driverClasification()
        for (let i = 0; i < driversOrdered.length; i++) {
            this.view.showDriverClasification(driversOrdered[i], this.model.users[0], i)
        }

    }

    /**
     * Mostrar equipos ordenados
     */
    teamsOrdered() {
        var teamsOrdered = this.model.teamClasification()
        for (let i = 0; i < teamsOrdered.length; i++) {

            this.view.showTeamClasification(teamsOrdered[i], this.model.users[0], i)
        }
    }

    /**
     * clasificación general
     */
    clasification() {
        this.driverOrder = this.model.driverClasification()
        this.teamOrder = this.model.teamClasification()
    }

    /**
     * mostrar piloto ganador
     */
    showDriverWinner() {
        var drivers = this.model.driverClasification()
        this.driversOrdered()
        //this.view.showDriverClasification(drivers[i], this.model.users[0], i)
        var winner = drivers[0]
        var userWinner = this.model.checkDriverWinner(winner)
        if (userWinner) {
            this.view.showDriverWinner(winner, true)
        } else {
            this.view.showDriverWinner(winner, false)
        }
    }

    /**
     * Mostrar equipo ganador
     */
    showTeamWinner() {
        var teams = this.model.teamClasification()
        this.teamsOrdered()
        //this.view.showDriverClasification(drivers[i], this.model.users[0], i)
        var winner = teams[0]
        var userWinner = this.model.checkTeamWinner(winner)
        if (userWinner) {
            this.view.showTeamWinner(winner, true)
        } else {
            this.view.showTeamWinner(winner, false)
        }
    }


    //----------------------------------------------------------------------
    //----------------------------HANDLERS----------------------------------
    //----------------------------------------------------------------------


    /**
    * evento para declarar usuarios
    */
    handleDeclareUser() {
        var statusUser = this.model.addUser()
        console.log(statusUser)
    }

    /**
    * seleccion de equipo
    * @param {string} code 
    */
    handleSelectUserTeam(code) {
        this.auxTeamUser = code
    }

    /**
    * aceptar equipo seleccionado
    */
    acceptTeam() {
        this.model.userSelectTeam(this.auxTeamUser)
    }

    /**
     * seleccion de pilotos
     * @param {string} code - código del piloto
     * @param {number} operation - numero que indica la operación a realizar
     */
    handleSelectUserDriver(code, operation) {
        switch (operation) {
            case 0:
                if (this.auxDriver1User == '') {
                    this.auxDriver1User = code
                } else {
                    this.auxDriver2User = code
                }
                break;
            case 1:
                this.auxDriver1User = ""
                break;
            case 2:
                this.auxDriver2User = ""
                break;
        }
    }

    /**
     * acptar pilotos seleccionados
     */
    acceptDrivers() {
        this.model.userSelectDriver(this.auxDriver1User)
        this.model.userSelectDriver(this.auxDriver2User)

        this.model.assignDriversToTeams()
        this.model.driversToDB()

        this.view.raceInfo(this.model.circuits[this.raceNumber], 0)

    }

    /**
     * Handler para los pilotos del evento de muestra de clasificación
     */
    handleShowDrivers() {
        this.driversOrdered()
    }

    /**
     * Handler para los equipos del evento de muestra de clasificación
     */
    handleShowTeams() {
        this.teamsOrdered()
    }

    /**
     * Handler del evento para la clasificación de la carrera
     */
    handleGetPolePositions() {
        this.polePosition = this.positions()
        this.view.showPositions(this.polePosition, this.model.users[0])
    }

    /**
     * handler para empezar la carrera
     */
    handleStartRace() {
        this.race()
    }

    /**
     * handler para pasar a la siguiente carrera
     */
    handlerNextRace() {
        this.view.raceInfo(this.model.circuits[this.raceNumber], 2)

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

    /**
     * seleccion de equipo
     * @param {string} code 
     */
    handleSelectUserTeam(code) {
        this.auxTeamUser = code
    }

    /**
     * aceptar equipo seleccionado
     */
    acceptTeam() {
        this.model.userSelectTeam(this.auxTeamUser)
    }

    /**
     * seleccion de pilotos
     * @param {string} code - código del piloto
     * @param {number} operation - numero que indica la operación a realizar
     */
    handleSelectUserDriver(code, operation) {
        switch (operation) {
            case 0:
                if (this.auxDriver1User == '') {
                    this.auxDriver1User = code
                } else {
                    this.auxDriver2User = code
                }
                break;
            case 1:
                this.auxDriver1User = ""
                break;
            case 2:
                this.auxDriver2User = ""
                break;

        }

    }
    /**
     * acptar pilotos seleccionados
     */
    acceptDrivers() {
        this.model.userSelectDriver(this.auxDriver1User)
        this.model.userSelectDriver(this.auxDriver2User)

        this.model.assignDriversToTeams()
        this.model.driversToDB()

        this.view.raceInfo(this.model.circuits[this.raceNumber], 0)

    }
    /**
     * Mostrar pilotos ordenados
     */
    driversOrdered() {
        var driversOrdered = this.model.driverClasification()
        for (let i = 0; i < driversOrdered.length; i++) {
            this.view.showDriverClasification(driversOrdered[i], this.model.users[0], i)
        }

    }
    teamsOrdered() {
        var teamsOrdered = this.model.teamClasification()
        for (let i = 0; i < teamsOrdered.length; i++) {

            this.view.showTeamClasification(teamsOrdered[i], this.model.users[0], i)
        }
    }
    /**
     * Handler del evento de muestra
     */
    handleShowDrivers() {
        this.driversOrdered()
    }
    handleShowTeams() {
        this.teamsOrdered()
    }
    /**
     * Handler del evento para la clasificación de la carrera
     */
    handleGetPolePositions() {
        this.polePosition = this.positions()
        this.view.showPositions(this.polePosition, this.model.users[0])
    }
    /**
     * handler para empezar la carrera
     */
    handleStartRace() {
        this.race()
    }
    /**
     * handler para pasar a la siguiente carrera
     */
    handlerNextRace() {
        this.view.raceInfo(this.model.circuits[this.raceNumber], 2)

    }

    showDriverWinner() {
        var drivers = this.model.driverClasification()
        this.driversOrdered()
        //this.view.showDriverClasification(drivers[i], this.model.users[0], i)
        var winner = drivers[0]
        var userWinner = this.model.checkDriverWinner(winner)
        if (userWinner) {
            this.view.showDriverWinner(winner, true)
        } else {
            this.view.showDriverWinner(winner, false)
        }



    }

    showTeamWinner() {
        var teams = this.model.teamClasification()
        this.teamsOrdered()
        //this.view.showDriverClasification(drivers[i], this.model.users[0], i)
        var winner = teams[0]
        var userWinner = this.model.checkTeamWinner(winner)
        if (userWinner) {
            this.view.showTeamWinner(winner, true)
        } else {
            this.view.showTeamWinner(winner, false)
        }



    }










}



const app = new Controller(new Model, new View);


