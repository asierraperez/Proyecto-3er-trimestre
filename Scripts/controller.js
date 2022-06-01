/**
 * SIMULADOR DE F1
 * controlador de la aplicación
 */
class Controller {
    constructor(model) {
        this.model = model





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

        this.model.addUser()
        this.model.userSelectTeam('alfa')
        this.model.userSelectDriver('ALB')
        this.model.userSelectDriver('ALO')

        this.model.assignDriversToTeams()

        this.polePosition = this.positions()
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
        var time = this.model.circuits[0].getLaps * 1000
        this.model.circuits[0].setCurrentLap = 1
        var raceInterval = window.setInterval(this.startRace, 1000, this.model.circuits[0], this.polePosition)
        var raceTimeout = window.setTimeout(this.finishRace, time, raceInterval, raceTimeout)

    }
    startRace(circuit, positions) {
        console.log("vuelta " + circuit.getCurrentLap + "/" + circuit.getLaps)
        if (circuit.getCurrentLap % 10 == 0) {
            positions = app.surpass(positions)

            /*
                        //-------------------------------------
                        document.getElementsByTagName("body")[0].innerHTML = ""
                        for (let i = 0; i < positions.length; i++) {
                            var posicion = document.createElement("div")
                            posicion.innerHTML = positions[i]
                            document.getElementsByTagName("body")[0].appendChild(posicion)
                        }
                        //-------------------------------------
            */
        }
        circuit.countLaps()
    }
    surpass(positions) {
        var auxPositions = positions

        for (let i = (auxPositions.length - 1); i >= 1; i--) {
            if (auxPositions[i][1] > auxPositions[i - 1][1]) {
                var aux = auxPositions[i]
                var aux1 = auxPositions[i - 1]
                auxPositions[i] = aux1
                auxPositions[i - 1] = aux
                i--
            }

        }
        console.log(auxPositions)
        return auxPositions
    }
    finishRace(interval, timeout) {
        console.log('fin de la carrera')
        clearInterval(interval)
        clearTimeout(timeout)
    }
    countLaps(currentLap, endingLap) {
        console.log("vuelta " + currentLap + "/" + endingLap)
    }
    /**
     * Busco el piloto para asociarlo al coche y tener el total de puntos de atributo
     * @param {String} searchPositions - código identificativo del piloto
     * @returns {Number}
     */
    search(searchPositions) {
        //busco el piloto y lo guardo 
        var driver = this.searchDrivers(searchPositions)
        //busco el coche 
        var car = this.searchCar(driver)
        var totalAtributePoints = driver.getLuck + driver.getDexterity + car.getVelocity + car.getHandling
        return totalAtributePoints
    }
    /**
     * busco el piloto por su código
     * @param {String} code 
     * @returns {Object}
     */
    searchDrivers(code) {
        for (let i = 0; i < this.model.drivers.length; i++) {
            if (this.model.drivers[i].getCode == code) {
                var found = this.model.drivers[i]
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
        for (let i = 0; i < this.model.teams.length; i++) {
            if (driver.getTeamName == this.model.teams[i].getCode) {
                //una vez encontrado busco el coche del equipo
                for (let j = 0; j < this.model.cars.length; j++) {
                    if (this.model.teams[i].getCode == this.model.cars[j].getCode) {
                        var found = this.model.cars[j]
                    }
                }
            }
        }
        return found
    }

}

const app = new Controller(new Model);