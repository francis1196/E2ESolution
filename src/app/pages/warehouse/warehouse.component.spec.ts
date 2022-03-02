import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WarehouseComponent } from './warehouse.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeviceApiService } from 'src/app/services/device-api.service';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { DevicesComponent } from 'src/app/components/devices/devices.component';
import { FormsModule } from '@angular/forms';
import { Device, WarehouseExpandedResponse } from 'src/app/interfaces/warehouse';
import { from, of } from 'rxjs';

describe('WarehouseComponent', () => {
  let component: WarehouseComponent;
  let fixture: ComponentFixture<WarehouseComponent>;
  let service: DeviceApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FontAwesomeModule,
        FormsModule
      ], 
      providers: [
        DeviceApiService,
      ],
      declarations: [ 
        WarehouseComponent, 
        FilterComponent,
        PaginationComponent,
        DevicesComponent,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DeviceApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the list of devices', () => {
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

    spyOn(service, 'getDevicesExpanded').and.callFake(() => {
      return from([devicesResponse]);
    });

    component.ngOnInit();

    expect(component.Devices).toEqual(devicesResponse.devices);
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
