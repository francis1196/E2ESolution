import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { faCircleExclamation, faCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-message-popup',
  templateUrl: './message-popup.component.html',
  styleUrls: ['./message-popup.component.scss']
})
export class MessagePopupComponent implements OnInit {

  public messages: string[] = [];
  public timeout: number = 8000;

  faCircleExclamation = faCircleExclamation;
  faCircleCheck = faCircleCheck;
  faXmark = faXmark;
  
  constructor(
    public messagesService: MessageService
  ) {}

  ngOnInit(): void {
    this.messagesService.messagesSubject.subscribe((m) => {
      this.messages.push(...m);
      setTimeout(() => {
        var errorMessages = this.messages.filter((m, index) =>
          this.isError(index)
        );
        this.messages = errorMessages;
      }, this.timeout);
    });
  }

  onClickMessageClose(messageIndex: number): void {
    this.messages.splice(messageIndex, 1);
  }

  public isError(messageIndex: number): boolean {
    return this.messages[messageIndex].toLowerCase().startsWith("error");
  }
}
