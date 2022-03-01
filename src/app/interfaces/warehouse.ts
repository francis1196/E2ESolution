import { Industry, InitialIndustry } from "./industry";

export interface Device {
    id: number,
    name: string,
    additionTime: Date,
    fee: number,
    number: number,
    industryId: number
}

export interface DeviceExpanded extends Device{
    industry: Industry
}

export const InitialDevice: Device = {
    id: 0,
    name: "",
    additionTime: new Date(),
    fee: 0,
    number: 1,
    industryId: 0
}

export class WarehouseResponse {
    pages: number;
    devices: Device[];

    constructor(pages: number, devices: Device[]){
        this.pages = pages;
        this.devices = devices;
    }
}

export class WarehouseExpandedResponse extends WarehouseResponse {
    override devices: DeviceExpanded[];

    constructor(pages: number, devices: DeviceExpanded[]){
        super(pages, []);
        this.pages = pages;
        this.devices = devices;
    }
}