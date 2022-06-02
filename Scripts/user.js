class User {
    constructor() {

        this.teamCode = ""
        this.codeFirstDiver = ""
        this.codeSecondDriver = ""

    }

    get getTeamCode() {
        return this.teamCode
    }
    get getCodeFirstDiver() {
        return this.codeFirstDiver
    }
    get getCodeSecondDriver() {
        return this.codeSecondDriver
    }

    set setTeamCode(aux) {
        this.teamCode = aux
    }
    set setCodeFirstDiver(aux) {
        this.codeFirstDiver = aux
    }
    set setCodeSecondDriver(aux) {
        this.codeSecondDriver = aux
    }
}
