import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndustryManagerComponent } from './industry-manager.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IndustryApiService } from 'src/app/services/industry-api.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('IndustryManagerComponent', () => {
  let component: IndustryManagerComponent;
  let fixture: ComponentFixture<IndustryManagerComponent>;
  let service: IndustryApiService;

  const industry = {
    id: 1,
    name: "name",
  }
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        RouterTestingModule,
        FormsModule
      ], 
      providers: [IndustryApiService],
      declarations: [ IndustryManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustryManagerComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(IndustryApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update industry', () => {
    component.isAddMode = false;
    component.industry = industry;
    fixture.detectChanges();

    const spy = spyOn(service, 'updateIndustry').and.returnValue(
      of(industry)
    );

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should save industry', () => {
    component.isAddMode = true;
    component.industry = industry;
    fixture.detectChanges();

    const spy = spyOn(service, 'addIndustry').and.returnValue(
      of(industry)
    );

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it('button should be disabled', () => {
    component.isAddMode = true;
    fixture.detectChanges();

    const spy = spyOn(service, 'addIndustry').and.returnValue(
      of(industry)
    );

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(button.disabled).toBeTruthy();
    expect(spy).not.toHaveBeenCalled();
  });
});
