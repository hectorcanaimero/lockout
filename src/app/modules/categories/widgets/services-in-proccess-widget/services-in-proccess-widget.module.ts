import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'ngx-moment';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ServicesInProccessWidgetComponent } from './services-in-proccess-widget.component';

@NgModule({
  exports: [ServicesInProccessWidgetComponent],
  declarations: [ServicesInProccessWidgetComponent],
  entryComponents: [ServicesInProccessWidgetComponent],
  imports: [
    IonicModule,
    CommonModule,
    MomentModule,
    TranslateModule,
  ]
})

export class ServicesInProccessWidgetModule { }
