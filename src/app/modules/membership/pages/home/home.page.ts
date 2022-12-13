import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { filter, map, take, tap } from 'rxjs/operators';
import { StripeCardNumberComponent, StripeService } from "ngx-stripe";
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
import { Observable } from 'rxjs';
import { ConnectService } from '@modules/chat/services/connect.service';
import { Router } from '@angular/router';


  @Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [DatePipe]
})
export class HomePage implements OnInit {

  @ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;
  entry$: Observable<any>;
  item: any = [];
  invisible = false;
  elements: StripeElements;
  cvcCard: StripeCardCvcElement;
  numberCard: StripeCardNumberElement;
  expiryCard: StripeCardExpiryElement;

  cardOptions: StripeCardElementOptions = {
    iconStyle: 'solid',
    style: {
      base: {
        color: '#303030', fontWeight: '400', fontFamily: 'Roboto, sans-serif',
        fontSize: '18px', '::placeholder': { color: '#303030' },
      }
    }
  }
  elementsOptions: StripeElementsOptions = { locale: 'es' };

  constructor(
    private db: MemberService,
    private store: Store<AppState>,
    private router: Router,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private stripeService: StripeService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.stripeService.elements(this.elementsOptions).subscribe(elements => this.elements = elements);
    this.loadData();
  }

  loadData = () => {
    this.entry$ = this.store.select('stripe')
    .pipe(filter(row => !row.loading), map((res: any) => res.item))
    // entry$.subscribe(res => this.item = res);
  }

  onPay = async () => {
    const load = await this.loadingCtrl.create({ message: 'Procesando...' });
    await load.present();
    this.store.select('customer')
    .pipe(
      filter(row => !row.loading),
      map((res: any) => res.item.item),
    )
    .subscribe((res: any) =>{
      console.log(res);
      this.send(res);
    });

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

  private alertMessage = async (header: string, message: string) => {
    const alert = await this.alertCtrl.create({header, message, mode:'ios', buttons: ['OK']});
    alert.present();
  };
}
