/**
 * Objeto Escudería
 */
class Team extends general {
    /**
     * @param {string} name - Nombre de la escudería 
     * @param {string} code - Código de referencia 
     * @param @param {number} points - Puntos acumulados
     */
    constructor(name, code, points) {
        super(name, code)
        this.points = points
        this.SETTINGSCONTRUCTOR = {
            "async": false,
            "type": "GET",
            "url": "http://ergast.com/api/f1/2022/constructors.json"
        };
    }

    get getPoints() {
        return this.name
    }

    set setPoints(aux) {
        this.points = aux
    }
    /**
     * Sumar puntos a la escudería
     * @param {number} circuitPoints - Puntos obtenidos en la carrera
     */
    addPoints(circuitPoints) {
        this.setPoints = (this.getPoints + circuitPoints)
    }
    /**
     * Asignar nombre a la escudería
     * @param {number} nTeam - orden en Array escuderías
     */
    assignName(nTeam) {
        var auxName
        $.ajax(this.SETTINGSCONTRUCTOR).done(function (response) {

            auxName = response.MRData.ConstructorTable.Constructors[nTeam].name
        });
        this.setName = auxName
    }
    /**
     * Asignar código a la escudería
     * @param {number} nTeam - orden en Array escuderías
     */

    assignCode(nTeam) {
        var auxCode
        $.ajax(this.SETTINGSCONTRUCTOR).done(function (response) {

            auxCode = response.MRData.ConstructorTable.Constructors[nTeam].constructorId
        });
        this.setCode = auxCode
    }
    maxTeams() {
        var nMaxTeams = 0
        $.ajax(this.SETTINGSCONTRUCTOR).done(function (response) {
            nMaxTeams = response.MRData.ConstructorTable.Constructors.length
        });
        return nMaxTeams

    }
}