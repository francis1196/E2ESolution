import { Industry } from "./industry";

export interface Device {
    id: number,
    name: string,
    additionTime: Date,
    fee: number,
    industryId: number,
    industry: Industry,
}

export class WarehouseResponse {
    pages: number;
    devices: Device[];

    constructor(pages: number, devices: Device[]){
        this.pages = pages;
        this.devices = devices;
    }
}