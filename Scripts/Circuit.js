/**
 * Objeto circuito
 */
class Circuit extends general {
    /**
     * @param {string} name - Nombre del circuito
     * @param {string} code - Código de referencia
     * @param {number} laps - Vueltas al circuito
     */
    constructor(name, code, laps) {
        super(name, code)
        this.laps = laps
        this.SETTINGSCIRCUIT = {
            "async": false,
            "type": "GET",
            "url": "http://ergast.com/api/f1/circuits.json?limit=1000&offset=0"
        };
        this.nMaxCircuits = 0
    }
    get getLaps() {
        return this.laps
    }
    get getNMaxCircuits() {
        return this.nMaxCircuits
    }

    set setLaps(aux) {
        this.laps = aux
    }
    set setNMaxCircuits(aux) {
        this.nMaxCircuits = this.nMaxCircuits
    }
    /**
     * Asignar nombre al circuito
     * @param {number} nPiloto - posicion del array
     */
    assignNameCode() {
        var auxName
        var auxCode
        $.ajax({
            url: "selectCircuit.php",
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
     * Asignar código al circuito
     * @param {number} nPilot - posicion del array
     */
    assignCode(nCircuit) {
        var auxCode
        $.ajax(this.SETTINGSCIRCUIT).done(function (response) {
            auxCode = response.MRData.CircuitTable.Circuits[nCircuit].circuitId
        });
        this.setCode = auxCode
    }
    /**
     * Asignar numero de vueltas del 50 al 100
     */
    assignLaps() {
        this.setLaps = Math.floor(Math.random() * (101 - 50) + 50)
    }
    /**
     * Obtener el número máximo de carreras del campeonato
     * @returns {number}
     */
    maxCircuits() {
        this.nMaxCircuits = 0
        $.ajax(this.SETTINGSCIRCUIT).done(function (response) {
            console.log(response)
            this.nMaxCircuits = response.MRData.CircuitTable.Circuits.length
        });
    }

    getFromApi(nCircuit) {
        var auxName
        var auxCode
        $.ajax(this.SETTINGSCIRCUIT).done(function (response) {
            auxCode = response.MRData.CircuitTable.Circuits[nCircuit].circuitId
            auxName = response.MRData.CircuitTable.Circuits[nCircuit].circuitName

        });
        this.setName = auxName
        this.setCode = auxCode
    }
    uploadCircuitToDB() {
        $.ajax({
            data: {
                "name": this.getName,
                "code": this.getCode,
                "laps": this.getLaps
            },
            url: "insertCircuit.php",
            type: "POST",
            success: function (response) {
                console.log(response)
            }
        })
    }


}