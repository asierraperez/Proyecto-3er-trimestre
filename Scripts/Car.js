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

    /**
     * Asignar atributos velocidad y manejo
     * ambos son un numero aleatorio del 0 a 100
     * influiran en las carreras
     */
    setAttributes() {
        //Velocidad aleatoria
        this.setVelocity = Math.floor(Math.random() * (101 - 0))
        //Manejo aleatoria
        this.setHandling = Math.floor(Math.random() * (101 - 0))
    }
    /**
     * Subir datos del objeto a BD
     */
    uploadCarToDB() {
        $.ajax({
            data: {
                "name": this.getName,
                "code": this.getCode,
                "velocity": this.getVelocity,
                "handling": this.getHandling,
                "teamID": this.teamName
            },
            url: "insertCar.php",
            type: "POST",
            success: function (response) {
                console.log(response)
            }
        })
    }

}