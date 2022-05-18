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
            "url": "http://ergast.com/api/f1/2022/circuits.json"
        };
    }
    get getLaps() {
        return this.laps
    }

    set setLaps(aux) {
        this.laps = aux
    }
    /**
     * Asignar nombre al circuito
     * @param {number} nPiloto - posicion del array
     */
    assignName(nCircuit) {
        var auxName
        $.ajax(this.SETTINGSCIRCUIT).done(function (response) {
            console.log(response)
            auxName = response.MRData.CircuitTable.Circuits[nCircuit].circuitName
        });
        this.setName = auxName
    }
    /**
     * Asignar código al circuito
     * @param {number} nPilot - posicion del array
     */
    assignCode(nCircuit) {
        var auxCode
        $.ajax(this.SETTINGSCIRCUIT).done(function (response) {
            console.log(response)
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


}