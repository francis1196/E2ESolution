import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WarehouseComponent } from './warehouse.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeviceApiService } from 'src/app/services/device-api.service';

describe('WarehouseComponent', () => {
  let component: WarehouseComponent;
  let fixture: ComponentFixture<WarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [DeviceApiService],
      declarations: [ WarehouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
