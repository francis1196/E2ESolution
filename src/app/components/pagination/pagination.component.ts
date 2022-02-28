import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() numberOfPages: number = 0;
  @Output() page = new EventEmitter<number>();

  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  actualPage: number = 1;

  get hasPrev(): boolean{
    return this.actualPage > 1;
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
