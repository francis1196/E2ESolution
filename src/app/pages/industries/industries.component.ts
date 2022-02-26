import { Component, OnInit } from '@angular/core';
import { Industry } from 'src/app/iterfaces/industry';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-industries',
  templateUrl: './industries.component.html',
  styleUrls: ['./industries.component.scss']
})
export class IndustriesComponent implements OnInit {

  Industries: Industry[] = [];
  numberOfPages: number = 1;

  constructor(public restApi: RestApiService) { }

  ngOnInit(): void {
    this.pagesNumber();
    this.loadIndustries(1);
  }

  pagesNumber(){
    this.restApi.getNumberOfPages().subscribe((data) => {
      this.numberOfPages = data;
    })
  }

  loadIndustries(page: number) {
    return this.restApi.getIndustriesPage(page).subscribe((data: Industry[]) => {
      this.Industries = data;
    });
  }

  onPageChange(page: number){
    this.loadIndustries(page);
  }
}
