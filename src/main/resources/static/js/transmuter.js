function getTempImage(weather) {
    switch (weather) {
        case "Clear":
            return "img/041-sun.svg";
            break;
        case "Rain":
            return "img/044-rain.svg";
            break;
        case "Clouds":
            return "img/048-cloud.svg";
            break;
        case "Snow":
            return "img/042-snowflake.svg"
            break;
        default:
            return "img/pool-eight-ball.svg";
            break;
    }
}
function getBackground(weather) {
    switch (weather) {
        case "Clear":
            return "img/bluesky1-1.svg";
            break;
        case "Rain":
            return "img/rain1-1.svg";
            break;
        case "Clouds":
            return "img/cloudy-1.svg";
            break;
        case "Snow":
            return "img/snow-1.svg"
            break;
        default:
            return "img/cloudy-1.svg";
            break;
    }
}

// new getMessage function TEST ///
function getMessage(TemperatureArray, WeatherArray) {
    var totalTemp = 0;
    var message = "";
    for (var i = 0; i < TemperatureArray.length; i++) {
        totalTemp = totalTemp + TemperatureArray[i];
    }
    var temp = totalTemp / (TemperatureArray.length);

    if (temp < -10) {
        message += "Holy crap, I can't feel my face degrees! Wear something really warm!"
    } else if (-10 < temp && temp <= 0) {
        message += "I miss hating the summer heat. It's gonna be cold today, dress warm!";
    } else if (0 < temp && temp <= 3) {
        message += "Wear a warm jacket and several layers. A hat and some gloves would be a good idea.";
    } else if (3 < temp && temp <= 5) {
        message += "Pretty cold today. Wear layer on layer and a warm jacket. Not time for those light shoes today!";
    } else if (5 < temp && temp <= 7) {
        message += "Perfect weather for knitted sweaters.";
    } else if (7 < temp && temp <= 10) {
        message += "A bit chilly, but not too cold. You will do good with a warm sweater and a light jacket.";
        console.log("Here")
    } else if (10 < temp && temp <= 14) {
        message += "Leave the heavy jacket at home.";
    } else if (14 < temp && temp <= 17) {
        message += "Warm enough to wear that light jacket and those summer shoes.";
    } else if (17 < temp && temp <= 20) {
        message += "You probably don't need a jacket today, but bring a sweater. Wear your light shoes.";
    } else if (20 < temp && temp <= 23) {
        message += "Nice and warm today. Wear something light and sweat proof. Time for sandals!";
    } else if (23 < temp && temp < 40) {
        message += "Shame on you, guys! The weather is getting hotter than YOU! " +
            "Wear something light and protect yourself against the sun!";
    }
    var rainy = "";
    var sunny = "";
    for (var i = 0; i < WeatherArray.length; i++) {
        if (WeatherArray[i].toLowerCase() === 'rain') {
            rainy = "true";
        }
        if (WeatherArray[i].toLowerCase() === 'clear') {
            sunny = "true";
        }
    }
    if (rainy) {
        message += " Don't wear your suede shoes, it's going to rain today!";
    } else if (temp > 10) {
        message += " You could wear your suede shoes today!"
    }
    if (sunny) {
        message += " And don't forget your sunglasses!"
    }

    return message;
}

function transmute(temp, weather) {
    var message = "";
    var imgWeather;
    var imgClothing1;
    var imgClothing2;
    var imgClothing3;
    var imgClothing4;
    var imgClothing5;

    switch (weather) {
        case "Clear":
            imgWeather = "img/041-sun.svg";
            break;
        case "Rain":
            imgWeather = "img/044-rain.svg";
            break;
        case "Clouds":
            imgWeather = "img/048-cloud.svg";
            break;
        case "Snow":
            imgWeather = "img/042-snowflake.svg"
            break;
        default:
            imgWeather = "img/pool-eight-ball.svg";
            break;
    }

    if (temp < -10) {
        imgClothing2 = "img/016-fashion-1.svg"; //Uggs
        imgClothing3 = "img/013-jacket-1.svg"; //Dunjacka
        imgClothing4 = "img/003-sweater.svg"; //Tjocktröja
        imgClothing5 = "img/019-fashion.svg"; //Sockor
        message = "Holy crap, I can't feel my face degrees! Wear something warm!"
    } else if (-10 < temp && temp <= 0) {
        imgClothing2 = "img/014-hat.svg"; //Mössa
        imgClothing3 = "img/010-boot.svg"; //Kängor
        imgClothing4 = "img/015-christmas.svg"; //Halsduk
        imgClothing5 = "img/024-mitten.svg"; //Vantar
        message = "I miss hating the summer heat. Don't forget your hat!";
    } else if (0 < temp && temp <= 5) {
        imgClothing2 = "img/004-boot.svg";  //Boots vid skask
        imgClothing3 = "img/006-coat.svg"; //Kappa
        imgClothing4 = "img/005-winter-hat.svg"; //Mössa
        imgClothing5 = "img/002-clothes.svg"; //Handskar
        message = "Boring, cold weather. Wear something warm and colorful.";
    } else if (5 < temp && temp <= 10) {
        imgClothing2 = "img/006-jacket.svg";//Jacka
        imgClothing3 = "img/028-fashion.svg"; //Keps
        imgClothing4 = "img/008-jeans.svg"; //Jeans
        imgClothing5 = "img/017-vest.svg"; //Väst
        message = "Cloudy, with a 100% chance of greyness!";
    } else if (10 < temp && temp < 17) {
        imgClothing2 = "img/010-skirt.svg";  //Kjol
        imgClothing3 = "img/009-socks.svg"; //Strumpbyxor
        imgClothing4 = "img/024-shoe.svg";//Converse
        imgClothing5 = "img/007-coat-1.svg"; //Trenchcoat
        message = "Watch out for unicorns. Wear converse!";
    } else if (17 < temp && temp < 23) {
        imgClothing2 = "img/011-dress.svg";  //Klänning
        imgClothing3 = "img/007-denim-jacket.svg"; //denimjacket
        imgClothing4 = "img/015-fashion-2.svg"; //T-shirt
        imgClothing5 = "img/020-sunglasses.svg"; //Glasögon
        message = "Go out and eat ICECREAM!";
    } else if (23 < temp && temp < 40) {
        imgClothing2 = "img/023-fashion-1.svg";  //Bikini
        imgClothing3 = "img/016-swimsuit.svg"; //Badshorts
        imgClothing4 = "img/013-bride-dress.svg"; //Mössa
        imgClothing5 = "img/018-flip-flops.svg"; //Flipflopps
        message = "Shame on you, guys! The weather is getting hotter than YOU!";
    }

    document.getElementById("img1").setAttribute("src", imgWeather);
    document.getElementById("img2").setAttribute("src", imgClothing2);
    document.getElementById("img3").setAttribute("src", imgClothing3);
    document.getElementById("img4").setAttribute("src", imgClothing4);
    document.getElementById("img5").setAttribute("src", imgClothing5);
    document.getElementById("message").innerHTML = message;
}


function chooseClothes(temp) {
    var imgClothing;
    if (temp < -10) {
        imgClothing = "img/013-jacket-1.svg"; //Dunjacka
    } else if (-10 < temp && temp <= 0) {
        imgClothing = "img/010-boot.svg"; //Kängor
    } else if (0 < temp && temp <= 5) {
        imgClothing = "img/006-coat.svg"; //Kappa
    } else if (5 < temp && temp <= 10) {
        imgClothing = "img/003-sweater.svg"; //Tjocktröja
    } else if (10 < temp && temp <= 17) {
        imgClothing = "img/007-denim-jacket.svg";  //denimjacket
    } else if (17 < temp && temp <= 23) {
        imgClothing = "img/015-fashion-2.svg"; //T-shirt
    } else if (23 < temp && temp < 40) {
        imgClothing = "img/023-fashion-1.svg";  //Bikini
    }
    return imgClothing;
}

function chooseArrayClothes(temp) {
    var clothes = [];
    if (temp < -10) {
        clothes[0] = "img/016-fashion-1.svg"; //Uggs
        clothes[1] = "img/013-jacket-1.svg"; //Dunjacka
        clothes[2] = "img/003-sweater.svg"; //Tjocktröja
    } else if (-10 < temp && temp <= 0) {
        clothes[0] = "img/014-hat.svg"; //Mössa
        clothes[1] = "img/010-boot.svg"; //Kängor
        clothes[2] = "img/015-christmas.svg"; //Halsduk
    } else if (0 < temp && temp <= 5) {
        clothes[0] = "img/004-boot.svg";  //Boots vid slask
        clothes[1] = "img/006-coat.svg"; //Kappa
        clothes[2] = "img/005-winter-hat.svg"; //Mössa
    } else if (5 < temp && temp <= 7) {
        clothes[0] = "img/014-hat.svg"; //Mössa
        clothes[1] = "img/006-jacket.svg";//Jacka
        clothes[2] = "img/008-jeans.svg"; //Jeans
    }
    else if (7 < temp && temp <= 10) {
        clothes[0] = "img/015-christmas.svg"; //Halsduk
        clothes[1] = "img/006-jacket.svg";//Jacka
        clothes[2] = "img/008-jeans.svg"; //Jeans
    }
    else if (10 < temp && temp <= 17) {
        clothes[0] = "img/017-vest.svg"; // väst
        clothes[1] = "img/028-fashion.svg"; //Keps
        clothes[2] = "img/008-jeans.svg"; //Jeans
    } else if (17 < temp && temp <= 23) {
        clothes[0] = "img/011-dress.svg";  //Klänning
        clothes[1] = "img/007-denim-jacket.svg"; //denimjacket
        clothes[2] = "img/015-fashion-2.svg"; //T-shirt
    } else if (23 < temp && temp < 40) {
        clothes[0] = "img/023-fashion-1.svg";  //Bikini
        clothes[1] = "img/016-swimsuit.svg"; //Badshorts
        clothes[2] = "img/013-bride-dress.svg"; //Mössa
    }
    return clothes;
}

function chooseAccessories(weather) {
    switch (weather) {
        case "Clear":
            return "img/020-sunglasses.svg";
            break;
        case "Rain":
            return "img/043-umbrella.svg";
            break;
        case "Clouds":
            return "img/024-shoe.svg";
            break;
        case "Snow":
            return "img/019-gloves.svg"
            break;
        default:
            return "img/pool-eight-ball.svg";
            break;
    }
}