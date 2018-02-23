var map;
var infowindow;

var searchBtn = document.getElementById('searchBtn2');
var enteredKeyword = ["coffee"];


searchBtn.addEventListener('click', function getUserInput() {
    var userInputKeyword = document.getElementById('searchBar2').value;
    enteredKeyword.push(userInputKeyword);
    enteredKeyword.splice(0, 1);
    initMap();
    console.log(enteredKeyword);
}, false);


function initMap() {
    var place = { lat: -40.9006, lng: 174.8860 };
    map = new google.maps.Map(document.getElementById('map2'), {
        center: place,
        zoom: 4
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch({
        location: place,
        radius: 50000,
        types: ["food"],
        keyword: enteredKeyword[0],
    }, callback);
} 

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }else {
        console.log("cannot connect to server");
        alert("No results Aval");
    }
    var getNames = results.map(function (a) { return a.name; });
    console.log(getNames);
}


function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });

}

$(document).ready(function () {
    $('select').material_select();
});


