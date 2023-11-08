package com.example.springbootmsnotif.controller;

import com.example.card.model.CardDTO;
import com.example.springbootmsnotif.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class MsgEmitterRestController {

    @Autowired
    BusService busService;

    @RequestMapping(method = RequestMethod.POST, value = "/sendmsg")
    public boolean sendInform(@RequestBody String msg) {
        busService.sendMsg(msg);
        return true;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/sendmsg/{busName}")
    public boolean sendInform(@RequestBody String msg, @PathVariable String busName) {
        busService.sendMsg(msg,busName);
        return true;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/sendmsg/card")
    public boolean sendInform(@RequestBody CardDTO msg) {
        busService.sendMsg(msg);
        return true;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/sendmsg/card/{busName}")
    public boolean sendInform(@RequestBody CardDTO msg, @PathVariable String busName) {
        busService.sendMsg(msg,busName);
        return true;
    }
}
