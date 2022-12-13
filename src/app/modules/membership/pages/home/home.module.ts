import { MomentModule } from 'ngx-moment';
import { NgxStripeModule } from 'ngx-stripe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HeaderModule } from '@core/widgets/header/header.module';
import { StripeWidgetComponent } from '@modules/membership/widgets/stripe-widget/stripe-widget.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    MomentModule,
    NgxStripeModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, StripeWidgetComponent]
})
export class HomePageModule {}
