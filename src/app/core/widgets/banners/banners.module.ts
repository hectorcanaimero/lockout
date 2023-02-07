import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { BannersWidgetComponent } from './banners.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  exports: [BannersWidgetComponent],
  declarations: [BannersWidgetComponent, ProfileComponent],
  entryComponents: [BannersWidgetComponent, ProfileComponent],
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ]
})
export class BannersWidgetModule { }
