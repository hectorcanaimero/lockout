import { Component, Input, OnInit } from '@angular/core';
import { ChatFireService } from '@core/services/chat-fire.service';

@Component({
  selector: 'app-chat-msg',
  templateUrl: 'message.component.html',
  styleUrls: ['message.component.scss'],
})
export class MessageChatComponent implements OnInit {
  @Input() item: any;

  constructor(private chatFireService: ChatFireService) {}

  ngOnInit(): void {
    console.log('Method not implemented.');
  }

}
