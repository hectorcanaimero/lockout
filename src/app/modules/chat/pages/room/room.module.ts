import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RoomChatPage } from './room.page';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { RoomGatewayService } from './room.service';
import { MessageWidgetModule } from './../../widget/message/message.module';

const routes: Routes = [
  { path: ':uid', component: RoomChatPage }
];

@NgModule({
  imports: [
    MessageWidgetModule,
    IonicModule,
    FormsModule,
    CommonModule,
    MomentModule,
    RouterModule.forChild(routes),
  ],
  exports: [RoomChatPage],
  declarations: [RoomChatPage],
  providers: [RoomGatewayService],
})
export class RoomChatPageModule {}
