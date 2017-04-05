package com.example;

/**
 * Created by Administrator on 2017-04-05.
 */
public class Log {
    private String Country;
    private String CityName;

    public Log(String country, String cityName) {
        Country = country;
        CityName = cityName;

    }

    public String getCountry() {
        return Country;
    }

    public String getCityName() {
        return CityName;
    }

    public void setCountry(String country) {
        Country = country;
    }

    public void setCityName(String cityName) {
        CityName = cityName;
    }
}

