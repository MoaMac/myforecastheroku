// setTimeout(function timeOutFunction() { console.log("timeOutFunction()"); }, 50);
var forecastData;

function loadLocation(lat, lon) {
    var xhttp = new XMLHttpRequest();
    var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&APPID=30ae9cbe5da2955545ae212e144318e2&units=metric";
    xhttp.open("GET", url, false);
    xhttp.send();

    setForecastData(JSON.parse(xhttp.responseText));
}

function setForecastData(data) {
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
            setCurrentForecastDataInDOM(cityName, cityCountry, temp, clouds, wind, weathersum);
        }
    }

    stringJson += "}]}";

    forecastData = JSON.parse(stringJson);
    setFiveDayForecastData();
}

function setFiveDayForecastData() {
    var calendarDays = setCalendarDays();
    var arrayAllRowsNodes = [getRowNodes(2), getRowNodes(3), getRowNodes(4), getRowNodes(5), getRowNodes(6)];

    setFDFDatesInDOM(arrayAllRowsNodes);

    var hours;
    var arrayTemperatures = [];
    var arrayRowTemperatures = [];

    var arrayWeatherSums = [];
    var arrayRowWeatherSums = [];

    /* Calculate average temperature of the five day weather forecast
     * from hour 06 to hour 21, two hour points at a time (i.e. average of
     * temperature at hour 06 and hour 09, average of hour 09 and 12 etc.) */
    var cdIndex = 0;
    var currentHour;
    var nextHour;
    hours = setHours(calendarDays[cdIndex]);
    for(var h = 0; h < hours.length; h++) {
        if((h+1) < hours.length) {
            currentHour = forecastData[calendarDays[cdIndex]][0][hours[h]][0];
            nextHour = forecastData[calendarDays[cdIndex]][0][hours[h+1]][0];
            avg = Math.round((Number(currentHour.temp) + Number(nextHour.temp))/2);
            arrayRowTemperatures[h] = avg;
            arrayRowWeatherSums[h] = currentHour.weathersum;
        }
    }

    arrayWeatherSums[0] = arrayRowWeatherSums;
    arrayRowWeatherSums = [];

    arrayTemperatures[0] = arrayRowTemperatures;
    arrayRowTemperatures = [];

    for(cdIndex = 1; cdIndex < calendarDays.length; cdIndex++) {
        hours = setHours(calendarDays[cdIndex]);
        for(var h = 0; h < hours.length; h++) {
            if(h > 1) {
                if((h+1) < hours.length) {
                    currentHour = forecastData[calendarDays[cdIndex]][0][hours[h]][0];
                    nextHour = forecastData[calendarDays[cdIndex]][0][hours[h+1]][0];
                    avg = Math.round((Number(currentHour.temp) + Number(nextHour.temp))/2);
                    arrayRowTemperatures[h-2] = avg;
                    arrayRowWeatherSums[h-2] = currentHour.weathersum;
                }
            }
        }

        arrayWeatherSums[arrayWeatherSums.length] = arrayRowWeatherSums;
        arrayRowWeatherSums = [];

        arrayTemperatures[arrayTemperatures.length] = arrayRowTemperatures;
        arrayRowTemperatures = [];
    }

    setFiveDayForecastDataInDOM(arrayTemperatures, arrayWeatherSums, arrayAllRowsNodes);
}

function setCurrentForecastDataInDOM(cityName, cityCountry, temp, clouds, wind, weathersum) {
    document.getElementById("city").innerHTML = "City: " + cityName + ", " + cityCountry;
    document.getElementById("temp").innerHTML = "Temp: " + temp + "° C";
    document.getElementById("clouds").innerHTML = "Cloudiness: " + clouds + " %";
    document.getElementById("wind").innerHTML = "Wind speed: " + wind + " m/s";

    transmute(temp, weathersum);
}

function setFiveDayForecastDataInDOM(arrayTemperatures, arrayWeatherSums, arrayAllRowsNodes) {
    var row = 0;
    var col = 0;

    // HANDLE FIRST ROW (TODAY'S WEATHER FORECAST)
    var arrayTodayTemperatures = arrayTemperatures[row];
    var arrayTodayWeatherSums = arrayWeatherSums[row];
    // offset required to position the data in correct column (when certain time period(s) has passed and the connected data is removed)
    var offset = 5 - arrayTodayTemperatures.length;
    for(col = 0; col < arrayTodayTemperatures.length; col++) {
        arrayAllRowsNodes[row][col+1+offset].innerHTML = generateHTMLItemForFDWF(arrayTodayTemperatures[col], getTempImage(arrayTodayWeatherSums[col]));
    }

    // HANDLE SECOND+ ROWS
    for(row = 1; row < arrayTemperatures.length; row++) {
        for(col = 0; col < arrayTemperatures[row].length; col++) {
            arrayAllRowsNodes[row][col+1].innerHTML = generateHTMLItemForFDWF(arrayTemperatures[row][col], getTempImage(arrayWeatherSums[row][col]));
        }
    }
}

function setFDFDatesInDOM(arrayAllRowsNodes) {
    var calendarDays = setCalendarDays();

    var date;
    for(var row = 0; row < arrayAllRowsNodes.length; row++) {
        date = new Date(0);
        date.setUTCSeconds(forecastData[calendarDays[row]][0]["H21"][0].dt);
        arrayAllRowsNodes[row][0].innerHTML = getStringDate(date);
    }
}

/// --- HELP FUNCTIONS --- ///
/* Get an array of the hours left of a specific
 * calendar day in the five day weather forecast */
function setHours(calendarDay) {
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
function setCalendarDays() {
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