import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessageService } from 'src/app/services/message.service';

import { MessagePopupComponent } from './message-popup.component';

describe('MessagePopupComponent', () => {
  let component: MessagePopupComponent;
  let fixture: ComponentFixture<MessagePopupComponent>;
  let service: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
      ],
      declarations: [ MessagePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(MessageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read message', () => {
    service.messagesSubject.next(["test"]);
    expect(component.messages[0]).toEqual("test");
    fixture.detectChanges();
    const message = fixture.debugElement.nativeElement.querySelector('.alert');
    expect(message).toBeTruthy();
  });
});
