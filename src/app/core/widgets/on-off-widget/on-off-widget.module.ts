import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { OnOffWidgetComponent } from './on-off-widget.component';



@NgModule({
  exports: [OnOffWidgetComponent],
  declarations: [OnOffWidgetComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ]
})
export class OnOffWidgetModule { }
