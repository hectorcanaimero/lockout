import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Globalization } from '@ionic-native/globalization/ngx';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

  ],
  providers: [
    Globalization,
    NativeGeocoder,
  ]
})
export class CoreConfigModule { }
