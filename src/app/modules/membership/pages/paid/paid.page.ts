import { filter, map, Observable, subscribeOn, timer } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { Browser } from '@capacitor/browser';

import { AppState } from '@store/app.state';
import { StorageService } from '@core/services/storage.service';
import { UtilsService } from '@core/services/utils.service';
import { MasterService } from '@core/services/master.service';

@Component({
  selector: 'app-paid',
  templateUrl: 'paid.page.html',
  styleUrls: ['paid.page.scss'],
  providers: [DatePipe]
})
export class PaidPage implements OnInit {
  @Input() close = true;
  company$!: Observable<any>;
  diff: number;
  total = 0;
  url: string;
  user: any;
  res!: any;
  payment: any;
  checkout: any;
  constructor(
    private ms: MasterService,
    private store: Store<AppState>,
    private uService: UtilsService,
    private storage: StorageService,
  ){}

  async ngOnInit(): Promise<void> {
    this.getCompany();
    await this.getData();
  }

  async onPay(url) {
    await Browser.open({ url });
    Browser.addListener('browserFinished', () => 
      this.uService.modalDimiss());
  }

  onClose(): void {
    this.uService.modalDimiss();
  }

  diffData(start: number, end: number) {
    const a = moment.unix(start);
    const b = moment.unix(end);
    return b.diff(a, 'days');
  }

  getCompany() {
    this.company$ = this.store.select('company').pipe(
      filter(row => !row.loading),
      map((res: any) => res.company)
    );
  }


  private async getData() {
    this.user = await this.storage.getStorage('oUser');
    this.getInfo(this.user._id);
    this.payment = await this.storage.getStorage('oPayment');
    this.diff = this.diffData(this.payment.data.trial_start, this.payment.data.trial_end);
    this.ms.postMaster('payments/billing-portal2', { customer: this.payment.customer })
    .subscribe((res: any) =>this.url = res.url);
  }

  private getInfo(id: string) {
    this.ms.getMaster(`payments/user/${id}`)
    .subscribe((res) => {
      this.createCheckoutSession(res.data);
      this.payment = res;
    })
  }

  private createCheckoutSession(data: any) {
    const body = {
      price: data.plan.id,
      customer: data.customer
    };
    this.ms.postMaster('payments/create-checkout-session', body)
    .subscribe((session: any) => this.checkout = session.url);
  }
}
