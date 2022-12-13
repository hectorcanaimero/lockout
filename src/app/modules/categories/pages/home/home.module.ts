import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { HeaderModule } from 'src/app/core/widgets/header/header.module';
import { IntroWidgetModule } from 'src/app/core/widgets/intro/intro.module';
import { BannersWidgetModule } from 'src/app/core/widgets/banners/banners.module';
import { LastRepairedWidgetModule } from 'src/app/core/widgets/last-repaired/last-repaired.module';


@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    HeaderModule,
    CommonModule,
    IntroWidgetModule,
    BannersWidgetModule,
    HomePageRoutingModule,
    LastRepairedWidgetModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
