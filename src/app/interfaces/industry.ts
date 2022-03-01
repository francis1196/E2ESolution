import { Device } from "./warehouse";

export interface Industry {
    id: number,
    name: string,
}

export const InitialIndustry: Industry = {
    id: 0,
    name: ""
}
export interface IndustryExpanded extends Industry{
    devices: Device[]
}

export class IndustryResponse {
    pages: number;
    industries: Industry[];

    constructor(pages: number, industries: Industry[]){
        this.pages = pages;
        this.industries = industries;
    }
}

export class IndustryExpandedResponse {
    pages: number;
    industry: IndustryExpanded;

    constructor(pages: number, industry: IndustryExpanded){
        this.pages = pages;
        this.industry = industry;
    }
}