let pin;
let myMap;
let lat;
let lng;
let userMarker;
let thumbDiv = document.getElementById('thumbs');
let loadingDiv = document.getElementById('loadingWrapper');

function initMap() {
    var nyc = {lat: 40.712784, lng: -74.005941};

    myMap = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: nyc,
    });

    getSpottings();

    if (navigator.geolocation) {
        userMarker = new google.maps.Marker({
            clickable: false,
            icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
                                              new google.maps.Size(22,22),
                                              new google.maps.Point(0,18),
                                              new google.maps.Point(11,11)),
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
        lng: lng,
    });
}

function handleFile(file) {
    if (!file) {
        return;
    }

    loadingDiv.style.display = 'flex';

    const formData = new FormData();

    formData.append('photo', file);
    if (lat) formData.append('latitude', lat);
    if (lng) formData.append('longitude', lng);

    fetch('https://api.andyspotting.com/spottings', {
        method: 'POST', body: formData
    })
        .then(response => response.json())
        .then((spotting) => {
            console.log(spotting);
            addSpotting(spotting);
            loadingDiv.style.display = 'none';
        })
        .catch((err) => {
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
                lng: Number(data.lng),
            },
            map: myMap,
        });
    } else {
        pin.setPosition({
            lat: Number(data.lat),
            lng: Number(data.lng),
        });
    }

    panMapToMarkers();
}

function addSpotting(spotting) {
    const thumb = document.createElement('img');

    thumb.src = spotting.image;
    thumb.width = 100;
    thumb.height = 100;
    thumb.dataset.lat = spotting.location.latitude;
    thumb.dataset.lng = spotting.location.longitude;

    thumb.onclick = () => { dropPin(thumb.dataset) };

    thumbDiv.insertBefore(thumb, thumbDiv.firstChild);

    dropPin(thumb.dataset);
}

function getSpottings() {
    fetch('https://api.andyspotting.com/spottings')
    .then(response => response.json())
    .then(spottings => {
        for (let i in spottings) {
            const spotting = spottings[i];
            const thumb = document.createElement('img');

            thumb.src = spotting.image;
            thumb.width = 100;
            thumb.height = 100;
            thumb.dataset.lat = spotting.location.latitude;
            thumb.dataset.lng = spotting.location.longitude;

            thumb.onclick = () => { dropPin(thumb.dataset) };

            thumbDiv.appendChild(thumb);

            if (!pin) {
                dropPin(thumb.dataset);
            }
        }
    })
    .then(spottings => {
        const img = thumbDiv.childNodes[0];

        if ( img.complete ) {
            imgLoaded();
        } else {
            img.addEventListener('load', imgLoaded);
        }
    })
    .catch(console.error);
}

function imgLoaded() {
    loadingDiv.style.display = 'none';
    thumbDiv.style.opacity = '1';
}

function panMapToMarkers() {
    let bounds = new google.maps.LatLngBounds();

    if(userMarker && userMarker.position) {
        bounds.extend(userMarker.position);
    }

    if(pin && pin.position) {
        bounds.extend(pin.position);
    }

    myMap.fitBounds(bounds);
    if (myMap.getZoom() >= 18) {
        myMap.setZoom(18);
    }
}
