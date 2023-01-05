import { switchMap } from 'rxjs/operators';
import { MasterService } from './master.service';
import { Injectable } from "@angular/core";
import { UtilsService } from './utils.service';
import { Browser } from '@capacitor/browser';


@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(
    private ms: MasterService,
    private uService: UtilsService,
  ) {}

  checkRecord(user: any) {
    console.log(user);
    const payment$ = this.ms.getMaster(`payments/user/${user._id}`)
    payment$.subscribe(paid => {
      if (!paid) {
        this.ms.postMaster('payments/create-customer', user)
        .pipe(
          switchMap((item: any) => {
            console.log(item);
            const data = { customer: item.id };
            return this.ms.postMaster('payments/create-checkout-session', data);
          })
        )
        .subscribe(async(res: any) => {
          Browser.open({ url: res.url });
        });
      }
    }); 
  }

  checkCheckoutSession(session: string) {
    
  }
}
