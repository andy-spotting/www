let pin;
let myMap;
let thumbDiv = document.getElementById('thumbs');
let loadingDiv = document.getElementById('loadingWrapper');

function initMap() {
    var nyc = {lat: 40.712784, lng: -74.005941};

    myMap = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: nyc,
    });

    getSpottings();
}

function handleFile(file) {
    if (!file) {
        return;
    }

    loadingDiv.style.display = 'flex';

    const formData = new FormData();

    formData.append('photo', file);

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

    myMap.panTo({
        lat: Number(data.lat),
        lng: Number(data.lng),
    });

    myMap.setZoom(14);
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
