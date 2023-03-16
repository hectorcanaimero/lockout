import { Injectable } from '@angular/core';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { PushService } from '@core/services/push.service';
import { Globalization } from '@ionic-native/globalization/ngx';
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

  async getGlobalization() {
    if (Capacitor.isNativePlatform()) {
      const { value } = await this.global.getPreferredLanguage();
      if (value) {
        this.traslate.use(value.split('-')[0]);
      } else {
        this.traslate.use('en');
      }
    }
  }
}
