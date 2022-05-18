class Model {
    constructor() {
        /**
         * Array con los datos de los pilotos
         */
        this.drivers = []
        /**
         * Datos de las escuderías
         */
        this.teams = []
        /**
         * Datos de los circuitos
         */
        this.circuits = []
        /**
         * Datos de los coches
         */
        this.cars = []

        this.nDriver = 0
        this.nTeam = 0
        this.nCircuit = 0
        this.nCar = 0
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
        newDriver.setPoints = 0
        this.drivers.push(newDriver)
        console.log(this.drivers)
        this.nDriver++
    }
    /**
     * Añadir escudería
     */
    addTeam() {
        const newTeam = new Team()
        newTeam.assignName(this.nTeam)
        newTeam.assignCode(this.nTeam)
        newTeam.setPoints = 0
        this.teams.push(newTeam)
        console.log(this.teams)
        this.nTeam++
    }

    addCircuit() {
        const newCircuit = new Circuit()
        newCircuit.assignName(this.nCircuit)
        newCircuit.assignCode(this.nCircuit)
        newCircuit.assignLaps()
        this.circuits.push(newCircuit)
        console.log(this.circuits)
        this.nCircuit++
    }

}