import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: string[] = [];
  public messagesSubject: BehaviorSubject<string[]> = new BehaviorSubject(
    this.messages
  );

  public handleError(error: any): void {
    this.messages = [error.message];
  }
}
