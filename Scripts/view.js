/**
 * Vista del juego
 */
class View {
    constructor() {
        /**
         * pantalla de inicio
         */
        this.begin = document.getElementById("main")
        /**
         * boton de comienzo
         */
        this.startButton = document.getElementById("start")
        /**
         * pantalla con los datos de las escuderías
         */
        this.selectTeam = document.getElementById("chooseTeam")
        /**
         * pantalla con los datos de los pilotos
         */
        this.selectDriver = document.getElementById("chooseDrivers")
        this.bindMainWindow()
    }
    /**
     * Declarar usuario para empezar el juego
     * @param {} handler 
     */
    bindMainWindow(handler) {
        this.startButton.addEventListener("click", evt => {

            handler()

            this.begin.style.display = "none"
            this.selectTeam.style.display = "block"

        })
    }
    /**
     * Agregar información de las escuderías
     * @param {*} param0 
     */
    teamsInformation({ name, code }) {
        var displayTeam = document.createElement("div")
        displayTeam.className = "team"
        displayTeam.id = code
        displayTeam.innerHTML = name
        this.selectTeam.appendChild(displayTeam)
    }
    /**
     * Agregar información de los coches al de las escuderías
     * @param {*} param0 
     */
    carInformation({ code, velocity, handling }) {
        var displayCars = document.createElement("div")
        displayCars.innerHTML = (
            "Datos del coche: <br>" +
            "   Velocidad: " + velocity + "<br>" +
            "   Manejo: " + handling + "<br>"
        )
        document.getElementById(code).appendChild(displayCars)
    }
    /**
     * Agregar información de los pilotos
     * @param {} param0 
     */
    driverInformation({ code, name, surname, dexterity, luck }) {
        var displayDrivers = document.createElement("div")
        displayDrivers.className = "drivers"
        displayDrivers.id = code
        displayDrivers.innerHTML = (
            name + " " + surname + "<br>" +
            "Destreza: " + dexterity + "<br>" +
            "Suerte: " + luck + "<br>"
        )
        this.selectDriver.appendChild(displayDrivers)
    }

    bindSelectTeam(handler) {
        var teams = document.getElementsByClassName("team")
        for (let i = 0; i < teams.length; i++) {
            teams[i].addEventListener("click", evt => {
                var teamCode = teams[i].id
                handler(teamCode)
                this.selectTeam.style.display = "none"
                this.selectDriver.style.display = "block"
            })

        }
    }

    bindSelectDrivers(handler) {
        var countDrivers = 0
        var drivers = document.getElementsByClassName("drivers")
        for (let i = 0; i < drivers.length; i++) {
            drivers[i].addEventListener("click", (evt) => {
                var driverCode = drivers[i].id
                handler(driverCode)
                countDrivers++
                if (countDrivers == 2) {
                    this.selectDriver.style.display = "none"
                } else {
                    drivers[i].style.backgroundColor = "gray"
                    evt.currentTarget.removeEventListener("click", (evt))
                }
            })

        }
    }




}