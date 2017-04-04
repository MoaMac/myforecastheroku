// setTimeout(function timeOutFunction() { console.log("timeOutFunction()"); }, 50);
var rowNodesAll;

function loadStaticDestiniation(city) {
    console.log("*** City: " + city);
    switch (city) {
        case "Tokyo":
            loadLocation(35.703129, 139.729015);
            break;
        case "Svalbard":
            loadLocation(77.553604, 23.670272);
            break;
        case "Alaska":
            loadLocation(61.2180556, 149.9002778);
            break;
        case "London":
            loadLocation(51.5073509, -0.1277583);
            break;
        case "Barcelona":
            loadLocation(41.3850639, 2.1734035);
            break;
        case "California":
            loadLocation(36.778261, -119.4179324);
            break;
        default:
            alert("The city \"" + city + "\" is not pre-set.");
            break;
    }
}

function loadLocation(lat, lon) {
    var xhttp = new XMLHttpRequest();
    var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&APPID=30ae9cbe5da2955545ae212e144318e2&units=metric";
    xhttp.open("GET", url, false);
    xhttp.send();

    var data = JSON.parse(xhttp.responseText);
    console.log("data: ", data);
    // LOCATION INFORMATION
    var cityCountry = data.city.country;
    var cityName = data.city.name;

    // WEATHER INFORMATION
    var list = data.list;
    var now = new Date(0); // The 0 there is the key, which sets the date to the epoch
    var dt;
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
        dt = list[i].dt;
        now = new Date(0);
        now.setUTCSeconds(dt);
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

        if (newMonthDay || firstDay) {
            firstDay = false;
            if (stringJson != null) {
                stringJson += "}],";
            } else {
                stringJson = "{";
            }

            stringJson += "\"MD" + monthDay + "\":[{\"H" + hour
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
            document.getElementById("city").innerHTML = "City: " + cityName + ", " + cityCountry;
            document.getElementById("temp").innerHTML = "Temp: " + temp + "° C";
            document.getElementById("clouds").innerHTML = "Cloudiness: " + clouds + " %";
            document.getElementById("wind").innerHTML = "Wind speed: " + wind + " m/s";

            transmute(temp, weathersum);
        }
        //console.log("Month day: " + monthDay, " hour: ", hour, ": ", temp, "C ", clouds, "% ", wind, " m/s ", weather);
    }

    stringJson += "}]}";
    forecastData = JSON.parse(stringJson);
    setFiveDayForecast(forecastData);
}

function getRowNodes(rowNumber) {
    var nodesArray = [];
    var tempArray = document.getElementById("row" + rowNumber).childNodes;
    var index = 0;
    for(var j = 0; j < tempArray.length; j++) {
        node = tempArray[j];
        if(node.tagName == 'DIV') {
            nodesArray[index] = node;
            index++;
        }
    }
    return nodesArray;
}

function setMonthDays(forecastData) {
    var monthDays = [];
    var index = 0;
    for (var monthDay in forecastData) {
        monthDays[index] = monthDay;
        index++;
        //console.log("monthDay: " + monthDay);
        // console.log("Value: " + forecastData[monthDay]);
    }
    return monthDays;
}

function getDay(date) {
    var weekDay = date.getUTCDay();
    var month = date.getUTCMonth();
    var monthDay = date.getUTCDate();

    switch (weekDay) {
        case 0:
            weekDay = "Sunday";
            break;
        case 1:
            weekDay = "Monday";
            break;
        case 2:
            weekDay = "Tuesday";
            break;
        case 3:
            weekDay = "Wednesday";
            break;
        case 4:
            weekDay = "Thursday";
            break;
        case 5:
            weekDay = "Friday";
            break;
        case 6:
            weekDay = "Saturday";
            break;
    }

    switch (month) {
        case 0:
            month = "January";
            break;
        case 1:
            month = "February";
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;
        default:
            month = "[MONTH NOT SET]";
            break;
    }

    return weekDay + ", " + monthDay + " " + month;
}

function setFiveDayForecast(forecastData) {
    console.log("forecastData: ", forecastData);
    var monthDays = setMonthDays(forecastData);

    var date = new Date(0);

    var monthDayData;
    rowNodesAll = [getRowNodes(2), getRowNodes(3), getRowNodes(4), getRowNodes(5), getRowNodes(6)];
    for(var i = 0; i < rowNodesAll.length; i++) {
        date = new Date(0);
        date.setUTCSeconds(forecastData[monthDays[i]][0]["H21"][0].dt);
        rowNodesAll[i][0].innerHTML = getDay(date);
        monthDayData = forecastData[monthDays[i]][0];

        var hours = [];
        var indexInner = 0;
        for (var hour in monthDayData) {
            hours[indexInner] = hour;
            indexInner++;
        }
        indexInner = 0;
    }

    averageTemp();
}

function setHours(forecastData, monthDay) {
    var hours = [];

    monthDayData = forecastData[monthDay][0];

    var indexInner = 0;
    for (var hour in monthDayData) {
        hours[indexInner] = hour;
        indexInner++;
    }

    return hours;
}

function averageTemp() {
    var monthDays = setMonthDays(forecastData);

    var data; 
    var hours;
    var arrayAll = [];
    var arrayDay = [];

    var arrayAllWeather = [];
    var arrayDayWeather = [];

    var md = 0;
    hours = setHours(forecastData, monthDays[md]);
    for(var h = 0; h < hours.length; h++) {
        if((h+1) < hours.length) {
            data1 = forecastData[monthDays[md]][0][hours[h]][0];
            data2 = forecastData[monthDays[md]][0][hours[h+1]][0];
            avg = Math.round((Number(data1.temp) + Number(data2.temp))/2);
            arrayDay[h] = avg;
            arrayDayWeather[h] = data1.weathersum;
        }
    }

    arrayAllWeather[0] = arrayDayWeather;
    arrayDayWeather = [];

    arrayAll[0] = arrayDay;
    arrayDay = [];
    for(md = 1; md < monthDays.length; md++) {
        hours = setHours(forecastData, monthDays[md]);
            for(var h = 0; h < hours.length; h++) {
                if(h > 1) {
                    if((h+1) < hours.length) {
                        data1 = forecastData[monthDays[md]][0][hours[h]][0];
                        data2 = forecastData[monthDays[md]][0][hours[h+1]][0];
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

    setaFiveDayForecastDataInHTML(arrayAll, arrayAllWeather);
}

function setaFiveDayForecastDataInHTML(arrayAll, arrayAllWeather) {
    // FIRST ROW, not always full
    var row = 0;
    var todayArray = arrayAll[row];
    var todayArrayWeather = arrayAllWeather[row];
    var offset = 5 - todayArray.length;
    for(var d = 0; d < todayArray.length; d++) {
        rowNodesAll[row][d+1+offset].innerHTML = generateInnerHTML(todayArray[d], getTempImage(todayArray[d], todayArrayWeather[d]));
        rowNodesAll[row][d+1+offset].style.backgroundColor = "#eeeeee";
    }

    // SECOND+ ROWS, always full
    for(var a = 1; a < arrayAll.length; a++) {
        for(var d = 0; d < arrayAll[a].length; d++) {
            rowNodesAll[a][d+1].innerHTML = generateInnerHTML(arrayAll[a][d], getTempImage(arrayAll[a][d], arrayAllWeather[a][d]));
            rowNodesAll[a][d+1].style.backgroundColor = "#eeeeee";
        }
    }
}

function generateInnerHTML(text, imgres) {
    return "<div id='avgicon'><img id='image' src='"+imgres+"'/><p id='text'>"+text+"</p></div>";
}