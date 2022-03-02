import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [ PaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change page', () => {
    component.numberOfPages = 5;
    component.nextPage();
    expect(component.actualPage).toEqual(2);
  });

  it('should disabled button', () => {
    component.numberOfPages = 2;
    component.actualPage = 1;
    fixture.detectChanges();

    let next = fixture.debugElement.query(By.css('#next')).nativeElement;
    let prev = fixture.debugElement.query(By.css('#prev')).nativeElement;

    expect(next.disabled).toBeFalsy();
    expect(prev.disabled).toBeTruthy();

    next.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    
    expect(component.actualPage).toEqual(2);
    expect(next.disabled).toBeTruthy();
    expect(prev.disabled).toBeFalsy();
  });
});
