class Controller {
    constructor(model) {
        this.model = model


        //----------------------------------------------------------------------
        //------------------------LLAMADAS A FUNCIONES--------------------------
        //----------------------------------------------------------------------

        //------------------------EQUIPOS--------------------------
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
        }

        //------------------------PILOTOS--------------------------
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
            console.log(this.drivers)

        } else {
            this.model.drivers = this.model.preload.preloadDrivers
        }

        //------------------------CIRCUITOS--------------------------
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
        }

        //------------------------COCHES--------------------------
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
        }

    }
}

const app = new Controller(new Model);