import {Router} from "express";
import routers from "../index";
import {SNMPService} from "../../services/snmp/SNMPService";

const snmpRoute = Router();

/**
 * SNMP route
 *
 * It receives the target's IP address as parameter
 */

snmpRoute.get("/:ip", (req, res) => {
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
