class Preload {
    constructor() {
        this.teamsAdded = localStorage.getItem("teamsAdded")
        this.teamsAdded = parseInt(this.teamsAdded)

        this.driversAdded = localStorage.getItem("driversAdded")
        this.driversAdded = parseInt(this.driversAdded)

        this.circuitsAdded = localStorage.getItem("circuitsAdded")
        this.circuitsAdded = parseInt(this.circuitsAdded)

        this.carsAdded = localStorage.getItem("carsAdded")
        this.carsAdded = parseInt(this.carsAdded)

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

    }
    addTeamFromDB() {
        var totalTeams = this.preloadTeam[0].getFromDB()
        this.preloadTeam.pop()
        for (let i = 0; i < totalTeams.length; i++) {
            const newTeam = new Team(totalTeams[i].name, totalTeams[i].code, totalTeams[i].points)
            this.preloadTeam.push(newTeam)
        }
    }

    addCircuitFromDB() {
        var totalCircuits = this.preloadCircuits[0].getFromDB()
        this.preloadCircuits.pop()
        for (let i = 0; i < totalCircuits.length; i++) {
            const newCircuit = new Circuit(totalCircuits[i].name, totalCircuits[i].code, totalCircuits[i].laps)
            this.preloadCircuits.push(newCircuit)
        }

    }
}