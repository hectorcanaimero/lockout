import { switchMap } from 'rxjs/operators';
import { MasterService } from './master.service';
import { Injectable } from "@angular/core";
import { UtilsService } from './utils.service';
import { Browser } from '@capacitor/browser';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(
    private ms: MasterService,
    private uService: UtilsService,
    private storageService: StorageService,
  ) {}

  checkRecord(user: any) {
    const payment$ = this.ms.getMaster(`payments/user/${user._id}`)
    payment$.subscribe(async (paid) => {
      if (!paid) {
        this.createCustomerAndSubscription(user);
      } else {
        await this.storageService.setStorage('oPayment', paid);
      }
    }); 
  }

  checkCheckoutSession(session: string) {
    
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
}
