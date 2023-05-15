import { Pipe, PipeTransform } from '@angular/core';
import { ChatFireService } from '@core/services/chat-fire.service';
import { Observable } from 'rxjs';
@Pipe({
  name: 'unread'
})
export class UnreadMessagePipe implements PipeTransform {
  constructor(private chatFire: ChatFireService) {}
  transform(id:string): Observable<number | null> {
    return this.chatFire.unReadMessages(0, id);
    // setInterval(async () => {
    //   const value = await this.chatFire.unReadMessages2(0, id);
    //   console.log(num++, 'unread', value);
    //   return value;
    // }, 1500);
  }
}
