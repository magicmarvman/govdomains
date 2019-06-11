let domains = null;
let markers = [];

function loadFromJson() {
    fetch('domains_final.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonObj) {
            domains = jsonObj
            console.log(domains)
        });
}

function addMarkersByDomains() {
    geocoder =  new google.maps.Geocoder()
    domains.forEach((object) => {
        markers[object["Domain Name"]] = new google.maps.Marker({
            position: {lat: parseInt(object["Latitude"]), lng: parseInt(object["Longitude"])},
            map: map,
            title: object["Domain Name"]
        });
    })
}

function start() {
    loadFromJson()
    addMarkersByDomains()
}