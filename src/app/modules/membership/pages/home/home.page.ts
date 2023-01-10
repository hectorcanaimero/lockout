import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { filter, map, take, tap, switchMap } from 'rxjs/operators';
import { StripeCardComponent, StripeCardNumberComponent, StripeService } from "ngx-stripe";
import {
  StripeElements,
  StripeElementsOptions,
  StripeCardNumberElementOptions,
  StripeCardNumberElement,
  StripeCardCvcElement,
  StripeCardExpiryElement,
  StripeCardExpiryElementOptions,
  StripeCardCvcElementOptions,
  StripeCardElementOptions
} from '@stripe/stripe-js';

import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
import { StorageService } from '@core/services/storage.service';
import { MemberService } from '../../services/membership.service';
import { DatePipe } from '@angular/common';
import { from, Observable } from 'rxjs';
import { ConnectService } from '@modules/chat/services/connect.service';
import { Router } from '@angular/router';
import { MasterService } from '@core/services/master.service';


  @Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [DatePipe]
})
export class HomePage implements OnInit {

  // @ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  entry$: Observable<any>;
  item: any = [];
  invisible = false;
  elements: StripeElements;
  cvcCard: StripeCardCvcElement;
  numberCard: StripeCardNumberElement;
  expiryCard: StripeCardExpiryElement;

  // cardOptions: StripeCardElementOptions = {
  //   iconStyle: 'solid',
  //   style: {
  //     base: {
  //       color: '#303030', fontWeight: '400', fontFamily: 'Roboto, sans-serif',
  //       fontSize: '18px', '::placeholder': { color: '#303030' },
  //     }
  //   }
  // }
  // elementsOptions: StripeElementsOptions = { locale: 'es' };

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };

  paidState = true;

  constructor(
    private db: MemberService,
    private router: Router,
    private ms: MasterService,
    private store: Store<AppState>,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private stripeService: StripeService,
    private loadingCtrl: LoadingController,
    private storageService: StorageService,
  ) { }

  async ngOnInit() {
    this.getData();
    this.loadStripe();
  }

  getData(): void {
    const promise: any = this.storageService.getStorage('oPayment');
    this.entry$ = from(promise).pipe(
      switchMap((res: any) => {
        console.log(res);
        return this.ms.getMaster(`payments/subscription/${res.subscription}`)
      })
    );
    this.entry$.subscribe(res => console.log(res));
  }

  onCancelSubscription() {
    console.log('on Cancel Subscription');
  }

  onPaid(sessionId: string) {
    // this.paidState = !this.paidState;
    this.stripeService.redirectToCheckout({ sessionId })
      .subscribe((result: any) => {
        console.log(result);
      })
  }

  async onPay () {
    const payment: any = await this.storageService.getStorage('oPayment');
    if (payment) {
      console.log(payment.client_secret);
      this.stripeService.confirmCardPayment(
        payment.client_secret, 
        {
          payment_method: {
            card: this.card.element,
            billing_details: { name: 'Plan' },
          },
        }
        ).subscribe((result) => {
        console.log(result);
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          console.log(result.error.message);
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
          }
        }
      });
    }
  }

  onClose = () => this.modalCtrl.dismiss();
  private send = (item: any) => {
    const data = {
      payment_method: {
        card: this.card.element,
        billing_details: { name: item.name, email: item.email },
      },
    }
    this.loadingCtrl.dismiss();
    this.stripeService.confirmCardSetup(item.client, data).subscribe(
      async(res) => {
        console.log('confirmCardSetup ', res);
        if (res.error) {
          this.alertMessage('Error', res.error.message);
        } else {
          this.store.dispatch(actions.stripeLoad({ uid : item.subscription }));
          this.alertMessage('Success', 'O Pagamento foi recibido!');
          this.invisible = true;
          this.router.navigate(['/pages', 'home']);
        }
      },
      async (err: any) => {
        console.log('Err ', err);
      }
    );
  }

  loadStripe() {
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => this.elements = elements);
  }
  private alertMessage = async (header: string, message: string) => {
    const alert = await this.alertCtrl.create({header, message, mode:'ios', buttons: ['OK']});
    alert.present();
  };
}
