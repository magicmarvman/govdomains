import { writeFileSync } from 'fs';
import chalk from "chalk";

import Nominatim from 'nominatim-geocoder';
const geocoder = new Nominatim()

import domains from "./../domains_raw.json";

domains.forEach((part, index, object) => {
    geocoder.search( { q: object[index]["City"] + ', ' + object[index]["State"] } )
    .then((response) => {
        domains[index]["Latitude"] = response[0]["lat"]
        domains[index]["Longitude"] = response[0]["lon"]
        domains[index]["OSM_Licence"] = response[0]["licence"]
        console.log(chalk.blue("Loading data ") + chalk.yellow(index) + chalk.blue(" of ") + chalk.yellow(domains.length) + chalk.blue("..."))
    })
    .catch((error) => {
        console.log(error)
    })
})

console.log(chalk.yellow("Saving to file..."))
writeFileSync("./../domains_final.json", JSON.stringify(domains, null, 4))
console.log(chalk.green.bold("Done!"))

