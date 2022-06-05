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
        /**
         * botón para aceptar los equipos
         */
        this.teamSelected = document.getElementById('teamSelected')
        /**
         * botón para aceptar los pilotos
         */
        this.driversSelected = document.getElementById('driversSelected')
        /**
         * Pantalla para empezar la carrera
         */
        this.raceScreen = document.getElementById('raceTime')
        this.btnClasification = document.getElementById('btnClasification')
        this.clasification = document.getElementById('clasification')
        /**
         * botón para gestionar la carrera
         */
        this.btnRace = document.getElementById('race')

        this.auxRaceClasification = false



        //comenzar juego, pasar a pantalla de equipos
        this.bindMainWindow()
        //pasar a pantalla de pilotos
        this.acceptTeam()
        //pasar a campeonato
        this.acceptDrivers()
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
        /**
         * equipos mostrados por en el HTML
         * @type {DOMImplementation}
         */
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
        /**
         * coches mostrados por en el HTML
         * @type {DOMImplementation}
         */
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
        /**
         * pilotos mostrados por en el HTML
         * @type {DOMImplementation}
         */
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
    /**
     * selección de equipos
     * @param {*} handler 
     */
    bindSelectTeam(handler) {
        var teamSelected = false
        var prevTeam
        var teams = document.getElementsByClassName("team")
        for (let i = 0; i < teams.length; i++) {
            teams[i].addEventListener("click", evt => {
                var teamCode = teams[i].id
                if (!teamSelected) {
                    handler(teamCode)
                    teamSelected = true
                    prevTeam = teams[i]
                    prevTeam.style.backgroundColor = ""
                    teams[i].style.backgroundColor = "gray"

                } else {
                    handler(teamCode)

                    //teamSelected = false
                    prevTeam.style.backgroundColor = ""
                    teams[i].style.backgroundColor = "gray"
                    prevTeam = teams[i]
                }
                this.teamSelected.disabled = false
            })

        }
    }
    /**
     * con el equio seleccionado, aceptar
     * @param {*} handler 
     */
    acceptTeam(handler) {
        this.teamSelected.addEventListener('click', evt => {
            handler()
            this.selectTeam.style.display = "none"
            this.selectDriver.style.display = "block"
        })
    }
    /**
     * seleccionar pilotos
     * @param {*} handler 
     */
    bindSelectDrivers(handler) {
        /**
         * cuenta de los pilotos
         */
        var countDrivers = 0
        /**
         * auxiliar para guardar el piloto 1 
         */
        var driver1
        /**
         * auxiliar para guardar el piloto 2 
         */
        var driver2
        /**
         * piloto 1 seleccionado
         */
        var driver1Selected = false
        /**
         * piloto 2 seleccionado
         */
        var driver2Selected = false
        /**
         * clase pilotos
         */
        var drivers = document.getElementsByClassName("drivers")
        for (let i = 0; i < drivers.length; i++) {
            drivers[i].addEventListener("click", (evt) => {

                if (driver1 == drivers[i]) {
                    driver1Selected = false
                    driver1.style.backgroundColor = ""
                    driver1 = null
                    countDrivers--
                    handler("", 1)
                } else if (driver2 == drivers[i]) {
                    driver2Selected = false
                    driver2.style.backgroundColor = ""
                    driver2 = null
                    countDrivers--
                    handler("", 2)
                } else {

                    var driverCode = drivers[i].id
                    if (!driver1Selected) {
                        handler(driverCode, 0)
                        driver1Selected = true
                        driver1 = drivers[i]
                        countDrivers++
                        drivers[i].style.backgroundColor = "gray"

                    } else if (driver1Selected & !driver2Selected) {
                        handler(driverCode, 0)
                        driver2Selected = true
                        driver2 = drivers[i]
                        countDrivers++
                        drivers[i].style.backgroundColor = "gray"

                    }



                }
                if (countDrivers == 2) {
                    this.driversSelected.disabled = false
                } else {
                    this.driversSelected.disabled = true

                }
            })

        }
    }
    /**
     * con los pilotos seleccionados, aceptar
     * @param {*} handler 
     */
    acceptDrivers(handler) {
        this.driversSelected.addEventListener('click', evt => {
            handler()
            this.selectDriver.style.display = "none"
            this.raceScreen.style.display = "block"

        })
    }
    eventClasification(handler) {
        this.btnClasification.addEventListener('click', evt => {
            handler()
            //this.btnClasification.innerHTML = "volver"
            this.clasification.style.display = "block"
            this.raceScreen.style.display = "none"

        })
    }
    showDriverClasification({ code, name, surname, points }, { codeFirstDiver, codeSecondDiver }, position) {
        var driver = document.createElement('div')
        driver.innerHTML = (
            (position + 1) + ".  " + name + " " + surname + " " + points + " puntos<br>"
        )
        switch (position) {
            case 0:
                driver.style.backgroundColor = "gold"
                break;
            case 1:
                driver.style.backgroundColor = "silver"
                break;
            case 2:
                driver.style.backgroundColor = "bronze"
                break;

            default:
                break;
        }
        this.clasification.appendChild(driver)
    }

    eventRace(getPole, startRace) {
        var buttonPressed = false
        this.btnRace.addEventListener('click', evt => {
            if (!buttonPressed) {
                getPole()
                this.btnRace.innerText = "Comenzar carrera"
                buttonPressed = true
            } else {
                startRace()
                //this.btnRace.innerText = "Siguiente carrera"
                buttonPressed = false
                this.btnRace.disabled = true
            }

        })
    }

    showPositions(positions) {
        var posicion = document.createElement("div")
        posicion.id = "position"
        if (this.auxRaceClasification) {
            this.raceScreen.removeChild(document.getElementById("position"))
            this.auxRaceClasification = false
        }
        for (let i = 0; i < positions.length; i++) {
            posicion.innerHTML = posicion.innerHTML + "<div>" + (i + 1) + ". " + positions[i][0] + "</div>"
            this.raceScreen.appendChild(posicion)
            this.auxRaceClasification = true
        }

    }

    handleRaceButton() {
        this.btnClasification.innerText = "Siguiente carrera"



    }






}