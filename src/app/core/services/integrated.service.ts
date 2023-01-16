import { filter, map, switchMap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
import { StorageService } from '@core/services/storage.service';
import { MasterService } from '@core/services/master.service';
import { UtilsService } from '@core/services/utils.service';
import { Browser } from '@capacitor/browser';
import { Geolocation } from '@capacitor/geolocation';
import { StripeService } from './stripe.service';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntegratedService {

  constructor(
    private ms: MasterService,
    private uService: UtilsService,
    private store: Store<AppState>,
    private storage: StorageService,
    private stripe: StripeService,
  ) {
  }
  
  initState(): void {
    this.getUser();    
  };

  pageState() {

    // this.store.select('company')
    // .pipe(
    //   filter(row => !row.loading),
    //   map(res => res.company)
    // )
    // .subscribe((res: any) => {
    //   console.log('AGE STATE ', res);
    //   if (res._id) {
    //     this.store.dispatch(actions.acceptedInit({ id: res._id }));
    //     this.store.dispatch(actions.inProcessInit({ id: res._id }));
    //     this.store.dispatch(actions.historyInit({ id: res._id }));
    //   }
    // });
  }
  page2State() {
    this.store.dispatch(actions.expertLoad());
    return this.store.select('company')
    .pipe(
      filter(row => !row.loading),
      switchMap(({ company }: any) => {
        this.store.dispatch(actions.initScore({ user: company._id }));
        return this.ms.getMaster(`services/company/active/${company._id}`).pipe(take(1));
      }
      )
    )
  }

  processing(data: any) {
    const accepted = data.filter((row: any) => row.status === 'accepted');
    this.store.dispatch(actions.acceptedLoaded( { items: accepted }));
    const inProcess = data.filter((row: any) => row.status === 'in_process');
    this.store.dispatch(actions.inProcessLoaded( { items: inProcess }));
  }

  onSync = () => {};

  onPushCompany = () => {
    this.uService.navigate('register-company');
  };

  getCompany = async () => {
    const user = await this.storage.getStorage('oUser');
    if (user) {
      this.getExistCompany(user._id);
      if (user.status) {
        this.updateLocation();
      }
    }
  };

  updateLocation() {
    const company$ = this.store.select('company')
    .pipe(filter(row => !row.loading), map((res: any)=> res.company));
    company$.subscribe((res: any) => {
      if (res.typeCompany.type === 1) {
        this.setLocation(res._id);
      }
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

  private getExistCompany(user: any) {
    this.store.dispatch(actions.loadCompany({ user }));
  }

  private getUser = async () => {
    const user = await this.storage.getStorage('oUser');
    if (user) {
      this.store.dispatch(actions.loadedUser({ user }));
      this.getExistCompany(user._id);
      this.stripe.checkRecord(user);
    }
  }
}
