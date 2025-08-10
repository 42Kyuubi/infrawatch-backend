import {Interface} from "./Interface";

/**
 * Interface DTO
 *
 * @interface InterfaceDTO
 * @property {bigint} id - interface id
 * @property {string} deviceIP - device's IP address
 * @property {Interface} interface - interface data
 * @property {bigint} timestamp - the moment data was collected
 * @readonly
 */
export interface InterfaceDTO {
    readonly id: bigint;
    readonly deviceIP: string;
    readonly interface: Interface
    readonly timestamp: bigint;
}