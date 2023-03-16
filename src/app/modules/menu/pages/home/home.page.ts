import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { Browser } from'@capacitor/browser';
import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
import { UtilsService } from '@core/services/utils.service';
import { MobileService } from '@core/services/mobile.services';
import { AuthService } from '@modules/users/services/auth.service';
import * as MemberPage from '@modules/membership/pages/paid/paid.page';
import { PostContentsWidgetComponent } from '@modules/contents/widget/post/post.component';
import { StorageService } from '@core/services/storage.service';
import { MasterService } from '@core/services/master.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  position: number;
  appInfo: any;
  content = [
    { name: 'MENU.PROFILE', url: '/user/profile' },
    { name: 'MENU.COMPANY', url: '/pages/companies' },
    { name: 'MENU.CHAT', url: '/chat/soporte' }
  ];
  subContent = [
    { name: 'MENU.ABOUT', url: 'https://meka.do', modal: false }
  ];
  user$: Observable<any>;
  count$: Observable<number>;
  active: boolean;
  user: any;
  company: any = [];

  company$: Observable<any>;
  ts: string = '';
  session: any;

  constructor(
    private ms: MasterService,
    private auth: AuthService,
    private store: Store<AppState>,
    private uService: UtilsService,
    private storage: StorageService,
    private mService: MobileService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.getCompany();
    this.countClosedJobs();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.getAppInfo();
    await this.sessionStripe();
  }

  async sessionStripe() {
    const oPayment = await this.storage.getStorage('oPayment');
    this.ms.getMaster('payments/checkout-session/' + oPayment.session)
    .subscribe((res) => {
      this.session = res;
    })
  }

  async getAppInfo(): Promise<void> {
    this.appInfo = await this.mService.getAppInfo();
  }

  getCompany = () => {
    this.company$ = this.store.select('company')
    .pipe(
      filter(({ loading }: any) => !loading),
      map(({ company }: any) => {
        this.active = company?.status;
        return company;
      })
    );
  };

  goToPage(url: string) {
    this.uService.navigate(url);
  }

  async goToMembresia (): Promise<void> {
    await this.uService.modal({
      mode: 'ios',
      initialBreakpoint: .7,
      breakpoints: [0, .7],
      component: MemberPage.PaidPage,
      componentProps: { res: this.session }
    });
  };

  async onAboutMeka() {
    await Browser.open({ url: 'https://meka.do' });
  }

  countClosedJobs = () => {
    this.count$ = this.store.select('closed')
    .pipe(
      filter(row => !row.loading),
      map((res: any) => res.total)
    );
  }

  async onPost(title: string): Promise<void>{
    await this.uService.modal({
      component: PostContentsWidgetComponent,
      componentProps: { title }
    });
  };

  onOffLine (user: string): void {
    this.store.dispatch(actions.updateCompany({user, data: this.active }));
  };

  onLink (url: string): void {
    this.uService.navigate(url);
  }

  async logout(): Promise<void> {
    await this.uService.load({
      message: this.translate.instant('PROCCESSING'),
      duration: 1000
    });
    await this.mService.getGlobalization(); 
    await this.storage.clearStorages();
    await this.auth.signOut();
  }
}
