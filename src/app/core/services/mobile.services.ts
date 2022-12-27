import { Injectable } from '@angular/core';

import { App, AppInfo } from '@capacitor/app';
import { Device, DeviceInfo } from '@capacitor/device';
import { PushService } from '@core/services/push.service';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TraslationService } from '@core/language/traslation.service';
import { Browser } from '@capacitor/browser';
import { PluginListenerHandle } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class MobileService{

  constructor(
    private global: Globalization,
    private pushService: PushService,
    public traslate: TraslationService,
  ) {}

  async getPush() {
    const info: DeviceInfo = await Device.getInfo();
    if (info.platform !== 'web') {
      this.pushService.initPush();
    } else {
      console.log('Aqui es web');
    }
  }

  async getAppInfo(): Promise<AppInfo | boolean> {
    const info: DeviceInfo = await Device.getInfo();
    if (info.platform !== 'web') {
      return App.getInfo();
    }
    return false;
  }

  async getGlobalization() {
    const info: DeviceInfo = await Device.getInfo();
    if (info.platform !== 'web') {
      const { value } = await this.global.getPreferredLanguage();
      if (value) {
        this.traslate.use(value.split('-')[0]);
      } else {
        this.traslate.use('en');
      }
    }
  }
}
