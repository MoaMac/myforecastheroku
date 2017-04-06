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
    /*
     if (temp < -10) {
     return "img/033-weather-1.svg";
     } else if (-10 < temp && temp <= 0) {
     return "img/042-snowflake.svg"
     } else if (0 < temp && temp <=5) {
     return "img/040-windy.svg";
     } else if (5 < temp && temp <= 10) {
     return "img/048-cloud.svg";
     } else if (10 < temp && temp < 17) {
     return "img/045-rainbow.svg";
     } else if (17 < temp && temp < 23) {
     return "img/041-sun.svg";
     } else if (23< temp && temp < 40) {
     return "img/032-sea.svg";
     }
     */
}
function getBackground(weather) {
    switch (weather) {
        case "Clear":
            return "img/sunny-1.svg";
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
function getMessage(TemperatureArray, WeatherArray) {
    var totalTempFafa=0;
    var message = "";

    for(var i =0; i<TemperatureArray.length; i++){
        totalTempFafa = totalTempFafa + TemperatureArray[i];
    }

    var temp = totalTempFafa / (TemperatureArray.length);

    if (temp < -10) {
        message = "Holy crap, I can't feel my face degrees! Wear something warm!"
    } else if (-10 < temp && temp <= 0) {
        message = "I miss hating the summer heat. Don't forget your hat!";
    } else if (0 < temp && temp <= 5) {
        message = "Boring, cold weather. Wear something warm and colorful.";
    } else if (5 < temp && temp <= 10) {
        message = "Cloudy, with a 100% chance of greyness!";
    } else if (10 < temp && temp <= 17) {
        message = "Watch out for unicorns. Wear converse!";
    } else if (17 < temp && temp <= 23) {
        message = "Go out and eat ICECREAM!";
    } else if (23 < temp && temp < 40) {
        message = "Shame on you, guys! The weather is getting hotter than YOU!";
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
        imgClothing2 = "img2/016-fashion-1.svg"; //Uggs
        imgClothing3 = "img/013-jacket-1.svg"; //Dunjacka
        imgClothing4 = "img3/003-sweater.svg"; //Tjocktröja
        imgClothing5 = "img2/019-fashion.svg"; //Sockor
        message = "Holy crap, I can't feel my face degrees! Wear something warm!"
    } else if (-10 < temp && temp <= 0) {
        imgClothing2 = "img2/014-hat.svg"; //Mössa
        imgClothing3 = "img/010-boot.svg"; //Kängor
        imgClothing4 = "img2/015-christmas.svg"; //Halsduk
        imgClothing5 = "img2/024-mitten.svg"; //Vantar
        message = "I miss hating the summer heat. Don't forget your hat!";
    } else if (0 < temp && temp <= 5) {
        imgClothing2 = "img3/004-boot.svg";  //Boots vid skask
        imgClothing3 = "img3/006-coat.svg"; //Kappa
        imgClothing4 = "img3/005-winter-hat.svg"; //Mössa
        imgClothing5 = "img3/002-clothes.svg"; //Handskar
        message = "Boring, cold weather. Wear something warm and colorful.";
    } else if (5 < temp && temp <= 10) {
        imgClothing2 = "img2/006-jacket.svg";//Jacka
        imgClothing3 = "img/028-fashion.svg"; //Keps
        imgClothing4 = "img3/008-jeans.svg"; //Jeans
        imgClothing5 = "img/017-vest.svg"; //Väst
        message = "Cloudy, with a 100% chance of greyness!";
    } else if (10 < temp && temp < 17) {
        imgClothing2 = "img3/010-skirt.svg";  //Kjol
        imgClothing3 = "img3/009-socks.svg"; //Strumpbyxor
        imgClothing4 = "img/024-shoe.svg";//Converse
        imgClothing5 = "img3/007-coat-1.svg"; //Trenchcoat
        message = "Watch out for unicorns. Wear converse!";
    } else if (17 < temp && temp < 23) {
        imgClothing2 = "img2/011-dress.svg";  //Klänning
        imgClothing3 = "img2/007-denim-jacket.svg"; //denimjacket
        imgClothing4 = "img/015-fashion-2.svg"; //T-shirt
        imgClothing5 = "img/020-sunglasses.svg"; //Glasögon
        message = "Go out and eat ICECREAM!";
    } else if (23 < temp && temp < 40) {
        imgClothing2 = "img/023-fashion-1.svg";  //Bikini
        imgClothing3 = "img/016-swimsuit.svg"; //Badshorts
        imgClothing4 = "img2/013-bride-dress.svg"; //Mössa
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

// New methods added by Moa ///

function chooseClothes(temp) {
    var imgClothing2;
    if (temp < -10) {
        imgClothing2 = "img2/016-fashion-1.svg"; //Uggs
        imgClothing3 = "img/013-jacket-1.svg"; //Dunjacka
        imgClothing4 = "img3/003-sweater.svg"; //Tjocktröja
        imgClothing5 = "img2/019-fashion.svg"; //Sockor
        message = "Holy crap, I can't feel my face degrees! Wear something warm!"
    } else if (-10 < temp && temp <= 0) {
        imgClothing2 = "img2/014-hat.svg"; //Mössa
        imgClothing3 = "img/010-boot.svg"; //Kängor
        imgClothing4 = "img2/015-christmas.svg"; //Halsduk
        imgClothing5 = "img2/024-mitten.svg"; //Vantar
        message = "I miss hating the summer heat. Don't forget your hat!";
    } else if (0 < temp && temp <= 5) {
        imgClothing2 = "img3/004-boot.svg";  //Boots vid skask
        imgClothing3 = "img3/006-coat.svg"; //Kappa
        imgClothing4 = "img3/005-winter-hat.svg"; //Mössa
        imgClothing5 = "img3/002-clothes.svg"; //Handskar
        message = "Boring, cold weather. Wear something warm and colorful.";
    } else if (5 < temp && temp <= 10) {
        imgClothing2 = "img2/006-jacket.svg";//Jacka
        imgClothing3 = "img/028-fashion.svg"; //Keps
        imgClothing4 = "img3/008-jeans.svg"; //Jeans
        imgClothing5 = "img/017-vest.svg"; //Väst
        message = "Cloudy, with a 100% chance of greyness!";
    } else if (10 < temp && temp <= 17) {
        imgClothing2 = "img3/010-skirt.svg";  //Kjol
        imgClothing3 = "img3/009-socks.svg"; //Strumpbyxor
        imgClothing4 = "img/024-shoe.svg";//Converse
        imgClothing5 = "img3/007-coat-1.svg"; //Trenchcoat
        message = "Watch out for unicorns. Wear converse!";
    } else if (17 < temp && temp <= 23) {
        imgClothing2 = "img2/011-dress.svg";  //Klänning
        imgClothing3 = "img2/007-denim-jacket.svg"; //denimjacket
        imgClothing4 = "img/015-fashion-2.svg"; //T-shirt
        imgClothing5 = "img/020-sunglasses.svg"; //Glasögon
        message = "Go out and eat ICECREAM!";
    } else if (23 < temp && temp < 40) {
        imgClothing2 = "img/023-fashion-1.svg";  //Bikini
        imgClothing3 = "img/016-swimsuit.svg"; //Badshorts
        imgClothing4 = "img2/013-bride-dress.svg"; //Mössa
        imgClothing5 = "img/018-flip-flops.svg"; //Flipflopps
        message = "Shame on you, guys! The weather is getting hotter than YOU!";
    }
    return imgClothing2;
}


function chooseArrayClothes(temp) {
    var clothes = [];
    if (temp < -10) {
        clothes[0] = "img2/016-fashion-1.svg"; //Uggs
        clothes[1] = "img/013-jacket-1.svg"; //Dunjacka
        clothes[2] = "img3/003-sweater.svg"; //Tjocktröja
        message = "Holy crap, I can't feel my face degrees! Wear something warm!"
    } else if (-10 < temp && temp <= 0) {
        clothes[0] = "img2/014-hat.svg"; //Mössa
        clothes[1] = "img/010-boot.svg"; //Kängor
        clothes[2] = "img2/015-christmas.svg"; //Halsduk
        message = "I miss hating the summer heat. Don't forget your hat!";
    } else if (0 < temp && temp <= 5) {
        clothes[0] = "img3/004-boot.svg";  //Boots vid skask
        clothes[1] = "img3/006-coat.svg"; //Kappa
        clothes[2] = "img3/005-winter-hat.svg"; //Mössa
        message = "Boring, cold weather. Wear something warm and colorful.";
    } else if (5 < temp && temp <= 10) {
        clothes[0] = "img2/006-jacket.svg";//Jacka
        clothes[1] = "img/028-fashion.svg"; //Keps
        clothes[2] = "img3/008-jeans.svg"; //Jeans
        message = "Cloudy, with a 100% chance of greyness!";
    } else if (10 < temp && temp <= 17) {
        clothes[0] = "img3/010-skirt.svg";  //Kjol
        clothes[1] = "img3/009-socks.svg"; //Strumpbyxor
        clothes[2] = "img/024-shoe.svg";//Converse
        message = "Watch out for unicorns. Wear converse!";
    } else if (17 < temp && temp <= 23) {
        clothes[0] = "img2/011-dress.svg";  //Klänning
        clothes[1] = "img2/007-denim-jacket.svg"; //denimjacket
        clothes[2] = "img/015-fashion-2.svg"; //T-shirt
        message = "Go out and eat ICECREAM!";
    } else if (23 < temp && temp < 40) {
        clothes[0] = "img/023-fashion-1.svg";  //Bikini
        clothes[1] = "img/016-swimsuit.svg"; //Badshorts
        clothes[2] = "img2/013-bride-dress.svg"; //Mössa
        message = "Shame on you, guys! The weather is getting hotter than YOU!";
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
            return "img/048-cloud.svg";
            break;
        case "Snow":
            return "img/019-gloves.svg"
            break;
        default:
            return "img/pool-eight-ball.svg";
            break;
    }
}