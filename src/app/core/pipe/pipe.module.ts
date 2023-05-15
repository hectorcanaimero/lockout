import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitConvertedPipe } from './unit-converted.pipe';
import { UnreadMessagePipe } from './unread-message.pipe';

@NgModule({
  exports: [
    UnitConvertedPipe, 
    UnreadMessagePipe
  ],
  declarations: [
    UnitConvertedPipe, 
    UnreadMessagePipe
  ],
  imports: [
    CommonModule,

  ],
})
export class CorePipeModule { }
