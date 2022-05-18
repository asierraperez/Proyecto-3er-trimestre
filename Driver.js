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
     */
    constructor(name, code, surname, luck, dexterity, points) {
        super(name, code)
        this.surname = surname
        this.luck = luck
        this.dexterity = dexterity
        this.points = points
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

    /**
     * Asignar atributos suerte y destreza
     * ambos son un numero aleatorio del 0 a 100
     * influiran en las carreras
     */
    setAttributes() {
        //Destreza aleatoria
        this.setDexterity(Math.floor(Math.random() * (101 - 0)) + 101)
        //Suerte aleatoria
        this.setLuck(Math.floor(Math.random() * (101 - 0)) + 101)
    }

    /**
     * Sumar puntos al piloto
     * @param {number} circuitPoints - Puntos obtenidos en la carrera
     */
    addPoints(circuitPoints) {
        this.setPoints(this.getPoints + circuitPoints)
    }
}