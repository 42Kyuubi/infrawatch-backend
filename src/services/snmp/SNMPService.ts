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
	 */
	public async getData(address: string): Promise<void> {
		let session = this.snmp.createSession(address, "public");
		let oids = Array.from(snmpOids.keys());

		session.get(oids, (error: any, varbinds: any) =>{
			if (error)
				console.error(error);
			else{
				for (let i = 0; i < varbinds.length; i++)
				{
					if (this.snmp.isVarbindError(varbinds[i]))
						console.error(this.snmp.varbindError(varbinds[i]));
					else
						console.log(`${varbinds[i].oid} = ${varbinds[i].value}`);
				}
			}
			session.close();
		});


		// TODO place anywhere else
		session.trap(this.snmp.TrapType.LinkDown, function (error: any){
			if (error)
				console.error(error)
		});
	}
}
