import { Device, WarehouseResponse } from './../../interfaces/warehouse';
import { Component, OnInit } from '@angular/core';
import { DeviceApiService } from 'src/app/services/device-api.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {

  Devices: Device[] = [];
  numberOfPages: number = 1;
  actualPage: number = 1;
  actualQuery: string = "";

  constructor(public deviceApi: DeviceApiService) { }

  ngOnInit(): void {
    this.loadWarehouse();
  }

  loadWarehouse(): void {
    this.deviceApi.getWarehouse(this.actualPage, this.actualQuery).subscribe((data: WarehouseResponse) => {
      this.numberOfPages = data.pages;
      this.Devices = data.devices;
    });
  }

  onPageChange(page: number): void{
    this.actualPage = page;
    this.loadWarehouse();
  }

  onFilterChange(query: string): void {
    this.actualQuery = query;
    this.actualPage = 1;
    this.loadWarehouse();
  }
}
