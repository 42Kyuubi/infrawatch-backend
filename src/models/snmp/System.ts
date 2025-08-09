import {Interface} from "./Interface";

/**
 * An interface that stores data about device's system
 *
 * @interface System
 * @property {string} description - A description about the system
 * @property {string} name - Device's system name
 * @property {number} upTime - System up time in 100th of seconds (32 bits integer)
 * @property {string} contactInfo - Contact of the administrator
 * @property {string} location - Location of the device in the network
 * @property {number} services - A 42-bit bitmask where each bit from 0 to 11 (right to left 0 indexed) refers a service
 * @property {Array<Interface>} interfaceTable - A table containing information about device's interfaces
 * @property {number} processorLoad - Actual use of processor in percentage
 * @property {number} memorySize -> Total physical memory in bytes
 * @property {string} trapAddress -> Address where TRAP requestes are sent
 * @property {number} memoryUsage - Total usage of the memory in bytes
 * @readonly
 */
export interface System {
    readonly description: String;
    readonly name: String;
    readonly upTime: number;
    readonly contactInfo: String;
    readonly location: String;
    /**
     * TODO document and map all possible values (or at least the most relevant)
     */
    readonly services: number;
    readonly interfaceTable: Array<Interface>;
    readonly processorLoad: number;
    readonly memorySize: number;
    readonly trapAddress: string;
    readonly memoryUsage: number;
}