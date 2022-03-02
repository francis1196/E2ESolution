import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndustriesComponent } from './industries.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IndustryApiService } from 'src/app/services/industry-api.service';

describe('IndustriesComponent', () => {
  let component: IndustriesComponent;
  let fixture: ComponentFixture<IndustriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustriesComponent ],
      imports: [HttpClientTestingModule], 
      providers: [IndustryApiService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
