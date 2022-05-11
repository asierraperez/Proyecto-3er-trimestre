/**
 * Objeto Escudería
 */
class Team {
    /**
     * @param {string} name - nombre de la escudería
     * @param {string} nationality - nacionalidad
     * @param {string} driver1 - nombre del primer piloto
     * @param {string} driver2 - nombre del segundo piloto
     */
    constructor(name, nationality, driver1, driver2) {
        this.name = name
        this.nationality = nationality
        this.driver1 = driver1
        this.driver2 = driver2
    }

    get getName() {
        return this.name
    }
    get getNationality() {
        return this.Nationality
    }
    get getDriver1() {
        return this.driver1
    }
    get getDriver2() {
        return this.driver2
    }

    set setName(aux) {
        this.name = aux
    }
    set setNationality(aux) {
        this.nationality = aux
    }
    set setDriver1(aux) {
        this.driver1 = aux
    }
    set setDriver2(aux) {
        this.driver2 = aux
    }

}