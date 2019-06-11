let domains = null;
let markers = [];

function loadFromJson() {
    fetch('domains.json')
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
            position: myLatLng,
            map: map,
            title: object["Domain Name"]
        });
    })
}

function start() {
    loadFromJson()
    addMarkersByDomains()
}