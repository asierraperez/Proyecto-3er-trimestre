/**
 * Vista del juego
 */
class View {
    constructor() {

        //----------------------------------------------------------------------
        //---------------------DECLARACIÓN DE VARIABLES-------------------------
        //----------------------------------------------------------------------


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
         * div con laclasificación general de los pilotos
         */
        this.driverClasification = document.createElement('div')
        /**
         * div con la clasificacion de los equipos
         */
        this.teamClasification = document.createElement('div')


        //----------------------------------------------------------------------
        //----------------------LLAMADAS A FUNCIONES----------------------------
        //----------------------------------------------------------------------

        //volver a pantalla de carrera
        this.eventBack()
        //en¡vento de cerrar la ventana de ganadores
        this.closeWindow()

    }

    //----------------------------------------------------------------------
    //-----------------------FUNCIONES BIND---------------------------------
    //----------------------------------------------------------------------


    /**
     * Declarar usuario para empezar el juego
     * @param {Function} handler - Manejador del evento, declara un usuario
     */
    bindMainWindow(handler) {
        this.startButton.addEventListener("click", evt => {
            handler()
            this.begin.style.display = "none"
            this.selectTeam.style.display = "block"

        })
    }

    /**
    * selección de equipos
    * @param {function} handler - manejador del evento, asigna el codigo del equipo seleccionado a un auxiliar
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
     * @param {Function} handler - manejador del evento, asignar código de equipo al user
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
     * @param {Function} handler - manejador del evento, guardo en una variable temporal los códigos de los pilotos
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
                //Con esto desselecciono los pilotos
                //así si quiere cambiar de eleccion solo hay que 
                //pinchar en el mismo otra vez
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
                    //Si no hay ningún piloto seleccionado
                    if (!driver1Selected) {
                        handler(driverCode, 0)
                        driver1Selected = true
                        driver1 = drivers[i]
                        countDrivers++
                        drivers[i].style.backgroundColor = "gray"
                        //Si ya hay uno elegido
                    } else if (driver1Selected & !driver2Selected) {
                        handler(driverCode, 0)
                        driver2Selected = true
                        driver2 = drivers[i]
                        countDrivers++
                        drivers[i].style.backgroundColor = "gray"

                    }
                }
                //Solo se podrá seguir si se tienen los dos pilotos aceptados
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
     * @param {Function} handler - Cargar datos de los pilotos seleccionados al user
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
     * @param {Function} handlerDrivers - mostrar clasificacion de los pilotos
     * @param {Function} handlerTeams - mostrar clasificación de los equipos
     */
    eventClasification(handlerDrivers, handlerTeams) {
        this.btnClasification.addEventListener('click', evt => {
            handlerDrivers()
            handlerTeams()
            this.clasification.style.display = "block"
            this.raceScreen.style.display = "none"

        })
    }

    /**
     * empezar carrera
     * @param {Function} getPole - funcion bind. Obtener posiciones de salida
     * @param {Function} startRace - función bind. Empezar carrera
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
    * gestión del botón de siguiente carrera
    * @param {Function} handle - función bind. gestión del botón
    */
    handleNextRaceButton(handle) {

        this.btnNextRace.addEventListener("click", evt => {
            this.btnNextRace.disabled = true
            this.btnRace.disabled = false
            handle()
            this.raceScreen.removeChild(document.getElementById('position'))
            this.auxRaceClasification = false
            this.btnRace.innerText = 'Clasificación para la carrera'
        })


    }

    //----------------------------------------------------------------------
    //---------------------FUNCIONES DE MUESTREO----------------------------
    //----------------------------------------------------------------------

    /**
     * Agregar información de las escuderías
     * @param {Object} Team - atributos de escudería
     * @param {string} Team.name - nombre
     * @param {string} Team.code - código identificativo
     */
    teamsInformation({ name, code }) {
        /**
         * equipos mostrados por en el HTML
         * @type {DOMImplementation}
         */
        var displayTeam = document.createElement("div")
        displayTeam.className = "team"
        displayTeam.id = code
        displayTeam.innerHTML = "<b>" + name + "</b>"
        document.getElementById("teamsToChoose").appendChild(displayTeam)
    }

    /**
     * Agregar información de los coches al de las escuderías
     * @param {Object} Car - atributos de coche
     * @param {Number} Car.velocity - atributos de coche
     * @param {Number} Car.handling - atributos de coche
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
     * @param {Object} Driver - Objeto piloto
     * @param {string} Driver.code - codigo identificativo
     * @param {string} Driver.name - nombre
     * @param {string} Driver.surname - Apellido
     * @param {number} Driver.dexterity - destreza
     * @param {number} Driver.luck - suerte
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
            "<b>" + name + " " + surname + "</b><br>" +
            "Destreza: " + dexterity + "<br>" +
            "Suerte: " + luck + "<br>"
        )
        document.getElementById("driversToChoose").appendChild(displayDrivers)
    }

    /**
     * ordena los pilotos para mostrarlo por orden de puntos
     * @param {Object} Driver - objeto piloto
     * @param {string} Driver.code - codigo identificativo
     * @param {string} Driver.name - nombre
     * @param {string} Driver.surname - Apellido 
     * @param {number} Driver.points - puntos     
     * @param {Object} User - objeto usuario
     * @param {String} User.codeFirstDiver - codigo del primer piloto del usuario
     * @param {String} User.codeSecondDriver - codigo del segundo piloto del usuario 
     * @param {number} position 
     */
    showDriverClasification({ code, name, surname, points }, { codeFirstDiver, codeSecondDriver }, position) {
        if (position == 0) {
            this.driverClasification.innerHTML = "<div><b>Clasificación de pilotos</b></div>"

        }
        var driver = document.createElement('div')
        driver.innerHTML = (
            '<a>' + (position + 1) + ".</a>  <a> " + name + " " + surname + "<a>  </a>" + points + " puntos</a><br>"
        )
        this.checkPlace(driver, position)
        this.checkUserDrivers(code, codeFirstDiver, codeSecondDriver, driver)
        this.driverClasification.appendChild(driver)
        this.driverClasification.id = "driverClasification"
        document.getElementById('show').appendChild(this.driverClasification)
    }

    /**
     * ordena los equipos para mostrarlo por orden de puntos
     * @param {object} Team - objeto escudería
     * @param {string} Team.name - nombre
     * @param {string} Team.code - código identificativo
     * @param {Object} User - Objeto Usuario
     * @param {string} User.teamCode - Codigo del equipo del usuario
     * @param {number} position 
     */
    showTeamClasification({ code, name, points }, { teamCode }, position) {
        if (position == 0) {
            this.teamClasification.innerHTML = "<div><b>Clasificación de escuderías</b></div>"
        }
        var team = document.createElement('div')
        team.innerHTML = (
            '<a>' + (position + 1) + ".</a>  <a>" + name + " <a>  </a>" + points + " puntos </a><br>"
        )
        this.checkPlace(team, position)
        this.checkUserTeam(code, teamCode, team)
        this.teamClasification.appendChild(team)
        this.teamClasification.id = "teamClasification"
        document.getElementById('show').appendChild(this.teamClasification)
    }

    /**
     * Mostrar posiciones de salida
     * @param {array} positions - array con el orden de salida
     * @param {Object} User - Objeto usuario
     * @param {string} User.codeFirstDiver - Código del primer piloto del usuario
     * @param {string} User.codeSecondDriver - Código des segundo piloto
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
            individual.innerHTML = "<a>" + (i + 1) + ".</a> " + positions[i][0]
            this.checkUserDrivers(positions[i][0], codeFirstDiver, codeSecondDriver, individual)
            this.checkPlace(individual, i)
            posicion.append(individual)
            this.auxRaceClasification = true
        }
        this.raceScreen.append(posicion)
    }

    /**
     * información relativa al circuito
     * @param {Object} Circuit - atributos del objeto circuito
     * @param {string} Circuit.name - nombre
     * @param {number} Circuit.currentLap- vueltas actuales
     * @param {number} Circuit.laps- vueltas totales
     * @param {number} operation - operación a realizar
     */
    raceInfo({ name, currentLap, laps }, operation) {
        var info = document.getElementById('raceInfo')
        switch (operation) {
            //0 = muestra inicial del primer circuito de todos, solo muestroel nombre
            case 0:
                info.innerHTML = (
                    name
                )
                break;
            //1 = ya se estaba enseñando el nombre, ahora añado vueltas
            case 1:
                info.innerHTML = ""
                info.innerHTML = (
                    name + ",  vuelta " + currentLap + " de " + laps
                )
                break;
            //2 = la carrera anterior acabó, muestro la siguiente    
            case 2:
                info.innerHTML = ""
                info.innerHTML = (
                    name
                )
                break;
        }
    }

    /**
     * Mostrar Piloto ganador
     * @param {Object} Driver - atributos del objeto piloto
     * @param {string} Driver.name - nombre
     * @param {string} Driver.surname - Apellido
     * @param {boolean} userWinner - comprobación de si ganó uno de los pilotos del usuario
     */
    showDriverWinner({ name, surname }, userWinner) {
        var winner = document.createElement("h2")
        var user = document.createElement("h4")
        winner.innerText = "Ha ganado " + name + " " + surname
        if (userWinner) {
            user.innerText = "Enhorabuena, tu piloto ha ganado!"
        } else {
            user.innerHTML = "Confía en <b><i>el plan</b></i>, ganarás la siguiente"
        }
        document.getElementById('finalResult').appendChild(winner)
        document.getElementById('finalResult').appendChild(user)
    }

    /**
     * Mostrar escudería ganador
     * @param {Object} Team - atributos del objeto escudería
     * @param {Object} Team.name - nombre
     * @param {boolean} userWinner - comprobación de si ganó la escudería del usuario
     */
    showTeamWinner({ name }, userWinner) {
        var winner = document.createElement("h2")
        var user = document.createElement("h4")
        winner.innerText = "Ha ganado " + name
        if (userWinner) {
            user.innerText = "Enhorabuena, tu escudería ha ganado!"
        } else {
            user.innerHTML = "Más suerte la próxima"
        }
        document.getElementById('finalResult').appendChild(winner)
        document.getElementById('finalResult').appendChild(user)

    }

    /**
     * Habilitar botón de siguiente carrera
     */
    enableNextRace() {
        this.btnNextRace.disabled = false
    }

    /**
     * Termina el campeonato
     */
    finishChampionship() {
        this.clasification.removeChild(this.btnBack)
        this.clasification.style.display = "block"
        this.raceScreen.style.display = "none"
        document.getElementById('finalResult').style.display = 'block'

    }
    //----------------------------------------------------------------------
    //-------------------EVENTOS Y COMPROBACIONES---------------------------
    //----------------------------------------------------------------------

    /**
     * evento para volver de la pantalla de clasificación a la de carrera
     */
    eventBack() {
        this.btnBack.addEventListener('click', evt => {
            this.clasification.style.display = "none"
            this.raceScreen.style.display = "block"

            document.getElementById('show').removeChild(document.getElementById("driverClasification"))
            document.getElementById('show').removeChild(document.getElementById("teamClasification"))

            this.driverClasification.innerHTML = ''
            this.teamClasification.innerHTML = ''
        })
    }

    /**
     * Compruebo cuales son los tres primeros para colorearlo
     * @param {DOMImplementation} name - etiqueta HTML a cambiar de color
     * @param {number} place - posicion
     */
    checkPlace(name, place) {
        switch (place) {
            case 0:
                name.style.backgroundColor = "gold"
                break;
            case 1:
                name.style.backgroundColor = "silver"
                break;
            case 2:
                name.style.backgroundColor = "#CD7F32"
                break;

            default:
                break;
        }
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

    /**
     * Compruebo Los equipos para saber cual es el del usuario,
     * cuando lo encuentre lo señalo en verde
     * @param {string} code - código a comprobar
     * @param {string} teamUser - Código del piloto del usuario
     * @param {DOMImplementation} team - Objeto del html a destacar
     */
    checkUserTeam(code, teamUser, team) {
        if (code == teamUser) {
            team.style.color = "green"
        }
    }


    /**
     * gestión del evento de cerrar la ventana de ganador
     */
    closeWindow() {
        document.getElementById('close').addEventListener('click', evt => {
            document.getElementById('finalResult').style.display = 'none'
        })
    }

}