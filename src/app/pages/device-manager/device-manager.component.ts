import { IndustryApiService } from 'src/app/services/industry-api.service';
import { DeviceApiService } from 'src/app/services/device-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InitialDevice } from './../../interfaces/warehouse';
import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/interfaces/warehouse';
import { Industry } from 'src/app/interfaces/industry';

@Component({
  selector: 'app-device-manager',
  templateUrl: './device-manager.component.html',
  styleUrls: ['./device-manager.component.scss']
})
export class DeviceManagerComponent implements OnInit {

  isAddMode: boolean = true;
  device: Device = InitialDevice;
  industries: Industry[] = [];

  get validateForm(): string{
    var res: string[] = [];

    if(this.device.name == ""){
      res.push("The name is required");
    }
    if(this.device.fee == null){
      res.push("The fee is required");
    }
    if(this.device.number == 0 || this.device.number == null || this.device.number % 1 != 0 || this.device.number > 100){
      res.push("The number of devices must be from 1 to 100, it is required and cannot be decimal")
    }
    if(this.device.industryId == 0){
      res.push("The industry is required")
    }
    
    return res.join(", ");
  }

  constructor(
    public deviceApi: DeviceApiService,
    public industryApi: IndustryApiService,
    public actRoute: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.params['id'];
    this.isAddMode = !id;
    
    this.industryApi.getAllIndustries().subscribe((data) => {
      this.industries = data.industries;
    });

    if(!this.isAddMode){
      this.deviceApi.getDevice(id).subscribe((data) => {
        this.device = data;
      });
    }
  }

  onSave(){
    if (this.validateForm) {
      return;
    }
    
    this.device.fee = Number(this.device.fee.toFixed(2));

    if(this.isAddMode){
      this.deviceApi.addDevice(this.device).subscribe(() => {
        this.router.navigate(['/warehouse']);
      });
    }else{
      this.deviceApi.updateDevice(this.device).subscribe(() => {
        this.router.navigate(['/warehouse']);
      });
    }
  }
}
