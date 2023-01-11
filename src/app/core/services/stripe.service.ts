import { PaidPage } from './../../modules/membership/pages/paid/paid.page';
import { MasterService } from './master.service';
import { Injectable } from "@angular/core";
import { UtilsService } from './utils.service';
import { Browser } from '@capacitor/browser';
import { StorageService } from './storage.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(
    private ms: MasterService,
    private uService: UtilsService,
    private store: Store<AppState>,
    private storageService: StorageService,
  ) { }
  async validatePeriodtest() {
    const { createdAt } = await this.storageService.getStorage('oUser');
    const payment = await this.storageService.getStorage('oPayment');
    const conf: any = payment.config[0];
    const diff = this.diffData(createdAt);
    console.log(diff, conf.free);
    console.log('DIFF', diff > conf.free);
    if (diff >= conf.free) {
      this.checkoutSession(payment);
    }
  }

  async checkoutSession(payment: any) {
    if(!payment.session) {
      this.setPaymentSession(payment);
    } else {
      this.getPaymentSession(payment);
    }
  }

  setPaymentSession(payment: any): void {
    const data = { customer: payment.customer, price: payment.config[0].price };
    this.ms.postMaster('payments/create-checkout-session', data)
    .subscribe(async (res: any) => {
      this.uService.modal({
        mode: 'ios',
        component: PaidPage,
        componentProps: { res, close: false  }
      })
      // await Browser.open({ url: res.url });
    });
    this.setPaymentStorage(payment.user._id);
  }

  getPaymentSession(payment: any): void {
    this.ms.getMaster('payments/checkout-session/' + payment.session)
    .subscribe(async (res: any) => {
      console.log(res);
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

  checkRecord(user: any) {
    const payment$ = this.ms.getMaster(`payments/user/${user._id}`)
    payment$.subscribe(async (paid) => {
      if (!paid) {
        this.setPayment();
      } else {
        await this.storageService.setStorage('oPayment', paid);
      }
    });
  }

  setPayment() {
    const company$: Observable<any> = this.getCompany();
    company$.subscribe(arg => {
      this.createCustomer(arg);
    });
  }


  createCustomer(item: any) {
    const data = this.parseData(item);
    this.ms.postMaster('payments/create-customer', data)
    .subscribe(res => console.log(res))
  }

  setPaymentConfig(): void { }

  private setPaymentStorage(user) {
    const payment$ = this.ms.getMaster(`payments/user/${user}`)
    payment$.subscribe(async (paid) => {
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
      type: data.typeCompany.type
    }
  }

  private getCompany(): Observable<any> {
    return this.store.select('company').pipe(
      filter(row => !row.loading),
      map((res: any) => res.company),
    )
  }
}
