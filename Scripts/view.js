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
        /**
         * Botón para acceder a la clasificación
         */
        this.btnClasification = document.getElementById('btnClasification')
        /**
         * Pantalla para mostrar la clasificación
         */
        this.clasification = document.getElementById('clasification')
        /**
         * botón para gestionar la carrera
         */
        this.btnRace = document.getElementById('race')
        /**
         * botón para pasar a la siguiente carrera
         */
        this.btnNextRace = document.getElementById('nextRace')
        /**
         * volver de clasificación a carrera
         */
        this.btnBack = document.getElementById("back")

        /**
         * auxiliar para mostrar la clasificación durante la carrera
         */
        this.auxRaceClasification = false
        /**
         * div con laclasificación general
         */
        this.driverClasification = document.createElement('div')

        //handleNextRaceButton

        //comenzar juego, pasar a pantalla de equipos
        this.bindMainWindow()
        //pasar a pantalla de pilotos
        this.acceptTeam()
        //pasar a campeonato
        this.acceptDrivers()
        //volver a pantalla de carrera
        this.eventBack()

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
    /**
     * evento que gestiona el mostrar la clasificación
     * @param {*} handler 
     */
    eventClasification(handler) {
        this.btnClasification.addEventListener('click', evt => {
            handler()
            //this.btnClasification.innerHTML = "volver"
            this.clasification.style.display = "block"
            this.raceScreen.style.display = "none"

        })
    }
    /**
     * ordena los pilotos para mostrarlo por orden de puntos
     * @param {*} param0 
     * @param {*} param1 
     * @param {number} position 
     */
    showDriverClasification({ code, name, surname, points }, { codeFirstDiver, codeSecondDriver }, position) {
        var driver = document.createElement('div')
        driver.innerHTML = (
            (position + 1) + ".  " + name + " " + surname + " " + points + " puntos<br>"
        )
        this.checkPlace(driver, position)
        this.driverClasification.appendChild(driver)
        this.driverClasification.id = "driverClasification"
        this.checkUserDrivers(code, codeFirstDiver, codeSecondDriver, driver)
        this.clasification.appendChild(this.driverClasification)
    }
    /**
     * evento para volver de la pantalla de clasificación a la de carrera
     */
    eventBack() {
        this.btnBack.addEventListener('click', evt => {
            this.clasification.style.display = "none"
            this.raceScreen.style.display = "block"
            this.clasification.removeChild(document.getElementById("driverClasification"))
            this.driverClasification.innerHTML = ''
        })
    }
    /**
     * empezar carrera
     * @param {*} getPole - funcion bind. Obtener posiciones de salida
     * @param {*} startRace - función bind. Empezar carrera
     */
    eventRace(getPole, startRace) {
        //con solo 1 botón gestiono la carrera.
        var buttonPressed = false
        this.btnRace.addEventListener('click', evt => {
            if (!buttonPressed) {
                /*
                si el botón no se pulsó, quiere decir que aun no se empezó la carrera,
                así que primero muestro las posiciones de salida
                */
                getPole()
                this.btnRace.innerText = "Comenzar carrera"
                buttonPressed = true

            } else {
                /*
                con el botón ya pulsado 1 vez, es el momento de empezar una carrera
                */
                startRace()
                buttonPressed = false
                this.btnRace.disabled = true
            }

        })
    }
    /**
     * Mostrar posiciones de salida
     * @param {array} positions - array con el orden de salida
     * @param {*} param1 - atributos objeto
     */
    showPositions(positions, { codeFirstDiver, codeSecondDriver }) {
        var posicion = document.createElement("div")
        posicion.id = "position"
        /*
        antes de nada compruebo si ya se esta mostrando,
        si es así, la borro
        */
        if (this.auxRaceClasification) {
            this.raceScreen.removeChild(document.getElementById("position"))
            this.auxRaceClasification = false
        }
        for (let i = 0; i < positions.length; i++) {
            var individual = document.createElement('div')
            individual.innerHTML = (i + 1) + ". " + positions[i][0]
            this.checkUserDrivers(positions[i][0], codeFirstDiver, codeSecondDriver, individual)
            this.checkPlace(individual, i)
            posicion.append(individual)
            this.auxRaceClasification = true
        }
        this.raceScreen.append(posicion)
    }
    checkPlace(name, place) {
        switch (place) {
            case 0:
                name.style.backgroundColor = "gold"
                break;
            case 1:
                name.style.backgroundColor = "silver"
                break;
            case 2:
                name.style.backgroundColor = "bronze"
                break;

            default:
                break;
        }
    }



    /**
     * información relativa al circuito
     * @param {*} param0 - atributos del objeto circuito
     * @param {number} operation - operación a realizar
     */
    raceInfo({ name, currentLap, laps }, operation) {
        var info = document.createElement("div")
        info.id = "raceInfo"
        switch (operation) {
            //0 = muestra inicial del primer circuito de todos, solo muestroel nombre
            case 0:
                info.innerHTML = (
                    name
                )
                break;
            //1 = ya se estaba enseñando el nombre, ahora añado vueltas
            case 1:
                this.raceScreen.removeChild(document.getElementById("raceInfo"))
                info.innerHTML = (
                    name + ",  vuelta " + currentLap + " de " + laps
                )
                break;
            //2 = la carrera anterior acabó, muestro la siguiente    
            case 2:
                this.raceScreen.removeChild(document.getElementById("raceInfo"))
                info.innerHTML = (
                    name
                )
                break;
        }
        this.raceScreen.appendChild(info)



    }
    /**
     * gestión del botón de siguiente carrera
     * @param {*} handle - función bind. gestión del botón
     */
    handleNextRaceButton(handle) {

        this.btnNextRace.addEventListener("click", evt => {
            this.btnNextRace.disabled = true
            this.btnRace.disabled = false
            handle()
            this.btnRace.innerText = 'Clasificación para la carrera'
        })


    }
    /**
     * comprobación de cuales son los pilotos del usuario para destacarlos
     * @param {string} code - id a comprobar
     * @param {string} driver1 - id del piloto 1 del usuario
     * @param {string} driver2 - id del piloto 2 del usuario
     * @param {DOMException} position 
     */
    checkUserDrivers(code, driver1, driver2, position) {
        if ((code == driver1) | (code == driver2)) {
            position.style.color = "green"
        }
    }
    enableNextRace() {
        this.btnNextRace.disabled = false
    }






}