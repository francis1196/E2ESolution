import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Order } from 'src/app/interfaces/filter';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        FormsModule,
      ],
      declarations: [ FilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should order', () => {
    let oldQuery = component.query;
    const button = fixture.debugElement.nativeElement.querySelector('.fa-order');
    button.click();
    fixture.detectChanges();
    expect(component.order).toBe(Order.DESC);
    expect(oldQuery).not.toEqual(component.query);
  });

  it('should search', () => {
    let oldQuery = component.query;
    const input = fixture.debugElement.nativeElement.querySelector('input');
    input.value = "text";
    input.dispatchEvent(new Event('input'));

    expect(component.searchText).toBe("text");
    expect(oldQuery).not.toEqual(component.query);
  });
});
