function main() {

    var settingsDrivers = {
        "async": true,
        "type": "GET",
        "url": "http://ergast.com/api/f1/2022/drivers.json"
    };


    $.ajax(settingsDrivers).done(function (response) {
        console.log(response);
        responseDrivers = response;

        for (let i = 0; i < response.MRData.DriverTable.Drivers.length; i++) {
            var piloto = document.createElement("div")
            piloto.innerHTML = response.MRData.DriverTable.Drivers[i].givenName + " " + response.MRData.DriverTable.Drivers[i].familyName
            document.getElementsByTagName("body")[0].appendChild(piloto)

        }

    });




}

main()