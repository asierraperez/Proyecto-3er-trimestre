/**
 * Objeto Piloto
 */
class Driver {
    /**
     * @param {string} name - nombre del piloto
     * @param {string} surname - apellido 
     * @param {string} code - abreviatura, 3 caracteres
     * @param {string} team - escudería para la que compite
     */
    constructor(name, surname, code, team) {
        this.name = name
        this.surname = surname
        this.code = code
        this.team = team
    }

    get getName() {
        return this.name
    }
    get getSurname() {
        return this.surname
    }
    get getCode() {
        return this.code
    }
    get getTeam() {
        return this.team
    }

    set setName(aux) {
        this.name = aux
    }
    set setSurname(aux) {
        this.surname = aux
    }
    set setCode(aux) {
        this.code = aux
    }
    set setTeam(aux) {
        this.team = aux
    }
}