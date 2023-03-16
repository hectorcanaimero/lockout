import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { userRoute } from './users.routes';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [],
  imports: [
    userRoute,
    IonicModule,
    CommonModule,
    TranslateModule,
  ]
})
export class UsersModule { }
