import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceManagerComponent } from './device-manager.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IndustryApiService } from 'src/app/services/industry-api.service';
import { DeviceApiService } from 'src/app/services/device-api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Device } from 'src/app/interfaces/warehouse';

describe('DeviceManagerComponent', () => {
  let component: DeviceManagerComponent;
  let fixture: ComponentFixture<DeviceManagerComponent>;
  let service: DeviceApiService;

  const device: Device = {
    id: 1,
    name: "Test Device",
    additionTime: new Date(),
    fee: 99.99,
    number: 5,
    industryId: 1
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        RouterTestingModule,
        FormsModule
      ], 
      providers: [IndustryApiService, DeviceApiService],
      declarations: [ DeviceManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceManagerComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DeviceApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update device', () => {
    component.isAddMode = false;
    component.device = device;
    fixture.detectChanges();

    const spy = spyOn(service, 'updateDevice').and.returnValue(
      of(device)
    );

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should save device', () => {
    component.isAddMode = true;
    component.device = device;
    fixture.detectChanges();

    const spy = spyOn(service, 'addDevice').and.returnValue(
      of(device)
    );

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it('button should be disabled', () => {
    component.isAddMode = true;
    fixture.detectChanges();

    const spy = spyOn(service, 'addDevice').and.returnValue(
      of(device)
    );

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(button.disabled).toBeTruthy();
    expect(spy).not.toHaveBeenCalled();
  });
});
