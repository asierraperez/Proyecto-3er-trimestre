/**
 * Objeto con los atributos comunes a todas las clases
 */
class general {
    /**
     * @param {string} name - Nombre
     * @param {string} code - Código de referencia
     */
    constructor(name, code) {
        this.name = name
        this.code = code
    }

    get getName() {
        return this.name
    }
    get getCode() {
        return this.code
    }
    set setName(aux) {
        this.name = aux
    }
    set setCode(aux) {
        this.code = aux
    }
}