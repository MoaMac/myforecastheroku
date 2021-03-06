var currentCoordinates = 0;
var marker = null;
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 3
    });

    map.addListener('click', function (event) {
        currentCoordinates = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };

        loadLocation(currentCoordinates.lat, currentCoordinates.lng);

        map.panTo(event.latLng);
        map.setZoom(5);

        if(marker == null) {
            marker = new google.maps.Marker({
                position: {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                },
                map: map
            });
        } else {
            marker.setPosition(event.latLng);
        }

    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var currentCoordinates = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            marker = new google.maps.Marker({
                position: currentCoordinates,
                map: map
            });

            map.setCenter(currentCoordinates);

            loadLocation(currentCoordinates.lat, currentCoordinates.lng);
        }, function () {
            // Borgarfjordvägen 4, Stockholm
            var defaultCoordinates = {
                lat: 59.407363,
                lng: 17.946856
            };

            map.panTo(defaultCoordinates);
            map.setZoom(5);

            if(marker == null) {
                marker = new google.maps.Marker({
                    position: defaultCoordinates,
                    map: map
                });
            } else {
                marker.setPosition(defaultCoordinates);
            }

            loadLocation(defaultCoordinates.lat, defaultCoordinates.lng);
        });
    }
}