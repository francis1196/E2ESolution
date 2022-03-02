import { MessageService } from 'src/app/services/message.service';
import { Industry, InitialIndustry } from 'src/app/interfaces/industry';
import { IndustryApiService } from 'src/app/services/industry-api.service';
import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DeviceApiService } from 'src/app/services/device-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceExpanded, WarehouseExpandedResponse } from 'src/app/interfaces/warehouse';

@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.scss']
})
export class IndustryComponent implements OnInit {

  industryId: number = 0;
  Industry: Industry = InitialIndustry;
  Devices: DeviceExpanded[] = [];
  numberOfPages: number = 1;
  actualPage: number = 1;
  actualQuery: string = "";

  faPlus = faPlus;

  constructor(
    public industryApi: IndustryApiService,
    public deviceApi: DeviceApiService,
    public messageService: MessageService,
    public actRoute: ActivatedRoute,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.industryId = this.actRoute.snapshot.params['id'];

    this.industryApi.getIndustry(this.industryId).subscribe({
      next: (data) => {
        this.Industry = data;
      },
      error: () => {
        this.messageService.messagesSubject.next([
          "Error getting the industry"
        ]);
        this.router.navigate(['/industries']);
      }
    })
    this.loadDevices();
  }

  loadDevices(): void {
    this.deviceApi.getDevicesWithIndustry(this.industryId, this.actualPage, this.actualQuery).subscribe({
      next: (data: WarehouseExpandedResponse) => {
      this.numberOfPages = data.pages;
      this.Devices = data.devices;  
      },
      error: () => {
        this.messageService.messagesSubject.next([
          "Error getting the industry devices"
        ]);
      }
    });
  }

  onPageChange(page: number): void{
    this.actualPage = page;
    this.loadDevices();
  }

  onFilterChange(query: string): void {
    this.actualQuery = query;
    this.actualPage = 1;
    this.loadDevices();
  }

  deleteDevice(id: number){
    this.deviceApi.deleteDevice(id).subscribe({
      next: () =>{
        this.loadDevices();
      },
      error: () => {
        this.messageService.messagesSubject.next([
          "Error deleting the industry"
        ]);
      }
    });
  }
}
