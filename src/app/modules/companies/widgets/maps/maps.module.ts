import { Routes, RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MapsWidgetComponent } from './maps.component';
import { environment } from 'src/environments/environment';

import * as mapbox from 'mapbox-gl';
import { AgmCoreModule } from '@agm/core';
(mapbox as any).accessToken = environment.mapbox;


const app: Routes = [
  { path: '', component: MapsWidgetComponent }
];

@NgModule({
  exports: [MapsWidgetComponent],
  declarations: [MapsWidgetComponent],
  entryComponents: [MapsWidgetComponent],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    AgmCoreModule,
    TranslateModule,
    RouterModule.forChild(app),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapsUserWidgetModule { }
