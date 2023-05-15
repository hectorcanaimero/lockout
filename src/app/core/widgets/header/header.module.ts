import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ]
})
export class HeaderModule { }
