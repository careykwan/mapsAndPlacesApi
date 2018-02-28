 $(document).ready(function() {
    $('select').material_select();
  });
var submitBtn = document.getElementById('submit3');
var chosenKeyword = ['motel'];
var acomNames = [];
var acomAddress = [];

submitBtn.addEventListener('click', function getRadioChoice(){
  var chosenRadio = $('input[name=group1]:checked').val();
  chosenKeyword.push(chosenRadio);
  chosenKeyword.splice(0, 1);
    $('#name-details3').empty();
     $('#address-details3').empty();
  initMap();
  
  

}, false);


var map;
var infowindow;

function initMap() {
  var place = {lat: -41.28656, lng: 174.7762};

  map = new google.maps.Map(document.getElementById('map3'), {
    center: place,
    zoom: 9
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: place,
    radius: 30000,
    type: ['lodging'],
    keyword: chosenKeyword[0],
  }, callback);

}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      acomNames.push(results[i].name);
      acomAddress.push(results[i].vicinity);
       
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
    $('#name-details3').empty();
     $('#address-details3').empty();
    $('#name-details3').append(place.name);
    $('#address-details3').append(place.vicinity);
  });
}

