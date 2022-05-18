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
    }

    get getPoints() {
        return this.name
    }

    set setPoints(aux) {
        this.name = aux
    }

}