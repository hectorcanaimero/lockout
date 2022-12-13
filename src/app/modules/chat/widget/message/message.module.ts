import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MomentModule } from 'ngx-moment';
import { TranslateModule } from '@ngx-translate/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { MessageChatComponent } from './message.component';
import { ScrollToBottomDirective } from './scroll-to-bottom.directive';

@NgModule({
  exports: [MessageChatComponent, ScrollToBottomDirective],
  declarations: [MessageChatComponent, ScrollToBottomDirective],
  imports: [
    IonicModule,
    MomentModule,
    CommonModule,
    TranslateModule,
  ],
})
export class MessageWidgetModule { }
