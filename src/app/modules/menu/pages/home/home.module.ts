import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { HeaderModule } from '@core/widgets/header/header.module';
import { ProfileComponent } from '@modules/menu/widgets/profile/profile.component';
import { OnOffWidgetModule } from '@core/widgets/on-off-widget/on-off-widget.module';
import { PostModule } from '@modules/contents/widget/post/post.module';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }
];

@NgModule({
  imports: [
    PostModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    CommonModule,
    TranslateModule,
    OnOffWidgetModule,
    RouterModule.forChild(routes),
  ],
  declarations: [HomePage, ProfileComponent]
})
export class HomePageModule {}
