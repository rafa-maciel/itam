package com.rmaciel.itam.itam;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ItamController {
    
    @RequestMapping("/")
    public String index() {
        return "redirect:/app";
    }

    @RequestMapping(value = {"/app*", "/app/**"})
    public String app() {
        return "index";
    }


}
