export interface Industry {
    id: number,
    name: string,
}

export class IndustryResponse {
    pages: number;
    industries: Industry[];

    constructor(pages: number, industries: Industry[]){
        this.pages = pages;
        this.industries = industries;
    }
}