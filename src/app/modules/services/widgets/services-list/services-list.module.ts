import { LottieModule } from 'ngx-lottie';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ServicesListComponent } from './services-list.component';
import { CorePipeModule } from '@core/pipe/pipe.module';
import { SkeletonWidgetModule } from '@core/widgets/skeleton/skeleton.module';



@NgModule({
  exports: [ServicesListComponent],
  declarations: [ServicesListComponent],
  entryComponents: [ServicesListComponent],
  imports: [
    IonicModule,
    CommonModule,
    LottieModule,
    CorePipeModule,
    SkeletonWidgetModule,
  ]
})
export class ServicesListModule { }
