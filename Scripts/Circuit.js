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
        this.currentLap = 1
    }
    get getLaps() {
        return this.laps
    }
    get getCurrentLap() {

        return this.currentLap


    }

    set setLaps(aux) {
        this.laps = aux
    }
    set setCurrentLap(aux) {
        this.currentLap = aux


    }
    /**
     * Asignar nombre al circuito
     * @param {number} nPiloto - posicion del array
     */
    assignName(nCircuit) {
        var auxName
        $.ajax(this.SETTINGSCIRCUIT).done(function (response) {
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
            auxCode = response.MRData.CircuitTable.Circuits[nCircuit].circuitId
        });
        this.setCode = auxCode
    }
    /**
     * Asignar numero de vueltas del 50 al 100
     */
    assignLaps() {

        this.setLaps = Math.floor(Math.random() * (50 - 30) + 30)



    }
    /**
     * Sumo una vuelta a las vueltas actuales
     */
    countLaps() {
        this.setCurrentLap = this.getCurrentLap + 1
    }
    /**
     * Obtener el número máximo de carreras del campeonato
     * @returns {number}
     */
    maxCircuits() {
        var nMaxCircuits = 0
        $.ajax(this.SETTINGSCIRCUIT).done(function (response) {
            nMaxCircuits = response.MRData.CircuitTable.Circuits.length
        });

        return nMaxCircuits
    }
    /**
     * Subir datos del objeto a BD
     */
    uploadCircuitToDB() {
        $.ajax({
            data: {
                "name": this.getName,
                "code": this.getCode,
                "laps": this.getLaps
            },
            url: "php/insertCircuit.php",
            type: "POST",
            success: function (response) {
                console.log(response)
            }
        })
    }
    /**
     * Consulta a la BD
     * @returns {JSON}
     */
    getFromDB() {
        /**
         * Respuesta del la BD
         */
        var circuitJSON
        $.ajax({
            url: "php/selectCircuit.php",
            type: "GET",
            async: false,
            success: function (response) {
                circuitJSON = JSON.parse(response)

            }
        })
        return circuitJSON
    }

}