import { TestBed } from '@angular/core/testing';
import { IndustryApiService } from './industry-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('IndustryApiService', () => {
  let service: IndustryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [IndustryApiService],
    });
    service = TestBed.inject(IndustryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
