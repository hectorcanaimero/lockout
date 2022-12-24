import { AlertController, NavController } from '@ionic/angular';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
import { StorageService } from '@core/services/storage.service';
import { Router } from '@angular/router';
import { MasterService } from '@core/services/master.service';
import { UtilsService } from '@core/services/utils.service';
import { Browser } from '@capacitor/browser';

@Injectable({
  providedIn: 'root'
})
export class IntegratedService {

  constructor(
    private ms: MasterService,
    private uService: UtilsService,
    private store: Store<AppState>,
    private storage: StorageService,
  ) { }

  initState = () => {
    this.getUser();
  };

  paymentCheck(): void {
    const session$ = this.store.select('user')
    .pipe(
      filter((row: any) => !row.loading),
      map(({user}: any) => user),
      switchMap((res: any) =>
        this.ms.getMaster(`stripe/checkout/session/${res.subscriptionID}`))
    );
    session$.subscribe(async res => {
      console.log(res)
      if (res.payment_status === 'unpaid') {
        await Browser.open({ url: res.url });
      }
    });
  }

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
    }
  };

  async setTokenPushOnUser() {
    const oUser = await this.storage.getStorage('oUser');
    const oPush = await this.storage.getStorage('oPush');
    if (oPush) this.ms.patchMaster(`users/${oUser._id}`, { push: oPush })
      .subscribe(() => null);
  }

  private getExistCompany(user: any) {
    this.store.dispatch(actions.loadCompany({ user }));
  }

  private getUser = async () => {
    const user = await this.storage.getStorage('oUser');
    if (user) {
      this.store.dispatch(actions.loadedUser({ user }));
      this.getExistCompany(user._id);
    }
  }
}
