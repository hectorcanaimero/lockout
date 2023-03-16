import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { HomePage } from './home.page';
import { HeaderModule } from '@core/widgets/header/header.module';
import { CorePipeModule } from '@core/pipe/pipe.module';
import { SkeletonWidgetModule } from '@core/widgets/skeleton/skeleton.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomePage }
];

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    HeaderModule,
    CorePipeModule,
    TranslateModule,
    SkeletonWidgetModule,
    RouterModule.forChild(routes),
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
