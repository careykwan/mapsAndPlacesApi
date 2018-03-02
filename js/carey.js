var map;
var infowindow;
var selectedType = ['zoo'];

$(document).ready(function () {

$('ul li a').on('click', function () { 
  var item = $(this).parent().attr('value');
  console.log(selectedType);
  
  selectedType.push(item);
  selectedType.splice(0, 1);

  initMap();

});

});

function initMap() {
  var place = {lat: -41.2865, lng: 174.7762};

  map = new google.maps.Map(document.getElementById('map'), {
    center: place,
    zoom: 10
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: place,
    radius: 60000,
    type: selectedType,
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
    $('#instruct').empty();
    $('#name').empty();
    $('#address').empty();
    $('#rating').empty();
    $("#name").append(place.name);
    $("#address").append(place.vicinity);
    $("#rating").append('Rating: ' + place.rating);
    infowindow.open(map, this);
  });
}






