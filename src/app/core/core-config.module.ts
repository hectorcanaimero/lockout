import { NgModule } from '@angular/core';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Globalization } from '@ionic-native/globalization/ngx';
import { CommonModule } from '@angular/common';

@NgModule({
  imports:[
    CommonModule,
  ],
  providers: [
    Globalization,
    NativeGeocoder,
  ]
})
export class CoreConfigModule { }
