import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryManagerComponent } from './industry-manager.component';

describe('IndustryManagerComponent', () => {
  let component: IndustryManagerComponent;
  let fixture: ComponentFixture<IndustryManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustryManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
