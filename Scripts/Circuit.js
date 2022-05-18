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
    }
    get getLaps() {
        return this.laps
    }

    set setLaps(aux) {
        this.laps = aux
    }
}