class Preload {
    constructor() {
        this.teamsAdded = localStorage.getItem("teamsAdded")
        this.teamsAdded = parseInt(this.teamsAdded)
        this.driversAdded = localStorage.getItem("driversAdded")
        this.circuitsAdded = localStorage.getItem("circuitsAdded")
        this.carsAdded = localStorage.getItem("carsAdded")

        this.preloadTeam = [new Team()]
        this.preloadDrivers = [new Driver()]
        this.preloadCircuits = [new Circuit()]
        this.preloadCars = [new Car()]

        if (this.teamsAdded == 1) {
            this.addTeamFromDB()
        }
    }
    addTeamFromDB() {
        console.log("Equipos de DB")
        var totalTeams = this.preloadTeam[0].getFromDB()
        this.preloadTeam.pop()
        for (let i = 0; i < totalTeams.length; i++) {
            const newTeam = new Team(totalTeams[i].name, totalTeams[i].code, totalTeams[i].points)
            this.preloadTeam.push(newTeam)
        }
    }
}