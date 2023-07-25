import { Injectable } from "@angular/core";
import {
  AppTrackingTransparency,
  AppTrackingStatusResponse,
} from 'capacitor-plugin-app-tracking-transparency';
import { Capacitor } from '@capacitor/core';
import { Store } from "@ngrx/store";

import { AppState } from "@store/app.state";
import { loadStatus } from "@store/actions";
import { StorageService } from "@core/services/storage.service";
import { IntegratedService } from "@core/services/integrated.service";
import { SocketService } from "@core/services/socket.service";
import { ValidationTokenService } from "@core/services/validation-token.service";


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private store: Store<AppState>,
    private storage: StorageService,
    private socketService: SocketService,
    private token: ValidationTokenService,
    private integrated: IntegratedService,
  ) {}

  initialize() {
    this.integrated.initState();
    this.socketService.getConnection();
    this.socketService.setJoinRoom();
    this.token.validate();
  }

  appActive() {
    this.socketService.getConnection();
    this.integrated.initState();
    this.token.validate();
  }

  async validateTracking() {
    if (Capacitor.getPlatform() === 'ios') {
      const { status }: AppTrackingStatusResponse = await AppTrackingTransparency.getStatus();
      if (status !== 'authorized') {
        await AppTrackingTransparency.requestPermission();
      }
    }
  }

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