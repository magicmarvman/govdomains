const fs = require('fs')
const chalk = require("chalk")

const secrets = require("./../secrets.json")

const Nominatim = require('nominatim-geocoder')
const geocoder = new Nominatim()

let domains = require("./../domains.json")

domains.forEach((part, index, object) => {
    geocoder.search( { q: object[index]["City"] + ', ' + object[index]["State"] } )
    .then((response) => {
        domains[index]["Latitude"] = response[0]["lat"]
        domains[index]["Longitude"] = response[0]["lon"]
        domains[index]["OSM_Licence"] = response[0]["licence"]
        console.log()
    })
    .catch((error) => {
        console.log(error)
    })
})

fs.writeFileSync("domains.json", JSON.stringify(domains, null, 4))

