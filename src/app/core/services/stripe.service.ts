import { Injectable } from "@angular/core";
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { filter, map, switchMap, tap, take } from 'rxjs/operators';

import { AppState } from '@store/app.state';
import { UtilsService } from './utils.service';
import { MasterService } from './master.service';
import { StorageService } from './storage.service';
import { PaidPage } from '@modules/membership/pages/paid/paid.page';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private company: any;
  constructor(
    private ms: MasterService,
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
    const { _id } = await this.storageService.getStorage('oUser');
    this.ms.getMaster(`payments/user/${_id}`)
    .pipe(take(1))
    .subscribe((payment: any) => {
      if (payment) {
        if (payment.data.cancel_at_period_end) {
          this.checkoutSession(payment);
        } else {
          this.lockBackButton();
        }
      }
    })
  }

  async checkoutSession(payment: any) {
    if(!payment.session) this.setPaymentSession(payment);
    else this.getPaymentSession(payment);
  }

  setPaymentSession(payment: any): void {
    const data = { customer: payment.customer, price: payment.config.priceId };
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
    console.log('A', a);
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

  createCustomer() {
    if(this.company) {
      this.ms.postMaster('payments/create-customer', this.company)
      .subscribe(async (paid: any) => {
        await this.storageService.setStorage('oPayment', paid);
      })
    }
  }

  setPaymentConfig(): void {}

  private setPaymentStorage(user) { 
    this.ms.getMaster(`payments/user/${user._id}`)
    .subscribe(async (paid) => {
      await this.storageService.setStorage('oPayment', paid);
    });
  }

  createCheckoutSession(session: string) {}

  createCustomerAndSubscription(user: any) {
    this.ms.postMaster('payments/create-customer', user)
    .pipe(
      switchMap((item: any) => {
        const data = { customer: item.id };
        return this.ms.postMaster('payments/create-subscription', data);
      })
    )
    .subscribe(async(res: any) => Browser.open({ url: res.url }));
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
