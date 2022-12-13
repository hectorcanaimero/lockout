import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HeaderModule } from '@core/widgets/header/header.module';
import { BannersWidgetModule } from '@core/widgets/banners/banners.module';
import { RegisterCompanyPageModule } from '@modules/companies/pages/register/register.module';
import { ServicesOpenWidgetModule } from '@modules/categories/widgets/services-open-widget/services-open-widget.module';
import { ServicesInProccessWidgetModule } from '@modules/categories/widgets/services-in-proccess-widget/services-in-proccess-widget.module';
import { OnOffWidgetModule } from '@core/widgets/on-off-widget/on-off-widget.module';


@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    HeaderModule,
    CommonModule,
    OnOffWidgetModule,
    BannersWidgetModule,
    HomePageRoutingModule,
    ServicesOpenWidgetModule,
    RegisterCompanyPageModule,
    ServicesInProccessWidgetModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
