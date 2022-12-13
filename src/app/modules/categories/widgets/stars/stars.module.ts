import { StarsComponent } from './stars.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  exports: [StarsComponent],
  declarations: [StarsComponent],
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class StarsWidgetModule { }
