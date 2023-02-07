import { Pipe, PipeTransform } from '@angular/core';
import { ChatFireService } from '@core/services/chat-fire.service';

@Pipe({
  name: 'unread'
})
export class UnreadMessagePipe implements PipeTransform {
  constructor(private chatFire: ChatFireService) {}
  transform(id:string): Promise<number> {
    return this.chatFire.unReadMessages2(0, id);
  }

}
