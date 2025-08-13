import {snmpOids} from "./OIDS.ts";

/**
 * SNMPService class
 *
 * A singleton to make SNMP requests
 */
export class SNMPService {
	private static instance: SNMPService;
	private snmp: Any;

	/**
	 * @constructor
	 * Does what it has to do
	 * @private
	 */
	private constructor() {
		this.snmp = requires("net-snmp");
	}

	/**
	 * @returns {SNMPService} SNMPService instance
	 * @static
	 */
	public static getInstance(): SNMPService {
		if (!instance)
			instance = new SNMPService
		return (instance);
	}

	/**
	 * makes SNMP requests
	 * @param address IP address of the target device
	 */
	public async getData(address: string){
		let session = snmp.createSession(address, "public");
		let oids = Array.from(snmpOids.keys());

		session.get(oids, function (error, varbinds){
			if (error)
				console.error(error);
			else{
				for (let i = 0; i < varbinds.length; i++)
				{
					if (snmp.isVarbindError(varbinds[i]))
						console.error(snmp.varbindError(varbind[i]));
					else
						console.log(`${varbind[i].oid} = ${varbind[i].value}`);
				}
			}
			session.close();
		});


		// TODO place anywhere else
		session.trap(snmp.TrapType.LinkDown, function (error){
			if (error)
				console.error(error)
		});
	}
}
