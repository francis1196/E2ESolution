import { from, Observable, of, throwError } from 'rxjs';
import { Industry, IndustryResponse } from 'src/app/interfaces/industry';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { IndustriesComponent } from './industries.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IndustryApiService } from 'src/app/services/industry-api.service';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';

describe('IndustriesComponent', () => {
  let component: IndustriesComponent;
  let fixture: ComponentFixture<IndustriesComponent>;
  let service: IndustryApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        IndustriesComponent,
        FilterComponent,
        PaginationComponent,
      ],
      imports: [
        HttpClientTestingModule,
        FontAwesomeModule,
        FormsModule,
      ], 
      providers: [IndustryApiService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustriesComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(IndustryApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the list of industries', () => {
    const industryResponse: IndustryResponse ={
      pages: 1,
      industries: [
        {
          "id": 1,
          "name": "Agriculture, Forestry, Fishing and Hunting"
        },
        {
          "id": 2,
          "name": "Utilities"
        },
        {
          "id": 3,
          "name": "Transportation and Warehousing"
        },
      ]
    };

    spyOn(service, 'getIndustries').and.callFake(() => {
      return from([industryResponse]);
    });

    component.ngOnInit();

    expect(component.Industries).toEqual(industryResponse.industries);
  });

  it('should call the server to delete a industry', () => {
    const industry: Industry = {
      id: 1,
      name: "name"
    }

    const spy = spyOn(service, 'deleteIndustry').and.returnValue(
      of(industry)
    );

    const click = new MouseEvent('mouseclick');
    const productId = 1;
    component.deleteIndustry(click, productId);

    expect(spy).toHaveBeenCalledWith(productId);
  });

  it('should redirect after click add', () => {
    const iconHref = fixture.debugElement.nativeElement.querySelector('.fa-plus').getAttribute('routerlink');
    expect(iconHref).toEqual('/add-industry');
  });

});
