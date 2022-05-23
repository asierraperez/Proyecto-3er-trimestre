/**
 * Objeto coche
 */
class Car extends general {
    /**
     * @param {string} name - Nombre del coche
     * @param {string} code - Código de referencia
     * @param {number} velocity - Atributo velocidad
     * @param {number} handling - Atributo manejo
     * @param {number} teamName - Nombre de la escudería a la que pertenece
     */
    constructor(name, code, velocity, handling, teamName) {
        super(name, code)
        this.velocity = velocity
        this.handling = handling
        this.teamName = teamName
    }

    get getVelocity() {
        return this.velocity
    }
    get getHandling() {
        return this.handling
    }
    get getTeamName() {
        return this.teamName
    }


    set setVelocity(aux) {
        this.velocity = aux
    }
    set setHandling(aux) {
        this.handling = aux
    }
    set setTeamName(aux) {
        this.teamName = aux
    }

    setAttributes() {
        //Velocidad aleatoria
        this.setVelocity = Math.floor(Math.random() * (101 - 0))
        //Manejo aleatoria
        this.setHandling = Math.floor(Math.random() * (101 - 0))
    }

}