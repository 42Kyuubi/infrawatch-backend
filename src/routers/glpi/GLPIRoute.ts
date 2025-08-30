import {Router} from "express";
import routers from "../index";
import {GLPIService} from "../../services/glpi/GLPIService";

const glpiRoute = Router();

/**
 * GLPI routes
 *
 *
 */

const endpoint = "/ticket"

glpiRoute.get(endpoint, (req, res) => {
    let appToken = req.get("App-Token");
    let userToken = req.get("Authorization");
    let apiUrl = req.get("api-url");
    if (!appToken || !userToken || !apiUrl)
        return (res.status(400).json("Check if App-Token, Authorization and api-url headers are missing"));
    GLPIService.getSessionToken(appToken, userToken, apiUrl)
        .then((sessionToken) => {
                if(!sessionToken)
                    throw(Error);
                GLPIService.getTickets(appToken, sessionToken, apiUrl)
                    .then((tickets) => {
                        if(!tickets)
                            throw(Error);
                        return (res.status(200).json(tickets));
                    })
                    .catch((err) => {
                        return (res.status(500)).json("An error occurred when trying to retrieve tickets")
                    });
            }
        )
        .catch((err) => {
            return (res.status(500)).json("An error occurred when trying to retrieve session token")
        });
});

glpiRoute.post(endpoint, (req, res) => {
    const ip = req.params.ip;
    const ipRegex = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
    if (!ipRegex.test(ip))
        return (res.status(400).json("Invalid ip address"));
    SNMPService.getInstance().getData(ip)
        .then((map) => {
            console.log("Get Data Success!");
            res.status(200).json(JSON.stringify(map));
        })
        .catch((err) => {
            res.status(500).json("Error Getting Device's  Data: " + err);
        });
});

export default snmpRoute;
