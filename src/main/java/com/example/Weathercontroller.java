package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
public class Weathercontroller {
    private static final Logger logger = Logger.getLogger(Weathercontroller.class.getName());

    @Autowired
    RepositoryInterface repository;

    @GetMapping("/Log/{country}/{city}")
    public void addPos(@PathVariable String country,@PathVariable String city) throws Exception {
        System.out.println(city + country);
        repository.addLog(country, city);
        //logger.log(Level.INFO, "addPos");
    }
}
