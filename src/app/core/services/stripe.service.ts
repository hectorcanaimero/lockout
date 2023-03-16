import { Injectable } from "@angular/core";

import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { AppState } from '@store/app.state';
import { UtilsService } from './utils.service';
import { MasterService } from './master.service';
import { StorageService } from './storage.service';
import { PaidPage } from '@modules/membership/pages/paid/paid.page';
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private company: any;
  constructor(
    private ms: MasterService,
    private platform: Platform,
    private uService: UtilsService,
    private store: Store<AppState>,
    private storageService: StorageService,
  ) {
    this.getCompany();
  }

  lockBackButton() {
    App.addListener('backButton', ({canGoBack}) => {
      console.log(canGoBack);
    });
  }

  async validatePeriodtest() {
    const { createdAt } = await this.storageService.getStorage('oUser');
    const payment = await this.storageService.getStorage('oPayment');
    if (payment && payment.config) {
      const conf: any = payment.config;
      const diff = this.diffData(createdAt);
      if (diff >= conf.free) this.checkoutSession(payment);
      this.lockBackButton();
    }
  }

  async checkoutSession(payment: any) {
    if(!payment.session) this.setPaymentSession(payment);
    else this.getPaymentSession(payment);
  }

  setPaymentSession(payment: any): void {
    const data = { customer: payment.customer, price: payment.config.price };
    console.log(data);
    this.ms.postMaster('payments/create-checkout-session', data)
    .subscribe(async (res: any) => {
      this.uService.modal({
        mode: 'ios',
        component: PaidPage,
        componentProps: { res, close: false  }
      })
    }); 
    this.setPaymentStorage(payment.user);
  }

  getPaymentSession(payment: any): void {
    this.ms.getMaster('payments/checkout-session/' + payment.session)
    .subscribe(async (res: any) => {
      if (res.payment_status === 'unpaid') {
        this.uService.modal({
          mode: 'ios',
          component: PaidPage,
          componentProps: { res, close: false }
        })
      }
    });
  }


  diffData(createdAt: any) {
    const a = moment(createdAt).format();
    return moment().diff(a, 'days');
  }

  async checkRecord(user: any) {
    const paid: any = await this.storageService.getStorage('oPayment');
    if (!paid) {
      this.ms.getMaster(`payments/user/${user._id}`)
      .subscribe(async res => {
        if (res) await this.storageService.setStorage('oPayment', res);
        else this.createCustomer();
      });
    }
  }

  validCustomerStripe() {
    this.store.select('company')
    .pipe(filter(row => !row.loading), map((res: any) => res.company))
    .subscribe((arg: any) => this.createCustomer());
  }


  async createCustomer() {
    if(this.company) {
      this.ms.postMaster('payments/create-customer', this.company)
      .subscribe(async (paid: any) => {
        await this.storageService.setStorage('oPayment', paid);
      })
    }
  }

  setPaymentConfig(): void { }

  private setPaymentStorage(user) {
    this.ms.getMaster(`payments/user/${user}`)
    .subscribe(async (paid) => {
      await this.storageService.setStorage('oPayment', paid);
    });
  }

  createCheckoutSession(session: string) {

  }

  createCustomerAndSubscription(user: any) {
    this.ms.postMaster('payments/create-customer', user)
    .pipe(
      switchMap((item: any) => {
        console.log(item);
        const data = { customer: item.id };
        return this.ms.postMaster('payments/create-subscription', data);
      })
    )
    .subscribe(async(res: any) => {
      console.log(res);
      Browser.open({ url: res.url });
    });
  }


  private parseData(data: any) {
    return {
      id: data.user._id,
      email: data.user.email,
      name: `${ data.user.first_name } ${ data.user.last_name }`,
      free: data.typeCompany.free,
      priceId: data.typeCompany.price_id,
      price: data.typeCompany.price,
    }
  }

  private getCompany(): void {
    this.store.select('company').pipe(
      filter(row => !row.loading),
      map((res: any) => res.company),
    ).subscribe(res => this.company = res);
  }
}
