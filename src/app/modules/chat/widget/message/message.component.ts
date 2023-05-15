import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-msg',
  templateUrl: 'message.component.html',
  styleUrls: ['message.component.scss'],
})
export class MessageChatComponent {
  @Input() item: any;
}
