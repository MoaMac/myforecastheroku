package com.example;

/**
 * Created by Administrator on 2017-04-05.
 */
public class Log {
    private String Country;
    private String CityName;
    private Integer DUPES;


    public Log(String country, String cityName, Integer DUPES) {
        Country = country;
        CityName = cityName;
        this.DUPES = DUPES;

    }

    public String getCountry() {
        return Country;
    }
    public Integer getDUPES() {
        return DUPES;
    }
    public void setDUPES( Integer dupes) {
        DUPES = dupes;
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

