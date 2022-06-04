class View {
    constructor() {
        this.begin = document.getElementById("main")
        this.startButton = document.getElementById("start")
        this.selectTeam = document.getElementById("chooseTeam")
        this.selectDriver = document.getElementById("chooseDrivers")
        this.bindMainWindow()
    }

    bindMainWindow(handler) {
        this.startButton.addEventListener("click", evt => {

            handler()

            this.begin.style.display = "none"
            this.selectTeam.style.display = "block"

        })
    }

    teamsInformation({ name, code }) {
        var displayTeam = document.createElement("div")
        displayTeam.className = "team"
        displayTeam.id = code
        displayTeam.innerHTML = name
        this.selectTeam.appendChild(displayTeam)
    }

    carInformation({ code, velocity, handling }) {
        var displayCars = document.createElement("div")
        displayCars.innerHTML = (
            "Datos del coche: <br>" +
            "   Velocidad: " + velocity + "<br>" +
            "   Manejo: " + handling + "<br>"
        )
        document.getElementById(code).appendChild(displayCars)
    }

    driverInformation({ name, surname, dexterity, luck }) {
        var displayDrivers = document.createElement("div")
        displayDrivers.className = "drivers"
        displayDrivers.innerHTML = (
            name + " " + surname + "<br>" +
            "Destreza: " + dexterity + "<br>" +
            "Suerte: " + luck + "<br>"
        )
        this.selectDriver.appendChild(displayDrivers)

    }




}