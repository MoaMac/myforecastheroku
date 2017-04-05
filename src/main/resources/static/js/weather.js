// setTimeout(function timeOutFunction() { console.log("timeOutFunction()"); }, 50);
var forecastData;

function loadLocation(lat, lon) {
    var xhttp = new XMLHttpRequest();
    var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&APPID=30ae9cbe5da2955545ae212e144318e2&units=metric";
    xhttp.open("GET", url, false);
    xhttp.send();

    /* DO NOT CHANGE THE ORDER OF THE BELOW FOLLOWING FUNCTIONS */
    setForecastData(JSON.parse(xhttp.responseText));
    var dictionary = setFiveDayForecastData();
    setFiveDayForecastDataInDOM(dictionary["temperatures"], dictionary["weatherSums"]);
    /* DO NOT CHANGE THE ORDER OF THE ABOVE FOLLOWING FUNCTIONS */
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
}

function setFiveDayForecastData() {
    var calendarDays = setCalendarDays();

    var hours;

    var arrayRowTemperatures = []; // Temporary storage containing all average temperatures of one row
    var arrayTemperatures = []; // Two-dimensional array containing arrays of temperatures of each row

    var arrayRowWeatherSums = []; // Temporary storage containing all current weather state of one row
    var arrayWeatherSums = []; // Two-dimensional array containing arrays of current weather state of each row

    var currentHourData;
    var nextHourData;
    for(var cdIndex = 0; cdIndex < calendarDays.length; cdIndex++) {
        hours = setHours(calendarDays[cdIndex]);
        for(var h = 0; h < hours.length; h++) {
            if((h+1) < hours.length) {
                // calculate average temperature of two following time periods' temperatures
                currentHourData = forecastData[calendarDays[cdIndex]][0][hours[h]][0];
                nextHourData = forecastData[calendarDays[cdIndex]][0][hours[h+1]][0];
                avg = Math.round((Number(currentHourData.temp) + Number(nextHourData.temp))/2);
                arrayRowTemperatures[(cdIndex > 0 && h > 1) ? h-2 : h] = avg;

                // save weather state for the first time period's temperature
                arrayRowWeatherSums[(cdIndex > 0 && h > 1) ? h-2 : h] = currentHourData.weathersum;
            }
        }

        arrayWeatherSums[arrayWeatherSums.length] = arrayRowWeatherSums;
        arrayRowWeatherSums = [];

        arrayTemperatures[arrayTemperatures.length] = arrayRowTemperatures;
        arrayRowTemperatures = [];
    }

    return {temperatures:arrayTemperatures, weatherSums:arrayWeatherSums};
}

function setCurrentForecastDataInDOM(cityName, cityCountry, temp, clouds, wind, weathersum) {
    document.getElementById("city").innerHTML = "City: " + cityName + ", " + cityCountry;
    document.getElementById("temp").innerHTML = "Temp: " + temp + "° C";
    document.getElementById("clouds").innerHTML = "Cloudiness: " + clouds + " %";
    document.getElementById("wind").innerHTML = "Wind speed: " + wind + " m/s";

    transmute(temp, weathersum);
}

function setFiveDayForecastDataInDOM(arrayTemperatures, arrayWeatherSums) {
    var arrayAllRowsNodes = [getRowNodes(2), getRowNodes(3), getRowNodes(4), getRowNodes(5), getRowNodes(6)];

    // SET DATES IN DOM
    var calendarDays = setCalendarDays();
    var date;
    for(var row = 0; row < arrayAllRowsNodes.length; row++) {
        date = new Date(0);
        date.setUTCSeconds(forecastData[calendarDays[row]][0]["H21"][0].dt);
        arrayAllRowsNodes[row][0].innerHTML = getStringDate(date);
    }

    // SET AVERAGE TEMPERATURE AND WEATHER IMAGE IN DOM
    var row = 0;
    var col = 0;

    // Handle first row (the today's weather forecast)
    var arrayTodayTemperatures = arrayTemperatures[row];
    var arrayTodayWeatherSums = arrayWeatherSums[row];
    // offset required to position the data in correct column (when certain time period(s) has passed and the connected data is removed)
    var offset = 5 - arrayTodayTemperatures.length;
    for(col = 0; col < arrayTodayTemperatures.length; col++) {
        arrayAllRowsNodes[row][col+1+offset].innerHTML = generateHTMLItemForFDWF(arrayTodayTemperatures[col], getTempImage(arrayTodayWeatherSums[col]));
    }

    // Handle second+ rows
    for(row = 1; row < arrayTemperatures.length; row++) {
        for(col = 0; col < arrayTemperatures[row].length; col++) {
            arrayAllRowsNodes[row][col+1].innerHTML = generateHTMLItemForFDWF(arrayTemperatures[row][col], getTempImage(arrayWeatherSums[row][col]));
        }
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