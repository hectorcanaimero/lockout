import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SoporteChatPage } from './soporte.page';
import { HeaderModule } from '@core/widgets/header/header.module';
import { Routes, RouterModule } from '@angular/router';
import { MessageWidgetModule } from './../../widget/message/message.module';

const routes: Routes = [
  { path: '',  component: SoporteChatPage, }
];

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    HeaderModule,
    MessageWidgetModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [SoporteChatPage],
  declarations: [SoporteChatPage],
})
export class SoporteChatPageModule {}
