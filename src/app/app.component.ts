import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { App } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';

import { AppState } from '@store/app.state';
import { loadStatus } from '@store/actions/status.actions';
import { MobileService } from '@core/services/mobile.services';
import { StorageService } from '@core/services/storage.service';
import { IntegratedService } from '@core/services/integrated.service';
import { ValidationTokenService } from '@core/services/validation-token.service';
import { SocketService } from '@core/services/socket.service';


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
    private store: Store<AppState>,
    private storage: StorageService,
    private mobileService: MobileService,
    private socketService: SocketService,
    private token: ValidationTokenService,
    private integrated: IntegratedService,
  ) { }

  ngOnInit() {
    this.offOn();
    this.appActive();
    this.initializeApp();
  }

  initializeApp = () => {
    this.platform.ready().then(async () => {
      this.token.validate();
      this.integrated.initState();
      this.socketService.getConnection();
      this.socketService.setJoinRoom();
      await this.mobileService.getPush();
      await this.mobileService.getGlobalization();
      setTimeout(()=>{ SplashScreen.hide({ fadeOutDuration: 1000 }); }, 2000)
    });
  };

  appActive = () => {
    App.addListener('appStateChange', ({ isActive }) => {
      if (isActive) {
        this.socketService.getConnection();
        this.integrated.initState();
        this.token.validate();
      }
    });
  };

  offOn = async () => {
    const active = await this.storage.getStorage('status');
    if (!active) {
      await this.storage.setStorage('status', false);
      this.store.dispatch(loadStatus({ id: false }));
    } else {
      this.store.dispatch(loadStatus({ id: active }));
    }
  }
}
