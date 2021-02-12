package com.rmaciel.itam.itam;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ItamController {
    
    @RequestMapping("/")
    public String index() {
        return "index";
    }
}
