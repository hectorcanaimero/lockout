import { Injectable } from '@angular/core';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Globalization } from '@ionic-native/globalization/ngx';

import { PushService } from '@core/services/push.service';
import { TraslationService } from '@core/language/traslation.service';


@Injectable({
  providedIn: 'root'
})
export class MobileService{

  constructor(
    private global: Globalization,
    private pushService: PushService,
    public traslate: TraslationService,
  ) {}

  async getNetworkStatus() {
    const status = await Network.getStatus();
    console.log('Network status:', status);
  }

  async lodApp() {
    if (Capacitor.isNativePlatform()) {
      await StatusBar.setBackgroundColor({ color: '#000000' });
      await StatusBar.setStyle({ style: Style.Dark })
    }
  }

  getPush() {
    if (Capacitor.isNativePlatform()) {
      this.pushService.initPush();
    }
  }

  getAppInfo(): any {
    if (Capacitor.isNativePlatform()) {
      return App.getInfo();
    }
    return false;
  }

  getGlobalization() {
    this.traslate.use('en');
    // if (Capacitor.isNativePlatform()) {
    //   const { value } = await this.global.getPreferredLanguage();
    //   console.log(value);
    //   if (value) {
    //     this.traslate.use(value.split('-')[0]);
    //   } else {
    //     this.traslate.use('en');
    //   }
    // } else {
    //   this.traslate.use('en');
    // }
  }
}
