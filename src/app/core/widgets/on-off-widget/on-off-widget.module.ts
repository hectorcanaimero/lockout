import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnOffWidgetComponent } from './on-off-widget.component';



@NgModule({
  exports: [OnOffWidgetComponent],
  declarations: [OnOffWidgetComponent],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class OnOffWidgetModule { }
