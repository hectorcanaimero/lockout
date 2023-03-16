import { MomentModule } from 'ngx-moment';
import { NgxStripeModule } from 'ngx-stripe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaidPage } from './paid.page';

import { HeaderModule } from '@core/widgets/header/header.module';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  { path: '', component: PaidPage }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    MomentModule,
    NgxStripeModule,
    TranslateModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [PaidPage]
})
export class PaidPageModule {}
