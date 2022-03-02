import { Industry } from 'src/app/interfaces/industry';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndustryComponent } from './industry.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IndustryApiService } from 'src/app/services/industry-api.service';
import { DeviceApiService } from 'src/app/services/device-api.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DevicesComponent } from 'src/app/components/devices/devices.component';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { FormsModule } from '@angular/forms';
import { WarehouseExpandedResponse, Device } from 'src/app/interfaces/warehouse';
import { from, of } from 'rxjs';

describe('IndustryComponent', () => {
  let component: IndustryComponent;
  let fixture: ComponentFixture<IndustryComponent>;
  let service: DeviceApiService;
  let industryService: IndustryApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        RouterTestingModule,
        FontAwesomeModule,
        FormsModule,
      ], 
      providers: [IndustryApiService, DeviceApiService],
      declarations: [ 
        IndustryComponent,
        DevicesComponent,
        PaginationComponent,
        FilterComponent
       ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustryComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DeviceApiService);
    industryService = TestBed.inject(IndustryApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the list of devices', () => {
    const industry: Industry = {
      id: 1,
      name: "test industry"
    };

    const devicesResponse: WarehouseExpandedResponse ={
      pages: 1,
      devices: [
        {
          "id": 1,
          "name": "PC Lenovo",
          "additionTime": new Date,
          "fee": 1440,
          "number": 52,
          "industryId": 14,
          "industry": {
            "id": 1,
            "name": "Industry test"
          }
        },
        {
          "id": 2,
          "name": "Mobile",
          "additionTime": new Date,
          "fee": 680,
          "number": 24,
          "industryId": 14,
          "industry": {
            "id": 1,
            "name": "Industry test"
          }
        },
      ]
    };

    spyOn(service, 'getDevicesWithIndustry').and.callFake(() => {
      return from([devicesResponse]);
    });

    spyOn(industryService, 'getIndustry').and.callFake(() => {
      return from([industry]);
    });

    component.ngOnInit();

    expect(component.Devices).toEqual(devicesResponse.devices);
    expect(component.Industry).toEqual(industry);
  });

  it('should call the server to delete a device', () => {
    const device: Device = {
      "id": 1,
      "name": "PC Lenovo",
      "additionTime": new Date,
      "fee": 1440,
      "number": 52,
      "industryId": 14
    };

    const spy = spyOn(service, 'deleteDevice').and.returnValue(
      of(device)
    );

    const click = new MouseEvent('mouseclick');
    const productId = 1;
    component.deleteDevice(productId);

    expect(spy).toHaveBeenCalledWith(productId);
  });

  it('should redirect after click add', () => {
    const iconHref = fixture.debugElement.nativeElement.querySelector('.fa-plus').getAttribute('routerlink');
    expect(iconHref).toEqual('/add-device');
  });
});
