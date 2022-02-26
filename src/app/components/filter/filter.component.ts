import { Order } from './../../interfaces/filter';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() filterQuery = new EventEmitter<string>();

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
        this.order = Order.ASC;
        break;
      case Order.ASC:
        this.order = Order.DESC;
        break;
      case Order.DESC:
        this.order = Order.Default
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
