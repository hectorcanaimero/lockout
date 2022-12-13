import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { EffectsArray } from '@store/effects';
import { ROOT_REDUCERS } from '@store/app.state';

const runtimeChecks = {
  strictStateImmutability: false,
  strictActionImmutability: false,
}

@NgModule({
  imports: [
    StoreModule.forRoot(ROOT_REDUCERS, {runtimeChecks}),
    StoreDevtoolsModule.instrument({ name: 'TEST', maxAge: 25 }),
    EffectsModule.forRoot(EffectsArray),
  ],

})
export class StoreConfigModule {}
