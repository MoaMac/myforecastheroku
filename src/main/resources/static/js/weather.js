// setTimeout(function timeOutFunction() { console.log("timeOutFunction()"); }, 50);
var forecastData;

function loadLocation(lat, lon) {
    var xhttp = new XMLHttpRequest();
    var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&APPID=30ae9cbe5da2955545ae212e144318e2&units=metric";
    xhttp.open("GET", url, false);
    xhttp.send();

    setFiveDayForecastData(JSON.parse(xhttp.responseText));
}

function setFiveDayForecastData(data) {
    console.log("raw data: ", data);

    // LOCATION INFORMATION
    var cityCountry = data.city.country;
    var cityName = data.city.name;

    // WEATHER INFORMATION
    var list = data.list;
    var now = new Date(0); // The 0 there is the key, which sets the date to the epoch
    var dt;
    var calendarDay = -1;
    var hour;
    var temp;
    var clouds;
    var wind;
    var weathersum;
    var weatherdesc;

    // CREATE NEW JSON OBJECT CONTAINING RELEVANT DATA ONLY
    var stringJson = null;
    var newCalendarDay = false;
    var firstDay = true;
    for (var i = 0; i < list.length; i++) {
        dt = list[i].dt;
        now = new Date(0);
        now.setUTCSeconds(dt);
        if (calendarDay != -1) {
            if (calendarDay != now.getUTCDate()) {
                newCalendarDay = true;
            } else {
                newCalendarDay = false;
            }
        }
        calendarDay = now.getUTCDate();
        hour = now.getUTCHours();

        temp = list[i].main.temp;
        clouds = list[i].clouds.all;
        wind = list[i].wind.speed;
        weathersum = list[i].weather[0].main;
        weatherdesc = list[i].weather[0].description;

        if (newCalendarDay || firstDay) {
            firstDay = false;
            if (stringJson != null) {
                stringJson += "}],";
            } else {
                stringJson = "{";
            }

            stringJson += "\"CD" + calendarDay + "\":[{\"H" + hour
                + "\":[{\"dt\":\"" + dt
                + "\",\"temp\":\"" + temp
                + "\",\"clouds\":\"" + clouds
                + "\",\"wind\":\"" + wind
                + "\",\"weathersum\":\"" + weathersum
                + "\",\"weatherdesc\":\"" + weatherdesc + "\"}]";
        } else {
            stringJson += ", \"H" + hour
                + "\":[{\"dt\":\"" + dt
                + "\",\"temp\":\"" + temp
                + "\",\"clouds\":\"" + clouds
                + "\",\"wind\":\"" + wind
                + "\",\"weathersum\":\"" + weathersum
                + "\",\"weatherdesc\":\"" + weatherdesc + "\"}]";
        }

        if(i == 0) {
            setCurrentWeatherDataInDOM(cityName, cityCountry, temp, clouds, wind, weathersum);
        }
    }

    stringJson += "}]}";

    forecastData = JSON.parse(stringJson);
    setFiveDayForecast(forecastData);
}

function setCurrentWeatherDataInDOM(cityName, cityCountry, temp, clouds, wind, weathersum) {
    document.getElementById("city").innerHTML = "City: " + cityName + ", " + cityCountry;
    document.getElementById("temp").innerHTML = "Temp: " + temp + "° C";
    document.getElementById("clouds").innerHTML = "Cloudiness: " + clouds + " %";
    document.getElementById("wind").innerHTML = "Wind speed: " + wind + " m/s";

    transmute(temp, weathersum);
}

function setFiveDayForecastDataInDOM(arrayAll, arrayAllWeather, rowNodesAll) {
    // FIRST ROW, not always full
    var row = 0;
    var todayArray = arrayAll[row];
    var todayArrayWeather = arrayAllWeather[row];
    var offset = 5 - todayArray.length;
    for(var d = 0; d < todayArray.length; d++) {
        rowNodesAll[row][d+1+offset].innerHTML = generateHTMLItemForFDWF(todayArray[d], getTempImage(todayArray[d], todayArrayWeather[d]));
        rowNodesAll[row][d+1+offset].style.backgroundColor = "#eeeeee";
    }

    // SECOND+ ROWS, always full
    for(var a = 1; a < arrayAll.length; a++) {
        for(var d = 0; d < arrayAll[a].length; d++) {
            rowNodesAll[a][d+1].innerHTML = generateHTMLItemForFDWF(arrayAll[a][d], getTempImage(arrayAll[a][d], arrayAllWeather[a][d]));
            rowNodesAll[a][d+1].style.backgroundColor = "#eeeeee";
        }
    }
}

function setFiveDayForecast(forecastData) {
    var calendarDays = setCalendarDays(forecastData);

    var date = new Date(0);

    var calendarDayData;
    var rowNodesAll = [getRowNodes(2), getRowNodes(3), getRowNodes(4), getRowNodes(5), getRowNodes(6)];
    for(var i = 0; i < rowNodesAll.length; i++) {
        date = new Date(0);
        date.setUTCSeconds(forecastData[calendarDays[i]][0]["H21"][0].dt);
        rowNodesAll[i][0].innerHTML = getStringDate(date);
        calendarDayData = forecastData[calendarDays[i]][0];

        var hours = [];
        var indexInner = 0;
        for (var hour in calendarDayData) {
            hours[indexInner] = hour;
            indexInner++;
        }
        indexInner = 0;
    }

    var calendarDays = setCalendarDays(forecastData);

    var hours;
    var arrayAll = [];
    var arrayDay = [];

    var arrayAllWeather = [];
    var arrayDayWeather = [];


    /* Calculate average temperature of the five day weather
     * forecast from hour 06 to hour 21, two hour points at
     * a time (average of temperature at hour 06 and hour 09,
     * average of hour 09 and 12 etc.) */
    var cdIndex = 0;
    hours = setHours(forecastData, calendarDays[cdIndex]);
    for(var h = 0; h < hours.length; h++) {
        if((h+1) < hours.length) {
            data1 = forecastData[calendarDays[cdIndex]][0][hours[h]][0];
            data2 = forecastData[calendarDays[cdIndex]][0][hours[h+1]][0];
            avg = Math.round((Number(data1.temp) + Number(data2.temp))/2);
            arrayDay[h] = avg;
            arrayDayWeather[h] = data1.weathersum;
        }
    }

    arrayAllWeather[0] = arrayDayWeather;
    arrayDayWeather = [];

    arrayAll[0] = arrayDay;
    arrayDay = [];
    for(cdIndex = 1; cdIndex < calendarDays.length; cdIndex++) {
        hours = setHours(forecastData, calendarDays[cdIndex]);
        for(var h = 0; h < hours.length; h++) {
            if(h > 1) {
                if((h+1) < hours.length) {
                    data1 = forecastData[calendarDays[cdIndex]][0][hours[h]][0];
                    data2 = forecastData[calendarDays[cdIndex]][0][hours[h+1]][0];
                    avg = Math.round((Number(data1.temp) + Number(data2.temp))/2);
                    arrayDay[h-2] = avg;
                    arrayDayWeather[h-2] = data1.weathersum;
                }
            }
        }

        arrayAllWeather[arrayAllWeather.length] = arrayDayWeather;
        arrayDayWeather = [];

        arrayAll[arrayAll.length] = arrayDay;
        arrayDay = [];
    }

    setFiveDayForecastDataInDOM(arrayAll, arrayAllWeather, rowNodesAll);
}

/// --- HELP FUNCTIONS --- ///
/* Get an array of the hours left of a specific
 * calendar day in the five day weather forecast */
function setHours(forecastData, calendarDay) {
    var hours = [];

    var index = 0;
    for (var h in forecastData[calendarDay][0]) {
        hours[index] = h;
        index++;
    }

    return hours;
}

/* Get an array of the calendar days in the
 *  current five day weather forecast */
function setCalendarDays(forecastData) {
    var calendarDays = [];

    var index = 0;
    for (var cDay in forecastData) {
        calendarDays[index] = cDay;
        index++;
    }

    return calendarDays;
}

/* Get the row nodes of a specific row in the five day
 * weather forecast component */
function getRowNodes(rowNumber) {
    var nodesArray = [];
    var tempArray = document.getElementById("row" + rowNumber).childNodes;

    var index = 0;
    for(var j = 0; j < tempArray.length; j++) {
        node = tempArray[j];
        // Only extract the divs of the component
        if(node.tagName == 'DIV') {
            nodesArray[index] = node;
            index++;
        }
    }
    return nodesArray;
}

/* Generate HTML for a five day weather forecast item
 * consisting of a div container with an image and a text */
function generateHTMLItemForFDWF(text, imgres) {
    return "<div id='avgicon'><img id='image' src='"+imgres+"'/><p id='text'>"+text+"</p></div>";
}

/// --- DATE FUNCTIONS --- ///
/* Get string date in format: DDDD, DD MMMM (i.e. Friday, 7 April)
 * https://msdn.microsoft.com/en-us/library/8kb3ddd4(v=vs.110).aspx */
function getStringDate(date) {
    return getStringWeekDay(date.getUTCDay()) + ", " + date.getUTCDate() + " " + getStringMonth(date.getUTCMonth());
}

function getStringWeekDay(weekDayNumber) {
    switch (weekDayNumber) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            alert("ERROR: Illegal week day number.")
            break;
    }
}

function getStringMonth(monthNumber) {
    switch (monthNumber) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
        default:
            alert("ERROR: Illegal month number.")
            break;
    }
}