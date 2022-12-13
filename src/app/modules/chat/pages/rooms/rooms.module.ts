import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { RoomsChatPage } from './rooms.page';
import { RoomsChatPageRoutingModule } from './rooms-routing.module';
import { HeaderModule } from '@core/widgets/header/header.module';
import { MomentModule } from 'ngx-moment';


@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    HeaderModule,
    MomentModule,
    TranslateModule,
    RoomsChatPageRoutingModule
  ],
  exports: [RoomsChatPage],
  declarations: [RoomsChatPage],
  entryComponents: [RoomsChatPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoomsChatPageModule {}
