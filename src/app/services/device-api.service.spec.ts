import { TestBed } from '@angular/core/testing';
import { DeviceApiService } from './device-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DeviceApiService', () => {
  let service: DeviceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [DeviceApiService],
    });
    service = TestBed.inject(DeviceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
