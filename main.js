function main() {

    var settingsDrivers = {
        "async": true,
        "type": "GET",
        "url": "http://ergast.com/api/f1/2022/drivers.json"
    };

    var settingsConstructors = {
        "async": true,
        "type": "GET",
        "url": "http://ergast.com/api/f1/2022/constructors.json"
    };
    var responseDrivers
    var responseConstructor

    $.ajax(settingsDrivers).done(function (response) {

        console.log(response);
        responseDrivers = response.MRData.DriverTable.Drivers;
        console.log(responseDrivers)


        for (let i = 0; i < responseDrivers.length; i++) {
            var piloto = document.createElement("div")
            piloto.innerHTML = responseDrivers[i].givenName + " " + responseDrivers[i].familyName
            document.getElementsByTagName("body")[0].appendChild(piloto)

        }

    });

    $.ajax(settingsConstructors).done(function (response) {
        console.log(response);
        responseConstructor = response.MRData.ConstructorTable.Constructors;

        for (let i = 0; i < responseConstructor.length; i++) {
            var escuderia = document.createElement("div")
            escuderia.innerHTML = responseConstructor[i].name
            document.getElementsByTagName("body")[0].appendChild(escuderia)

        }

    });




}

main()