/**
 * Objeto coche
 */
class Car extends general {
    /**
     * @param {string} name - Nombre del coche
     * @param {string} code - Código de referencia
     * @param {number} velocity - Atributo velocidad
     * @param {number} handling - Atributo manejo
     */
    constructor(name, code, velocity, handling) {
        super(name, code)
        this.velocity = velocity
        this.handling = handling
    }

    get getVelocity() {
        return this.velocity
    }
    get getHandling() {
        return this.handling
    }
    set setVelocity(aux) {
        this.velocity = aux
    }
    set setHandling(aux) {
        this.handling = aux
    }

    setAttributes() {
        //Velocidad aleatoria
        this.setVelocity(Math.floor(Math.random() * (101 - 0)) + 101)
        //Manejo aleatoria
        this.setHandling(Math.floor(Math.random() * (101 - 0)) + 101)
    }

}