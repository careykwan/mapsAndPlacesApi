var map;
var infowindow;

var searchBtn = document.getElementById('searchBtn2');
var enteredKeyword = ['food'];
var typeOfEstablishment = ['food'];


searchBtn.addEventListener('click', function getUserInput() {
    var userInputKeyword = document.getElementById('searchBar2').value;
    var userSelectedType = document.getElementById('establishmentSelect2').value;
   
    enteredKeyword.push(userInputKeyword);
    typeOfEstablishment.push(userSelectedType);

    enteredKeyword.splice(0, 1);
    typeOfEstablishment.splice(0, 1);


    $('#dataOuputContainer2').empty();

    initMap();

}, false);



function initMap() {
    var place = { lat: -40.9006, lng: 174.8860 };
    map = new google.maps.Map(document.getElementById('map2'), {
        center: place,
        zoom: 8
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch({
        location: place,
        radius: 50000,
        types: typeOfEstablishment,
        keyword: enteredKeyword
    }, callback);
}

function callback(results, status) {
   
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        document.getElementById('errorMessage2').style.display = 'none';
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }else {
        // console.log('cannot connect to server');
        // alert('No results Aval');
        // $('.error-message-wrapper2').show();
        document.getElementById('errorMessage2').style.display = 'block';
    }

    var searchData = results.map(function (data) {
        appendResultCards(data);
    });
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

// @appendResultCards a function thst contains the appending element for the search result cards
function appendResultCards(searchData) {
    var output = document.getElementById('dataOuputContainer2');
    var colorArray = ['#fc5c65', '#26de81', '#fd9644', '#45aaf2', '#2bcbba', '#fed330', '#4b6584', '#4b7bec', '#a55eea', '#747d8c', '#ffa502', '#ff7f50', '#ff6b81', '#a4b0be', '#2ed573', '#1e90ff', '#2f3542', '#e84118', '#8c7ae6', '#3742fa'];
    var count = 0;

    // creating div for search card
    var cardDiv = document.createElement('div');
    cardDiv.className = 'card-wrapper2';
    output.appendChild(cardDiv);

    // creating colour tag
    var colorstrip = document.createElement('div');
    colorstrip.className = 'card-color2';
    // to get different background colours in the colorstrip
    var colorstripHi = document.getElementsByClassName('card-color2');
    for (var i = 0; i < colorstripHi.length; i++) {
        colorstripHi[i].style.background = colorArray[i];
    }
    cardDiv.appendChild(colorstrip);
    // creating text div wrapper
    var cardTextContainer = document.createElement('div');
    cardTextContainer.className = 'card-text-container2';
    cardDiv.appendChild(cardTextContainer);

    var cardTextWrapper = document.createElement('div');
    cardTextWrapper.className = 'card-text-wrapper2';
    cardTextContainer.appendChild(cardTextWrapper);
    
    // creating h1 element for card title
    var cardTitle = document.createElement('p');
    cardTitle.className = 'card-Title2';
    cardTextWrapper.appendChild(cardTitle);

    var titleName = document.createTextNode(searchData.name);
    cardTitle.appendChild(titleName);

    // adding address
    var cardAddress = document.createElement('p');
    cardAddress.className = 'card-address2';
    cardTextWrapper.appendChild(cardAddress);

    var addressTitle = document.createTextNode('Address: ');
    cardAddress.appendChild(addressTitle);

    var addressInfo = document.createElement('p');
    addressInfo.className = 'address-info2';
    cardTextWrapper.appendChild(addressInfo);

    var addressInfoContent = document.createTextNode(searchData.vicinity);
    addressInfo.appendChild(addressInfoContent);

    // adding rating
    var cardRating = document.createElement('p');
    cardRating.className = 'card-rating2';
    cardTextWrapper.appendChild(cardRating);

    var ratingTitle = document.createTextNode('Rating: ');
    cardRating.appendChild(ratingTitle);

    var ratingInfo = document.createElement('p');
    ratingInfo.className = 'rating-info2';
    cardTextWrapper.appendChild(ratingInfo);

    var ratingInfoContent = document.createTextNode(searchData.rating);
    ratingInfo.appendChild(ratingInfoContent);

}

// initilizing materialize select element
$(document).ready(function () {
    $('select').material_select();
});



