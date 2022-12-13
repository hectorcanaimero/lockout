import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { PagesPage } from './pages.page';
import { pageRoute } from './pages.routes';
import { RegisterCompanyPageModule } from '@modules/companies/pages/register/register.module';


@NgModule({
  imports: [
    pageRoute,
    FormsModule,
    IonicModule,
    CommonModule,
    TranslateModule,
    RegisterCompanyPageModule,
  ],
  declarations: [PagesPage],
})
export class PagesPageModule {}
