import { Component, OnInit } from '@angular/core';
import { Industry, IndustryResponse } from 'src/app/interfaces/industry';
import { IndustryApiService } from 'src/app/services/industry-api.service';
import { faPen, faTrash, faPlus, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-industries',
  templateUrl: './industries.component.html',
  styleUrls: ['./industries.component.scss']
})
export class IndustriesComponent implements OnInit {

  faPen = faPen;
  faTrash = faTrash;
  faPlus = faPlus;
  faCircleExclamation = faCircleExclamation;

  Industries: Industry[] = [];
  numberOfPages: number = 1;
  actualPage: number = 1;
  actualQuery: string = "";

  constructor(
    public industryApi: IndustryApiService, 
    public messageService: MessageService,
    ) { }

  ngOnInit(): void {
    this.loadIndustries();
  }

  loadIndustries(): void {
    this.industryApi.getIndustries(this.actualPage, this.actualQuery).subscribe({
      next: (data: IndustryResponse) => {
        this.numberOfPages = data.pages;
        this.Industries = data.industries;
      },
      error: () => {
        this.messageService.messagesSubject.next([
          "Error getting industries"
        ]);
      }
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

  deleteIndustry($event: any, id: number){
    $event.stopPropagation();
    this.industryApi.deleteEmployee(id).subscribe({
      next: () =>{
        this.loadIndustries();
      },
      error: () => {
        this.messageService.messagesSubject.next([
          "Error deleting the industry"
        ]);
      }
    });
  }
}
