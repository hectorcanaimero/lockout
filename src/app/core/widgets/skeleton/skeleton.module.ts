import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


import { SkeletonWidgetComponent } from './skeleton.component';

@NgModule({
  exports: [SkeletonWidgetComponent],
  declarations: [SkeletonWidgetComponent],
  imports: [
    IonicModule,
    CommonModule,
  ]
})

export class SkeletonWidgetModule {}
