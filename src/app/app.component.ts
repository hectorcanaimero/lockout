import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { App } from '@capacitor/app';

import { MobileService } from '@core/services/mobile.services';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  user$: any = [];
  appVersion: any = [];

  constructor(
    private platform: Platform,
    private service: AppService,
    private mobileService: MobileService,
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.appActive();
    this.service.offOn();
  }

  initializeApp = () => {
    this.platform.ready().then(async () => {
      this.service.initialize();
      await this.service.validateTracking();
      await this.mobileService.getGlobalization();
      this.mobileService.lodApp();
    });
  };

  appActive = () => {
    App.addListener('appStateChange', ({ isActive }) => {
      if (isActive) {
        this.service.appActive();
      }
    });
  };

  getActive(ev: any) {
    // console.log(ev);
  }
}
