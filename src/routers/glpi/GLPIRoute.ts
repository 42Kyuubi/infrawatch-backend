import {Router} from "express";
import routers from "../index";
import {GLPIService, Ticket} from "../../services/glpi/GLPIService";

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
                    })
                    .finally(() => {
                        GLPIService.closeSession(appToken, sessionToken, apiUrl)
                    });
            }
        )
        .catch((err) => {
            return (res.status(500)).json("An error occurred when trying to retrieve session token")
        });
});

glpiRoute.post(endpoint, (req, res) => {
    let appToken = req.get("App-Token");
    let userToken = req.get("Authorization");
    let apiUrl = req.get("api-url");
    let ticketData = JSON.parse(req.body) as {name:string, content: string};
    if (!appToken || !userToken || !apiUrl || !ticketData)
        return (res.status(400).json("Check if App-Token, Authorization and api-url headers or token data are missing"));
    GLPIService.getSessionToken(appToken, userToken, apiUrl)
        .then((sessionToken) => {
                if(!sessionToken)
                    throw(Error);
                GLPIService.openTicket(appToken, sessionToken, apiUrl, ticketData.name, ticketData.content)
                    .then((result) => {
                        if(!result)
                            throw(Error);
                        return (res.status(200));
                    })
                    .catch((err) => {
                        return (res.status(500)).json("An error occurred when trying to open ticket")
                    })
                    .finally(() => {
                        GLPIService.closeSession(appToken, sessionToken, apiUrl)
                    });
            }
        )
        .catch((err) => {
            return (res.status(500)).json("An error occurred when trying to retrieve session token")
        });
});

export default glpiRoute;
