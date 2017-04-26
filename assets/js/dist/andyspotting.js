'use strict';

var pin = void 0;
var myMap = void 0;
var lat = void 0;
var lng = void 0;
var userMarker = void 0;
var thumbDiv = document.getElementById('thumbs');
var loadingDiv = document.getElementById('loadingWrapper');

function initMap() {
    var nyc = { lat: 40.712784, lng: -74.005941 };

    myMap = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: nyc
    });

    getSpottings();

    if (navigator.geolocation) {
        userMarker = new google.maps.Marker({
            clickable: false,
            icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png', new google.maps.Size(22, 22), new google.maps.Point(0, 18), new google.maps.Point(11, 11)),
            shadow: null,
            zIndex: 999,
            map: myMap
        });

        navigator.geolocation.watchPosition(updatePosition);
    }
}

function updatePosition(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    userMarker.setPosition({
        lat: lat,
        lng: lng
    });
}

function handleFile(file) {
    if (!file) {
        return;
    }

    loadingDiv.style.display = 'flex';

    var formData = new FormData();

    formData.append('photo', file);
    if (lat) formData.append('latitude', lat);
    if (lng) formData.append('longitude', lng);

    fetch('https://api.andyspotting.com/spottings', {
        method: 'POST', body: formData
    }).then(function (response) {
        return response.json();
    }).then(function (spotting) {
        console.log(spotting);
        addSpotting(spotting);
        loadingDiv.style.display = 'none';
    }).catch(function (err) {
        loadingDiv.style.display = 'none';
        alert('Something went wrong!');
        console.error(err);
    });
}

function dropPin(data) {
    if (!pin) {
        pin = new google.maps.Marker({
            position: {
                lat: Number(data.lat),
                lng: Number(data.lng)
            },
            map: myMap
        });
    } else {
        pin.setPosition({
            lat: Number(data.lat),
            lng: Number(data.lng)
        });
    }

    panMapToMarkers();
}

function addSpotting(spotting) {
    var thumb = document.createElement('img');

    thumb.src = spotting.image;
    thumb.width = 100;
    thumb.height = 100;
    thumb.dataset.lat = spotting.location.latitude;
    thumb.dataset.lng = spotting.location.longitude;

    thumb.onclick = function () {
        dropPin(thumb.dataset);
    };

    thumbDiv.insertBefore(thumb, thumbDiv.firstChild);

    dropPin(thumb.dataset);
}

function getSpottings() {
    fetch('https://api.andyspotting.com/spottings').then(function (response) {
        return response.json();
    }).then(function (spottings) {
        var _loop = function _loop(i) {
            var spotting = spottings[i];
            var thumb = document.createElement('img');

            thumb.src = spotting.image;
            thumb.width = 100;
            thumb.height = 100;
            thumb.dataset.lat = spotting.location.latitude;
            thumb.dataset.lng = spotting.location.longitude;

            thumb.onclick = function () {
                dropPin(thumb.dataset);
            };

            thumbDiv.appendChild(thumb);

            if (!pin) {
                dropPin(thumb.dataset);
            }
        };

        for (var i in spottings) {
            _loop(i);
        }
    }).then(function (spottings) {
        var img = thumbDiv.childNodes[0];

        if (img.complete) {
            imgLoaded();
        } else {
            img.addEventListener('load', imgLoaded);
        }
    }).catch(console.error);
}

function imgLoaded() {
    loadingDiv.style.display = 'none';
    thumbDiv.style.opacity = '1';
}

function panMapToMarkers() {
    var bounds = new google.maps.LatLngBounds();

    if (userMarker && userMarker.position) {
        bounds.extend(userMarker.position);
    }

    if (pin && pin.position) {
        bounds.extend(pin.position);
    }

    myMap.fitBounds(bounds);
    if (myMap.getZoom() >= 18) {
        myMap.setZoom(18);
    }
}