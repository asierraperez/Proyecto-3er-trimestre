/**
 * Objeto Piloto
 */
class Driver extends general {
    /** 
     * @param {string} name - Nombre del piloto
     * @param {string} code - Código de referencia
     * @param {string} surname - Apellido del piloto
     * @param {number} luck - Atributo suerte
     * @param {number} dexterity - Atributo destreza
     * @param {number} points - Puntos acumulados
     * @param {number} teamName - Nombre de la escudería a la que pertenece
     */
    constructor(name, code, surname, luck, dexterity, points, teamName) {
        super(name, code)
        this.surname = surname
        this.luck = luck
        this.dexterity = dexterity
        this.points = points
        this.teamName = teamName
        /**
         * Datos para la conexión con la API
         */
        this.SETTINGSDRIVER = {
            "async": false,
            "type": "GET",
            "url": "http://ergast.com/api/f1/2022/drivers.json"
        };
    }

    get getSurname() {
        return this.surname
    }
    get getLuck() {
        return this.luck
    }
    get getDexterity() {
        return this.dexterity
    }
    get getPoints() {
        return this.points
    }
    get getTeamName() {
        return this.teamName
    }


    set setSurname(aux) {
        this.surname = aux
    }
    set setLuck(aux) {
        this.luck = aux
    }
    set setDexterity(aux) {
        this.dexterity = aux
    }
    set setPoints(aux) {
        this.points = aux
    }
    set setTeamName(aux) {
        this.teamName = aux
    }

    /**
     * Asignar atributos suerte y destreza
     * ambos son un numero aleatorio del 0 a 100
     * influiran en las carreras
     */
    setAttributes() {
        //Destreza aleatoria
        this.setDexterity = Math.floor(Math.random() * (101 - 0))
        //Suerte aleatoria
        this.setLuck = Math.floor(Math.random() * (101 - 0))
    }

    /**
     * Sumar puntos al piloto
     * @param {number} circuitPoints - Puntos obtenidos en la carrera
     */
    addPoints(circuitPoints) {
        this.setPoints = (this.getPoints + circuitPoints)
    }

    /**
     * Asignar nombre al piloto
     * @param {number} nPiloto - posicion del array
     */
    assignName(nPiloto) {
        var auxName
        $.ajax(this.SETTINGSDRIVER).done(function (response) {
            auxName = response.MRData.DriverTable.Drivers[nPiloto].givenName
        });
        this.setName = auxName

    }
    /**
     * Asignar código al piloto
     * @param {number} nPilot - posicion del array
     */
    assignCode(nPilot) {
        var auxCode
        $.ajax(this.SETTINGSDRIVER).done(function (response) {
            auxCode = response.MRData.DriverTable.Drivers[nPilot].code
        });
        this.setCode = auxCode
    }
    /**
     * Asignar apellidos al piloto
     * @param {number} nPiloto - posicion del array
     */
    assignSurname(nPiloto) {
        var auxSurname
        $.ajax(this.SETTINGSDRIVER).done(function (response) {
            auxSurname = response.MRData.DriverTable.Drivers[nPiloto].familyName
        });
        this.setSurname = auxSurname

    }
    maxDrivers() {
        var nMaxDrivers = 0
        $.ajax(this.SETTINGSDRIVER).done(function (response) {
            nMaxDrivers = response.MRData.DriverTable.Drivers.length
        });
        return nMaxDrivers

    }
}