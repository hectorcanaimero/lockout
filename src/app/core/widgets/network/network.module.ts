import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NetworkWidgetComponent } from './network.component';

@NgModule({
  declarations: [NetworkWidgetComponent],
  exports: [NetworkWidgetComponent],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    TranslateModule,
  ]
})
export class NetworkWidgetModule { }
