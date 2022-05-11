/**
 * Objeto Escudería
 */
class Team {
    /**
     * @param {string} name 
     * @param {string} nationality 
     */
    constructor(name, nationality) {
        this.name = name
        this.nationality = nationality
    }

    get getName() {
        return this.name
    }
    get getNationality() {
        return this.Nationality
    }

    set setName(aux) {
        this.name = aux
    }
    set setNationality(aux) {
        this.nationality = aux
    }

}