var forecastData = null;

function getSpecificForecastData(monthDay, hour) {
    console.log("LOGGING FROM forecast.js METHOD getSpecificForecastData() START");

    if (forecastData == null) {
        console.log("LOG forecast.js getSpecificForecastData(...): ERROR! No forecast data saved.");
        return;
    }

    monthDay = "MD" + monthDay;
    hour = "H" + hour;

    //forecastData = JSON.parse(forecastData);


    var specificData;
    try {
        specificData = forecastData[monthDay][0][hour][0];
    } catch(err) {
        console.log("ERROR: ", err.message);
        return;
    }

    var data = {
        "temp": specificData.temp,
        "clouds": specificData.clouds,
        "wind": specificData.wind,
        "weathersum": specificData.weathersum,
        "weatherdesc": specificData.weatherdesc
    }

    console.log("DATA TEMP: ", data.temp);
    console.log("DATA CLOUDS: ", data.clouds);
    console.log("DATA WIND: ", data.wind);
    console.log("DATA WEATHER SUM: ", data.weathersum);
    console.log("DATA WEATHER DESCRIPTION: ", data.weatherdesc);

    console.log("LOGGING FROM forecast.js METHOD getSpecificForecastData() STOP");
    return data;
}

function getSpecificForecastDataNumbers(monthDay, hour) {
    //console.log("LOGGING FROM forecast.js METHOD getSpecificForecastDataNumbers() START");

    if (forecastData == null) {
        console.log("LOG forecast.js getSpecificForecastDataNumbers(...): ERROR! No forecast data saved.");
        return;
    }

    monthDay = monthDay;
    hour = hour;

    var specificData;
    try {
        specificData = forecastData[monthDay][0][hour][0];
    } catch(err) {
        console.log("ERROR: ", err.message);
        return;
    }

    var data = {
        "temp": specificData.temp,
        "clouds": specificData.clouds,
        "wind": specificData.wind,
        "weahtersum": specificData.weahtersum,
        "weatherdesc": specificData.weatherdesc
    }

    //console.log("LOGGING FROM forecast.js METHOD getSpecificForecastDataNumbers() STOP");
    return data;
}

/* TEST FUNCTIONS */
function testing5dayForecast(coordinates) {
    console.log("LOGGING FROM forecast.js METHOD testing5dayForecast() START");
    var xhttp = new XMLHttpRequest();
    var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + coordinates.lat + "&lon=" + coordinates.lon + "&APPID=30ae9cbe5da2955545ae212e144318e2&units=metric";
    console.log("url: ", url);
    xhttp.open("GET", url, false);
    xhttp.send();

    var data = JSON.parse(xhttp.responseText);
    console.log("data: ", data);

    // LOCATION INFORMATION
    var city = data.city;
    var cityCountry = city.country;
    var cityName = city.name;
    console.log("cityName: ", cityName, ", cityCountry: ", cityCountry);

    // WEATHER INFORMATION
    var list = data.list;
    var now = new Date(0); // The 0 there is the key, which sets the date to the epoch
    var monthDay = -1;
    var hour;
    var temp;
    var clouds;
    var wind;
    var weathersum;
    var weatherdesc;

    var stringJson = null;
    var newMonthDay = false;
    var firstDay = true;
    for (var i = 0; i < list.length; i++) {
        now = new Date(0);
        now.setUTCSeconds(list[i].dt);
        if (monthDay != -1) {
            if (monthDay != now.getUTCDate()) {
                newMonthDay = true;
            } else {
                newMonthDay = false;
            }
        }
        monthDay = now.getUTCDate();
        hour = now.getUTCHours();

        temp = list[i].main.temp;
        clouds = list[i].clouds.all;
        wind = list[i].wind.speed;
        weathersum = list[i].weather[0].main;
        weatherdesc = list[i].weather[0].description;

        console.log("Month day: " + monthDay, " hour: ", hour, ": ", temp, "C ", clouds, "% ", wind, " m/s ", weather);

        if (newMonthDay || firstDay) {
            firstDay = false;
            if (stringJson != null) {
                stringJson += "}],";
            } else {
                stringJson = "{";
            }

            stringJson += "\"MD" + monthDay + "\":[{\"H" + hour
                + "\":[{\"temp\":\"" + temp
                + "\",\"clouds\":\"" + clouds
                + "\",\"wind\":\"" + wind
                + "\",\"weathersum\":\"" + weathersum
                + "\",\"weatherdesc\":\"" + weatherdesc + "\"}]";
        } else {
            stringJson += ", \"H" + hour
                + "\":[{\"temp\":\"" + temp
                + "\",\"clouds\":\"" + clouds
                + "\",\"wind\":\"" + wind
                + "\",\"weathersum\":\"" + weathersum
                + "\",\"weatherdesc\":\"" + weatherdesc + "\"}]";
        }
    }

    stringJson += "}]}";
    forecastData = stringJson;

    console.log("THIS forecastData: ", forecastData);
    console.log("LOGGING FROM forecast.js METHOD testing5dayForecast() STOP");
}