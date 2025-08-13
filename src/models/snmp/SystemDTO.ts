import {System} from "./System";

/**
 * System DTO
 *
 * @interface SystemDTO
 * @property {string} id - System Log id
 * @property {string} deviceIP - Device's IP address
 * @property {System} systemInfo - System information
 * @property {bigint} timestamp - the moment data was collected in milliseconds
 * @readonly
 */
export interface SystemDTO{
    readonly id: bigint;
    readonly deviceIP: string;
    readonly systemInfo: System;
    readonly timestamp: bigint;
}