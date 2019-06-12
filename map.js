let domains = null;
let markers = [];

let map = null;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
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
                    position: {
                        lat: parseInt(domains[index]["Latitude"]),
                        lng: parseInt(domains[index]["Longitude"])
                    },
                    map: map,
                    title: domains[index]["Domain Name"]
                });
                markers[domains[index]["Domain Name"]].infowindow = new google.maps.InfoWindow({
                    content: ''+
                    '<div id="content">'+
                    '<p><b>' + domains[index]["Domain Name"] + '</b></p>'+
                    '<p>'+
                    '<b>Type:</b> ' + domains[index]["Domain Type"] + '<br>'+
                    '<b>Agency:</b> ' + domains[index]["Agency"] + '<br>'+
                    '<b>Organization:</b> ' + domains[index]["Organization"] + '<br>'+
                    '<b>Location:</b> ' + domains[index]["City"] + ', ' + domains[index["State"]] + '<br>'+
                    '</p>'+
                    '</div>'
                });
                markers[domains[index]["Domain Name"]].addListener(() => {
                    markers[domains[index]["Domain Name"]].infowindow.open(map, markers[domains[index]["Domain Name"]])
                })
            })
            console.log(markers)
        });
}

function start() {
    addMarkersByDomains()
}