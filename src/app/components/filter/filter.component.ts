import { Order } from './../../interfaces/filter';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp, faArrowDown, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowDownAZ, faArrowDownZA } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() filterQuery = new EventEmitter<string>();

  faOrder = faArrowDownZA;
  searchText: string = "";
  order: Order = Order.Default;

  get query(): string {
    
    return (this.searchText != "" ? `&q=${this.searchText}` : "") + 
      (this.order != Order.Default ? `&_order=${this.order}` : "");
  }

  constructor() { }

  ngOnInit(): void { }

  changeOrder(): void {
    switch (this.order) {
      case Order.Default:
      case Order.ASC:
        this.order = Order.DESC;
        this.faOrder = faArrowDownAZ;
        break;
      case Order.DESC:
        this.order = Order.ASC;
        this.faOrder = faArrowDownZA;
        break;
    }
    this.changeFilter();
  }

  search(): void {
    this.changeFilter();
  }
  
  changeFilter():void {
    this.filterQuery.emit(this.query);
  }
}
