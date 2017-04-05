package com.example;

import java.util.List;

public interface RepositoryInterface {

    void addLog(String Country, String City) throws Exception;

    List<Log> listLog() throws Exception;

    }


