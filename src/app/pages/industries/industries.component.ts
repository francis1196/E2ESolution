import { Component, OnInit } from '@angular/core';
import { Industry, IndustryResponse } from 'src/app/interfaces/industry';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-industries',
  templateUrl: './industries.component.html',
  styleUrls: ['./industries.component.scss']
})
export class IndustriesComponent implements OnInit {

  Industries: Industry[] = [];
  numberOfPages: number = 1;
  actualPage: number = 1;
  actualQuery: string = "";

  constructor(public restApi: RestApiService) { }

  ngOnInit(): void {
    this.loadIndustries();
  }

  loadIndustries(): void {
    this.restApi.getIndustries(this.actualPage, this.actualQuery).subscribe((data: IndustryResponse) => {
      this.numberOfPages = data.pages;
      this.Industries = data.industries;
    });
  }

  onPageChange(page: number): void{
    this.actualPage = page;
    this.loadIndustries();
  }

  onFilterChange(query: string): void {
    this.actualQuery = query;
    this.actualPage = 1;
    this.loadIndustries();
  }
}