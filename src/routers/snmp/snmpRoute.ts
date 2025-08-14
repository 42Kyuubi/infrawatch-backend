import routers from "../index";
import {SNMPService} from "../../services/snmp/SNMPService";
/**
 * SNMP route
 *
 * It receives the target's IP address as parameter
 */

routers.get("snmp/:ip", (req, res) => {
	const ip = req.params.ip;
	const ipRegex = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
	if (!ipRegex.test(ip))
		return (res.status(404).send("Invalid ip address"));
	SNMPService.getInstance().getData(ip)
		.then((instance) => {
			console.log("Get Data Success" + instance);
		})
		.catch((err) => {
			console.log("Get Data Error: " + err);
		});
	res.status(200).send(`check console for ${ip} data`);
});

