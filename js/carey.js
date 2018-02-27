var map;
var infowindow;
var selectedType = ['zoo'];
// console.log(selectedType);
// var select = document.querySelectorAll(".lists > li"),
// console.log(selectedType);

// butt.addEventListener('click', function getInput(){
//   // var usersSelection = document.getElementById('hello').value;
//   var usersSelection = document.querySelectorAll('li').attr('choose').value;

//   // var usersSelection = document.getElementsByClassName('choose').text;
// //   var i;
// //   for (i = 0; i < usersSelection.length; i++) {
// //     usersSelection[i].value;
// // }
  
//   selectedType.push(usersSelection);
//   console.log(selectedType);
//   selectedType.splice(0);

//   initMap();

// }, false);

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
    rating: 5[1],
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



//this is for the selectable options jquery ui
$('#selectable').selectable();

$('#selectableTwo').selectable();


// Psuedo code:

// 1.select option
// 2. push option into array
// 3. access array
// 4. access array and put into type in map
// 5. display marker
// 6. new option selected, clear option before


