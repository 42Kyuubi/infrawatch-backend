/**
 * SNMP OIDS
 *
 * A map of relevant OIDs according to MIB-2 Standard
 * The oids are separated between System and Interface, but everything is
 * requested together.
 */
export const snmpOids = new Map<string, string>([
	// === System OIDs (MIB-2 systemGroup) ===
	['systemDescription', '1.3.6.1.2.1.1.1.0'],
	['name', '1.3.6.1.2.1.1.5.0'],
	['upTime', '1.3.6.1.2.1.1.3.0'],
	['contactInfo', '1.3.6.1.2.1.1.4.0'],
	['location', '1.3.6.1.2.1.1.6.0'],
	['services', '1.3.6.1.2.1.1.7.0'],
	['processorLoad', '1.3.6.1.2.1.25.3.3.1.2'],
	['memorySize', '1.3.6.1.2.1.25.2.2.0'],
	['memoryUsage', '1.3.6.1.2.1.25.2.3.1.6'],
	['trapAddress', '1.3.6.1.2.1.2.2.1.4'],

	// === Interface OIDs (MIB-2 ifTable) ===
	['interfaceDescription', '1.3.6.1.2.1.2.2.1.2'],
	['speed', '1.3.6.1.2.1.2.2.1.5'],
	['inOctets', '1.3.6.1.2.1.2.2.1.10'],
	['outOctets', '1.3.6.1.2.1.2.2.1.16'],
	['opStatus', '1.3.6.1.2.1.2.2.1.8'],
	['adminStatus', '1.3.6.1.2.1.2.2.1.7'],
	['inErrors', '1.3.6.1.2.1.2.2.1.14'],
	['outErrors', '1.3.6.1.2.1.2.2.1.20'],
	['inDiscards', '1.3.6.1.2.1.2.2.1.13'],
	['outDiscards', '1.3.6.1.2.1.2.2.1.19'],
	['mtu', '1.3.6.1.2.1.2.2.1.4'],
	['lastChange', '1.3.6.1.2.1.2.2.1.9'],
]);
