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
            "url": "http://ergast.com/api/f1/constructors.json?limit=1000&offset=0"
        };
        this.nMaxTeams = 0
    }

    get getPoints() {
        return this.points
    }
    get getNMaxTeams() {
        return this.nMaxTeams
    }

    set setPoints(aux) {
        this.points = aux
    }
    set setNMaxTeams(aux) {
        this.nMaxTeams = aux
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
    assignNameCodeDB() {
        var auxName
        var auxCode
        $.ajax({
            url: "selectTeam.php",
            type: "GET",
            async: false,
            success: function (response) {
                var teamJSON = JSON.parse(response)
                //console.log(teamJSON)
                auxName = teamJSON.name
                auxCode = teamJSON.code
            }
        })
        this.setName = auxName
        this.setCode = auxCode
    }
    /**
     * Obteber número máximo de escuderías
     * @returns {number}
     */
    maxTeams() {
        var auxNMaxTeams = 0
        $.ajax(this.SETTINGSCONTRUCTOR).done(function (response) {
            //console.log(response)
            auxNMaxTeams = response.MRData.ConstructorTable.Constructors.length
        });
        this.setNMaxTeams = auxNMaxTeams

    }

    getFromAPI(nTeam) {
        var auxName
        var auxCode
        $.ajax(this.SETTINGSCONTRUCTOR).done(function (response) {
            auxName = response.MRData.ConstructorTable.Constructors[nTeam].name
            auxCode = response.MRData.ConstructorTable.Constructors[nTeam].constructorId
        });
        this.setName = auxName
        this.setCode = auxCode
    }
    /**
     * Actualizar base de datos de equipos
     * @param {Object} team - datos de la escudería
     * @returns {Boolean}
     */
    uploadTeamToDB() {
        $.ajax({
            data: {
                "name": this.getName,
                "code": this.getCode,
                "points": this.getPoints
            },
            url: "insertTeam.php",
            type: "POST",
            success: function (response) {
                console.log(response)
            }
        })
    }
}