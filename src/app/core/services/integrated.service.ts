import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { interval, of } from 'rxjs';
import { Geolocation } from '@capacitor/geolocation';
import { filter, map, switchMap, take } from 'rxjs/operators';

import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
import { UtilsService } from './utils.service';
import { StripeService } from './stripe.service';
import { MasterService } from './master.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class IntegratedService {

  constructor(
    private ms: MasterService,
    private stripe: StripeService,
    private uService: UtilsService,
    private store: Store<AppState>,
    private storage: StorageService,
  ) {
  }

  initState(): void {
    this.getUser();
  };

  pageState() { }

  page2State() {
    this.store.dispatch(actions.expertLoad());
    return this.store.select('company')
    .pipe(
      filter(row => !row.loading),
      switchMap(({ company }: any) => {
        if (company) {
          this.store.dispatch(actions.load({ company: company._id }));
          this.store.dispatch(actions.initScore({ user: company._id }));
          this.store.dispatch(actions.historyInit({ id: company._id }));
          return this.ms.getMaster(`services/company/active/${company._id}`).pipe(take(1));
        }
        return of(false);
      }
      )
    )
  }

  processing(data: any) {
    if (data.length > 0) {
      const accepted: any = data.filter((row: any) => row.status === 'accepted');
      this.store.dispatch(actions.acceptedLoaded( { items: accepted }));
      const inProcess = data.filter((row: any) => row.status === 'in_process');
      this.store.dispatch(actions.inProcessLoaded( { items: inProcess }));
    }
  }

  onSync = () => {};

  onPushCompany = () => {
    this.uService.navigate('register-company');
  };

  async getCompany(): Promise<any> {
    const user: any = await this.storage.getStorage('oUser');
    if (user) {
      this.store.dispatch(actions.loadCompany({ user: user._id }));
      if (user.status || false) this.updateLocation();

    }
  };

  updateLocation() {
    const company$ = this.store.select('company')
    .pipe(filter(row => !row.loading), map((res: any)=> res.company));
    company$.subscribe((res: any) => {
      if (res && res.typeCompany.type === 1) this.setLocation(res._id);
    })
  }

  async setTokenPushOnUser() {
    const oUser = await this.storage.getStorage('oUser');
    const oPush = await this.storage.getStorage('oPush');
    if (oPush) this.ms.patchMaster(`users/${oUser._id}`, { push: oPush })
      .subscribe(() => null);
  }

  private setLocation(id: string) {
    interval(30*1000)
    .subscribe(async () => {
      const { coords } = await Geolocation.getCurrentPosition();
      if (coords) {
        this.ms.patchMaster(`companies/${id}`, {
          latitude: +coords.latitude,
          longitude: +coords.longitude,
        }).subscribe(res => res);
      }
    });
  }

  async getUser () {
    await this.loadBanner();
    const user = await this.storage.getStorage('oUser');
    if (user) {
      await this.stripe.checkRecord(user);
      this.store.dispatch(actions.loadedUser({ user }));
      this.store.dispatch(actions.loadCompany({ user: user._id }));
      this.updateLocation();
    }
  }

  async loadBanner() {
    const { coords } = await Geolocation.getCurrentPosition();
    if (coords) {
      const data = { latitude: coords.latitude, longitude: coords.longitude };
      this.store.dispatch(actions.bannerLoad({ data }));
    }
  }
}
