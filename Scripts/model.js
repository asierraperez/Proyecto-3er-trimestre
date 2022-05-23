class Model {
    constructor() {
        /**
         * Array con los datos de los pilotos
         */
        this.drivers = [new Driver()]
        /**
         * Datos de las escuderías
         */
        this.teams = [new Team()]
        /**
         * Datos de los circuitos
         */
        this.circuits = [new Circuit()]
        /**
         * Datos de los coches
         */
        this.cars = []

        this.nDriver = 0
        this.nTeam = 0
        this.nCircuit = 0
        this.nCar = 0

        this.nMaxTeams = this.teams[0].maxTeams()
        this.teams.pop()

        for (this.nTeam; this.nTeam < this.nMaxTeams; this.nTeam++) {
            this.addTeam()
        }
        console.log(this.teams)

        this.nMaxDrivers = this.drivers[0].maxDrivers()
        this.drivers.pop()

        for (this.nDriver; this.nDriver < this.nMaxDrivers; this.nDriver++) {
            this.addDriver()
        }
        console.log(this.drivers)

        this.nMaxCircuits = this.circuits[0].maxCircuits()
        this.circuits.pop()

        for (this.nCircuit; this.nCircuit < this.nMaxCircuits; this.nCircuit++) {
            this.addCircuit()
        }
        console.log(this.circuits)

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
        this.circuits.push(newCircuit)
        //console.log(this.circuits)
        //this.nCircuit++
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
        newDriver.setTeamName = ""
        newDriver.setPoints = 0
        this.drivers.push(newDriver)
        //console.log(this.drivers)
        //this.nDriver++
    }
    /**
     * Añadir Coche
     */
    addCar() {
        const newCar = new Car()
        newCar.setAttributes()
        newCar.setName = "Coche de " + this.teams[this.nCar].getName
        newCar.setCode = "Car_" + this.teams[this.nCar].getCode
        newCar.setteamName = this.teams[this.nCar].getCode
        this.cars.push(newCar)
    }
}