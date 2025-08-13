import {System} from "./System";

/**
 * Stores data returned from a SNMP agent
 *
 * @interface Device
 * @property {string} ip - Device's IP address
 * @property {System} systemInfo - Relevant device's information
 * @property {bigint} timestamp - the moment device data was collected in milliseconds
 * @readonly
 */
export interface Device {
    readonly ip: string;
    readonly systemInfo: System;
    readonly timestamp: bigint;
}