package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Controller
public class Weathercontroller {
    private static final Logger logger = Logger.getLogger(Weathercontroller.class.getName());

    @Autowired
    RepositoryInterface repository;

    @ResponseBody
    @GetMapping("/Log/{country}/{city}")
    public void addPos(@PathVariable String country,@PathVariable String city) throws Exception {
        System.out.println(city + country);
        repository.addLog(country, city);
        //logger.log(Level.INFO, "addPos");
    }

    @GetMapping("/login")
    public String form() {
        return "login";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session, HttpServletResponse res) {
        session.invalidate();
        Cookie cookie = new Cookie("jsessionid", "");
        cookie.setMaxAge(0);
        res.addCookie(cookie);
        return "redirect:/";
    }

    @PostMapping("/login")
    public String submit(HttpSession session, @RequestParam String username, @RequestParam String password) {
        if (username.equalsIgnoreCase("myforecast") && password.equalsIgnoreCase("myforecast") ) {
            session.setAttribute("user", username);

            return "redirect:statistics";
        }
        return "login";
    }

    @GetMapping("/statistics")
    public ModelAndView secret(HttpSession session) throws Exception {
        List<Log> Logs=repository.listLog();

        //session.setAttribute("user", );
        if (session.getAttribute("user") != null) {
            return new ModelAndView("statistics").addObject("Logs", Logs);
        }
        return new ModelAndView("login");
    }
}
