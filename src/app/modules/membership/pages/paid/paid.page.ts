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
  @Input() res: any;
  @Input() close = true;
  user: any;
  payment: any;
  url: string;
  total = 0;
  company$!: Observable<any>;
  constructor(
    private ms: MasterService,
    private store: Store<AppState>,
    private uService: UtilsService,
    private storage: StorageService,
  ){}

  async ngOnInit(): Promise<void> {
    this.getCompany();
    await this.getData();
    timer(300).subscribe(() => console.log(this.res));
  }

  async onPay(url) {
    await Browser.open({ url });
    Browser.addListener('browserFinished', () => 
      this.uService.modalDimiss());
  }

  onClose(): void {
    this.uService.modalDimiss();
  }

  diffData(createdAt: any) {
    const a = moment(createdAt).format();
    return moment().diff(a, 'days');
  }

  getCompany() {
    this.company$ = this.store.select('company').pipe(
      filter(row => !row.loading),
      map((res: any) => res.company)
    );
  }


  private async getData() {
    this.user = await this.storage.getStorage('oUser');
    this.payment = await this.storage.getStorage('oPayment');
    const diff = this.diffData(this.user.createdAt);
    this.total = this.payment.config.free - diff;
    console.log(this.total);
    this.ms.postMaster('payments/billing-portal', { user: this.payment.user._id })
    .subscribe((res: any) =>{
      this.url = res.url;
    });
  }
}
