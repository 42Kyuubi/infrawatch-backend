/**
 * Interface for details about device's interface
 *
 * @interface Interface
 * @property {string} description - A description about the network interface
 * @property {number} speed - Interface speed in bits per seconds (bps)
 * @property {number} inOctets - Total number of octets received by the interface
 * @property {number} outOctets - Total number of octets transmitted by the interface
 * @property {1 | 2 | 3 | 4 | 5 | 6 | 7} opStatus - Interface operational status 1 -> 7 shows if it's working
 * @property {1 | 1 | 3} adminStatus - Interface administrative status 1 -> 3 shows if it was manually modified
 * @property {number} inErrors - Total number of input errors
 * @property {number} outErrors - total number of output errors
 * @property {number} inDiscards - Total number of discarded input packets
 * @property {number} outDiscards - Total number of discarded output packets
 * @property {number} mtu - Maximum Transmission Unit, the maximum size of a packet the interface can handle
 * @property {number} lastChange - The last time the interface's status changed is seconds (since the last reset)
 * @readonly
 */
export interface Interface{
    readonly description: string;
    readonly  speed: number;
    readonly inOctets:  number;
    readonly outOctets: number;
    /**
     * 1 -> up
     * 2 -> down
     * 3 -> testing
     * 4 -> unknown
     * 5 -> dormant
     * 6 -> not present
     * 7 -> lower layer down (interface problem)
     */
    readonly opStatus: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    /**
     * 1 -> up
     * 2 -> down
     * 3 -> testing
     */
    readonly adminStatus: 1 | 2 | 3;
    readonly inErrors: number;
    readonly outErrors: number;
    readonly inDiscards: number;
    readonly outDiscards: number;
    readonly mtu: number;
    readonly lastChange: number;
}