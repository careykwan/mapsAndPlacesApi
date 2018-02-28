var map2;
var infowindow2;

var searchBtn2 = document.getElementById('searchBtn2');
var enteredKeyword2 = ['food'];
var typeOfEstablishment2 = ['food'];


searchBtn2.addEventListener('click', function getUserInput2() {
    var userInputKeyword2 = document.getElementById('searchBar2').value;
    var userSelectedType2 = document.getElementById('establishmentSelect2').value;

    enteredKeyword2.push(userInputKeyword2);
    typeOfEstablishment2.push(userSelectedType2);

    enteredKeyword2.splice(0, 1);
    typeOfEstablishment2.splice(0, 1);

    $('#dataOuputContainer2').empty();

    initMap2();

}, false);

function initMap2() {
    var place2 = { lat: -41.220518, lng: 174.787949 };
    map2 = new google.maps.Map(document.getElementById('map2'), {
        center: place2,
        zoom: 9.5
    });

    infowindow2 = new google.maps.InfoWindow();
    var service2 = new google.maps.places.PlacesService(map2);

    service2.nearbySearch({
        location: place2,
        radius: 50000,
        types: typeOfEstablishment2,
        keyword: enteredKeyword2
    }, callback2);
}

function callback2(results, status) {
   
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker2(results[i]);
        }
    }else {
        var errorMessageWrapper2 = document.createElement('h3');
        errorMessageWrapper2.className = 'error-message-wrapper2';
        document.getElementById('dataOuputContainer2').appendChild(errorMessageWrapper2);

        var errorMessage2 = document.createTextNode('Sorry there are no results matching your search, please try again.');
        errorMessageWrapper2.appendChild(errorMessage2);
    }

    var searchData2 = results.map(function (data) {
        appendResultCards2(data);
    });
}



function createMarker2(place) {
    
    var placeLoc = place.geometry.location;
    var marker2 = new google.maps.Marker({
        map: map2,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker2, 'click', function () {
        infowindow2.setContent(place.name);
        infowindow2.open(map2, this);
    });
}

// @appendResultCards a function thst contains the appending element for the search result cards
function appendResultCards2(searchData) {
    var output2 = document.getElementById('dataOuputContainer2');
    var colorArray2 = ['#fc5c65', '#26de81', '#fd9644', '#45aaf2', '#2bcbba', '#fed330', '#4b6584', '#4b7bec', '#a55eea', '#747d8c', '#ffa502', '#ff7f50', '#ff6b81', '#a4b0be', '#2ed573', '#1e90ff', '#2f3542', '#e84118', '#8c7ae6', '#3742fa'];
    var count2 = 0;

    // creating div for search card
    var cardDiv2 = document.createElement('div');
    cardDiv2.className = 'card-wrapper2';
    output2.appendChild(cardDiv2);

    // creating colour tag
    var colorstrip2 = document.createElement('div');
    colorstrip2.className = 'card-color2';
    // to get different background colours in the colorstrip
    var colorstripHi2 = document.getElementsByClassName('card-color2');
    for (var i = 0; i < colorstripHi2.length; i++) {
        colorstripHi2[i].style.background = colorArray2[i];
    }
    cardDiv2.appendChild(colorstrip2);
    // creating text div wrapper
    var cardTextContainer2 = document.createElement('div');
    cardTextContainer2.className = 'card-text-container2';
    cardDiv2.appendChild(cardTextContainer2);

    var cardTextWrapper2 = document.createElement('div');
    cardTextWrapper2.className = 'card-text-wrapper2';
    cardTextContainer2.appendChild(cardTextWrapper2);
    
    // creating h1 element for card title
    var cardTitle2 = document.createElement('p');
    cardTitle2.className = 'card-Title2 text2';
    cardTextWrapper2.appendChild(cardTitle2);

    var titleName2 = document.createTextNode(searchData.name);
    cardTitle2.appendChild(titleName2);

    // adding address
    var cardAddress2 = document.createElement('p');
    cardAddress2.className = 'card-address2 text2';
    cardTextWrapper2.appendChild(cardAddress2);

    var addressTitle2 = document.createTextNode('Address: ');
    cardAddress2.appendChild(addressTitle2);

    var addressInfo2 = document.createElement('p');
    addressInfo2.className = 'address-info2 text2';
    cardTextWrapper2.appendChild(addressInfo2);

    var addressInfoContent2 = document.createTextNode(searchData.vicinity);
    addressInfo2.appendChild(addressInfoContent2);

    // adding rating
    var cardRating2 = document.createElement('p');
    cardRating2.className = 'card-rating2 text2';
    cardTextWrapper2.appendChild(cardRating2);

    var ratingTitle2 = document.createTextNode('Rating: ');
    cardRating2.appendChild(ratingTitle2);

    var ratingInfo2 = document.createElement('p');
    ratingInfo2.className = 'rating-info2 text2';
    cardTextWrapper2.appendChild(ratingInfo2);

    var ratingInfoContent2 = document.createTextNode(searchData.rating);
    ratingInfo2.appendChild(ratingInfoContent2);

}

// initilizing materialize select element
$(document).ready(function () {
    $('select').material_select();
});



