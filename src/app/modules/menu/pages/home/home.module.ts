import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { HeaderModule } from '@core/widgets/header/header.module';
import { ProfileComponent } from '@modules/menu/widgets/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }
];

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    HeaderModule,
    CommonModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ],
  declarations: [HomePage, ProfileComponent]
})
export class HomePageModule {}
