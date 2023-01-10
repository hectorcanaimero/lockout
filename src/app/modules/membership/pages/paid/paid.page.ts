import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StorageService } from '@core/services/storage.service';
import { UtilsService } from '@core/services/utils.service';

  @Component({
  selector: 'app-paid',
  templateUrl: 'paid.page.html',
  styleUrls: ['paid.page.scss'],
  providers: [DatePipe]
})
export class PaidPage implements OnInit {
  user: any;
  payment: any;
  today = new Date();
  constructor(
    private uService: UtilsService,
    private storage: StorageService
  ){}

  async ngOnInit(): Promise<void> {
    await this.getData();
  }

  onPay() {
    console.log('object');
  }

  onClose(): void {
    this.uService.modalDimiss();
  }

  private async getData() {
    this.user = await this.storage.getStorage('oUser');
    console.log(this.user);
    this.payment = await this.storage.getStorage('oPayment');
    console.log(this.payment);
  }
}
