 $(document).ready(function() {
    $('select').material_select();
  });
     

var map;
var infowindow;

function initMap() {
  var place = {lat: -40.9006, lng: 174.8860};

  map = new google.maps.Map(document.getElementById('map3'), {
    center: place,
    zoom: 4
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: place,
    radius: 80000,
    type: ['lodging'],
    keyword: "backpackers"
  }, callback);

}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      console.log(results);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}