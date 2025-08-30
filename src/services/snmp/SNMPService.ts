import {snmpOids} from "./OIDs";

/**
 * SNMPService class
 *
 * A singleton to make SNMP requests
 */
export class SNMPService {
	private static instance: SNMPService;
	private snmp: any;

	/**
	 * @constructor
	 * Does what it has to do
	 * @private
	 */
	private constructor() {
		this.snmp = require("net-snmp");
	}

	/**
	 * @returns {SNMPService} SNMPService instance
	 * @static
	 */
	public static getInstance(): SNMPService {
		if (!this.instance)
			this.instance = new SNMPService();
		return (this.instance);
	}

	/**
	 * makes SNMP requests
	 * @param address IP address of the target device
	 * @returns {Promise<Map<string, string>>} a map with all collected details
	 */
	public async getData(address: string): Promise<Map<string, string>> {
		let session = this.snmp.createSession(address, "public");
		let oids = ["1.3.6.1.2.1.1.5.0", "1.3.6.1.2.1.1.6.0"]; //Array.from(snmpOids.keys());
		let map = new Map<string, string>();

		session.get(oids, (error: any, varbinds: any) =>{
			if (error)
				console.error(error);
			else{
				for (let i = 0; i < varbinds.length; i++)
				{
					if (this.snmp.isVarbindError(varbinds[i]))
						console.error(this.snmp.varbindError(varbinds[i]));
					else {
						console.log(`${varbinds[i].oid} = ${varbinds[i].value}`);
						// TODO make a more human-friendly map
						map.set(varbinds[i].oid, varbinds[i].value);
					}
				}
			}
			session.close();
		});


		// TODO place anywhere else
		session.trap(this.snmp.TrapType.LinkDown, function (error: any){
			if (error)
				console.error(error)
		});

		return (map);
	}
}
