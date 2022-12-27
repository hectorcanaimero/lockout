import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { HeaderModule } from '@core/widgets/header/header.module';
import { RegisterCompanyPageModule } from './../register/register.module';


@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    HeaderModule,
    TranslateModule,
    HomePageRoutingModule,
    RegisterCompanyPageModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
