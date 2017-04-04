var currentCoordinates = 0;
var map;
var marker;

function handleLocationError(browserHasGeolocation) {
    var errormsg = browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.';
    alert(errormsg);
}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 3
    });

    map.addListener('click', function (event) {
        currentCoordinates = {
            lat: event.latLng.lat(),
            lon: event.latLng.lng()
        };
        console.log(currentCoordinates);
        getWeather(currentCoordinates);
        map.panTo(event.latLng);
        map.setZoom(5);
        marker.setPosition(event.latLng);

    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            marker = new google.maps.Marker({
                position: pos,
                map: map
            });
            map.setCenter(pos);
            currentCoordinates = {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            };

            loadLocation(currentCoordinates.lat, currentCoordinates.lon);

            /* TESTING */
            /*
            //currentTimeForecast(currentCoordinates);
            testing5dayForecast(currentCoordinates);
            getSpecificForecastData(1, 18);
            */
            getWeather(currentCoordinates);

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function getWeather(currentCoordinates) {


    loadLocation(currentCoordinates.lat, currentCoordinates.lon);

    //testing5dayForecast(currentCoordinates);
    //getSpecificForecastData(1, 18);

}