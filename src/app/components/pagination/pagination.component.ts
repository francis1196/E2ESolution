import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() numberOfPages: number = 0;
  @Output() page = new EventEmitter<number>();

  actualPage: number = 1;

  get hasPrev(): boolean{
    return this.actualPage >= this.numberOfPages;
  }
  get hasNext(): boolean{
    return this.actualPage < this.numberOfPages;
  }

  constructor() { }

  ngOnInit(): void {
  }

  prevPage(){
    this.actualPage--;
    this.changePage();
  }

  nextPage(){
    this.actualPage++;
    this.changePage()
  }

  changePage(){
    this.page.emit(this.actualPage);
  }
}
