import { SplashScreen } from '@capacitor/splash-screen';
import { ModalController } from '@ionic/angular';
import { Component, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { App } from '@capacitor/app';
import { Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs/operators';

import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
import { StorageService } from '@core/services/storage.service';
import { MemberService } from '@modules/membership/services/membership.service';
import { ValidationTokenService } from '@core/services/validation-token.service';
import { RegisterPage } from '@modules/companies/pages/register/register.page';
import { timer } from 'rxjs';
import { IntegratedService } from '@core/services/integrated.service';
import { StripeService } from '@core/services/stripe.service';
import { MobileService } from '@core/services/mobile.services';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagesPage implements AfterViewInit {
  oConfig: any;
  company: number;
  user: any;
  constructor(
    private mobile: MobileService,
    private store: Store<AppState>,
    private storage: StorageService,
    private modalCtrl: ModalController,
    private iService: IntegratedService,
    private stripeService: StripeService,
    private validateService: ValidationTokenService,
  ) { }

    ionViewDidEnter() {
      SplashScreen.hide();
    }

  async ngOnInit(): Promise<void> {
    this.appActive();
    await this.getLoadAppMobile();
    this.iService.getUser();
    await this.iService.setTokenPushOnUser();
    await this.mobile.getPush();
    await this.mobile.getGlobalization();
  }

  ngAfterViewInit() {
    this.iService.page2State().subscribe(res => res ? this.iService.processing(res) : null)
    this.stripeCustomer();
    this.getConfigStripe();
    this.validateService.validateMember();
    this.setDataValidateStripe(3);
    // this.loadServices();
  }

  appActive (): void {
    App.addListener('appStateChange', ({ isActive }) => {
      if (isActive) {
        this.setDataValidateStripe(2);
        this.iService.page2State().subscribe(res =>
          this.iService.processing(res))
      }
    });
  };

  loadServices = () => {
    this.store.select('company')
    .pipe(filter((row: any) => !row.loading), map((res: any) => res.company))
    .subscribe((res: any) => {
      if(res) { 
        this.stripeService.checkRecord(res.user);
      } else {
        this.goToCompany(); 
      }
    });
  };

  private setDataValidateStripe(second: number) {
    timer(second * 700).subscribe(() => {
      this.stripeService.validatePeriodtest();
    })
  }

  private stripeCustomer = async () => {
    const user = await this.storage.getStorage('userCompany');
    if (user) {
      const data = {
        name: `${user.fist_name} ${user.last_name}`, email: user.email };
      this.store.dispatch(actions.customerLoad({ email: user.email}));
      this.constructCustomerStripe(data);
    }
  }

  private constructCustomerStripe = (data: any) => {
    this.store.select('customer').pipe(filter((row: any) => !row.loading))
    .subscribe(
      (res: any) => {
        if (res.item.message || res.error) {
          // this.memberService.createCustomer(data)
            // .subscribe((res: any) => this.store.dispatch(actions.customerLoad({ email: data.email})));
        }
      }
    )

  }

  // private createSubscription = (price: string) => {
  //   this.store.select('customer').pipe(filter((row: any) => row.item?.status), map((res: any) => res.item?.item))
  //   .subscribe((res: any) => {
  //     if (res) {
  //       const data: any = { customer: res.id, price };
  //       this.dispatchSubscription(res, data);
  //     }
  //   });
  // }

  private dispatchSubscription = (res: any, data: any) => {
    if(res?.subscription) {
      this.store.dispatch(actions.stripeLoad({ uid: res.subscription }));
    } else {
      this.store.dispatch(actions.stripeCreate({ data}));
    }
  }


  private getConfigStripe = () => {
    let data: any;
    // this.memberService.getConfig().pipe(take(1)).subscribe(
    //   (res: any) => {
    //     data = res;
    //     // this.createSubscription(res.mechanics);
    //     this.storage.setStorage('oConfig', res).then(() => {});
    //   });
  }

  private goToCompany = async () => {
    const modal = await this.modalCtrl.create({ component: RegisterPage });
    modal.present();
  };

  private async getLoadAppMobile(): Promise<void> {

  }
}
