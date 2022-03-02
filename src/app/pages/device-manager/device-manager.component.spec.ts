import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceManagerComponent } from './device-manager.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IndustryApiService } from 'src/app/services/industry-api.service';
import { DeviceApiService } from 'src/app/services/device-api.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('DeviceManagerComponent', () => {
  let component: DeviceManagerComponent;
  let fixture: ComponentFixture<DeviceManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule], 
      providers: [IndustryApiService, DeviceApiService],
      declarations: [ DeviceManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
