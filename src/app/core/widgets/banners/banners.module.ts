import { IonicModule } from '@ionic/angular';
import { BannersWidgetComponent } from './banners.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  exports: [BannersWidgetComponent],
  declarations: [BannersWidgetComponent, ProfileComponent],
  entryComponents: [BannersWidgetComponent, ProfileComponent],
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class BannersWidgetModule { }
