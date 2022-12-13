import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { companiesRoute } from './companies.routes';

@NgModule({
  declarations: [],
  imports: [
    IonicModule,
    CommonModule,
    companiesRoute,
  ]
})
export class CompaniesModule { }
