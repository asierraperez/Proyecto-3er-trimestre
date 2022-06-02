/**
 * clase Precarga
 */
class Preload {
    constructor() {
        /**
         * consulta si ya se cargaran equipos antes
         */
        this.teamsAdded = localStorage.getItem("teamsAdded")
        this.teamsAdded = parseInt(this.teamsAdded)
        /**
         * consulta si ya se pilotos equipos antes
         */
        this.driversAdded = localStorage.getItem("driversAdded")
        this.driversAdded = parseInt(this.driversAdded)
        /**
         * consulta si ya se circuitos equipos antes
         */
        this.circuitsAdded = localStorage.getItem("circuitsAdded")
        this.circuitsAdded = parseInt(this.circuitsAdded)
        /**
         * consulta si ya se coches equipos antes
         */
        this.carsAdded = localStorage.getItem("carsAdded")
        this.carsAdded = parseInt(this.carsAdded)
        /**
         * equipos precargados
         */
        this.preloadTeam = [new Team()]
        this.preloadDrivers = [new Driver()]
        this.preloadCircuits = [new Circuit()]
        this.preloadCars = [new Car()]

        if (this.teamsAdded == 1) {
            this.addTeamFromDB()
        }

        if (this.circuitsAdded == 1) {
            this.addCircuitFromDB()
        }

        if (this.carsAdded == 1) {
            this.addCarFromDB()
        }

        if (this.driversAdded == 1) {
            this.addDriverFromDB()
        }

    }
    /**
     * obtener equipos de la base de datos
     */
    addTeamFromDB() {
        /**
         * Respuesta de la conexión
         */
        var totalTeams = this.preloadTeam[0].getFromDB()
        this.preloadTeam.pop()
        //Separo los detos del JSON y los guardo en un array
        for (let i = 0; i < totalTeams.length; i++) {
            const newTeam = new Team(totalTeams[i].name, totalTeams[i].code, totalTeams[i].points)
            newTeam.setPoints = parseInt(newTeam.getPoints)
            this.preloadTeam.push(newTeam)
        }
    }
    /**
     * Obtener circuitos de la bas de datos
     */
    addCircuitFromDB() {
        /**
         * Respuesta de la conexión
         */
        var totalCircuits = this.preloadCircuits[0].getFromDB()
        this.preloadCircuits.pop()
        //Separo los detos del JSON y los guardo en un array
        for (let i = 0; i < totalCircuits.length; i++) {
            const newCircuit = new Circuit(totalCircuits[i].name, totalCircuits[i].code, totalCircuits[i].laps)
            newCircuit.setLaps = parseInt(newCircuit.getLaps)
            this.preloadCircuits.push(newCircuit)
        }

    }
    /**
     * Obtener circuitos de la bas de datos
     */
    addCarFromDB() {
        /**
         * Respuesta de la conexión
         */
        var totalCars = this.preloadCars[0].getFromDB()
        this.preloadCars.pop()
        //Separo los detos del JSON y los guardo en un array
        for (let i = 0; i < totalCars.length; i++) {
            const newCar = new Car("", totalCars[i].code, totalCars[i].velocity, totalCars[i].handling, totalCars[i].teamName)
            newCar.setHandling = parseInt(newCar.getHandling)
            newCar.setVelocity = parseInt(newCar.getVelocity)
            this.preloadCars.push(newCar)
        }

    }
    /**
    * Obtener pilotos de la bas de datos
    */
    addDriverFromDB() {
        /**
         * Respuesta de la conexión
         */
        var totalDrivers = this.preloadDrivers[0].getFromDB()
        this.preloadDrivers.pop()
        //Separo los detos del JSON y los guardo en un array
        for (let i = 0; i < totalDrivers.length; i++) {
            const newDriver = new Driver(totalDrivers[i].name, totalDrivers[i].code, totalDrivers[i].surname, totalDrivers[i].luck, totalDrivers[i].dexterity, totalDrivers[i].points, totalDrivers[i].teamID)
            newDriver.setDexterity = parseInt(newDriver.getDexterity)
            newDriver.setLuck = parseInt(newDriver.getLuck)
            newDriver.setPoints = parseInt(newDriver.getPoints)

            this.preloadDrivers.push(newDriver)
        }

    }
}