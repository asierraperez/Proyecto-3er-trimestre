class Model {
    constructor() {
        this.drivers = []
        this.i = 0
    }

    addDriver() {
        const newDriver = new Driver()
        newDriver.setAttributes()
        newDriver.assignName(this.i)
        newDriver.assignCode(this.i)
        newDriver.assignSurname(this.i)
        newDriver.setPoints = 0
        this.drivers.push(newDriver)
        console.log(this.drivers)
        this.i++
    }

}