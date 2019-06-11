let domains = null;
let markers = [];

let map = null;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
    start()
}


function addMarkersByDomains() {
    fetch('domains_final.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonObj) {
            domains = jsonObj
            console.log(domains)
            domains.forEach((part, index, object) => {
                console.log("Currently processing " + index + "/" + domains.length + "...")
                markers[domains[index]["Domain Name"]] = new google.maps.Marker({
                    position: {lat: parseInt(domains[index]["Latitude"]), lng: parseInt(domains[index]["Longitude"])},
                    map: map,
                    title: domains[index]["Domain Name"]
                });
            })
            console.log(markers)
        });
}

function start() {
    addMarkersByDomains()
}