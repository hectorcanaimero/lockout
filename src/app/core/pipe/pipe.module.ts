import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitConvertedPipe } from './unit-converted.pipe';

@NgModule({
  exports: [UnitConvertedPipe],
  declarations: [UnitConvertedPipe],
  imports: [
    CommonModule,

  ],
})
export class CorePipeModule { }
