import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { filter, map, tap } from 'rxjs/operators';
import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
import { UtilsService } from '@core/services/utils.service';
import { MobileService } from '@core/services/mobile.services';
import { StorageService } from '@core/services/storage.service';
import { AuthService } from '@modules/users/services/auth.service';
import * as MemberPage from '@modules/membership/pages/paid/paid.page';
import { PostContentsWidgetComponent } from '@modules/contents/widget/post/post.component';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  position: number;
  appInfo: any;
  content = [
    { name: 'Perfil', url: '/user/profile' },
    { name: 'Compañia', url: '/pages/companies' },
    { name: 'Mensajes', url: '/chat/soporte' }
  ];
  subContent = [
    { name: 'Privacy Policy', modal: true },
    { name: 'Term of Use', modal: true },
    { name: 'About Meka', modal: true }
  ];
  user$: Observable<any>;
  count$: Observable<number>;
  active: boolean;
  user: any;
  company: any = [];

  company$: Observable<any>;
  ts: string = '';

  constructor(
    private auth: AuthService,
    private store: Store<AppState>,
    private uService: UtilsService,
    private mService: MobileService,
  ) {}

  ngOnInit(): void {
    this.getCompany();
    this.countClosedJobs();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.getAppInfo();
  }

  async getAppInfo(): Promise<void> {
    this.appInfo = await this.mService.getAppInfo();
  }

  getCompany = () => {
    this.company$ = this.store.select('company')
    .pipe(
      filter(row => !row.loading),
      map(({ company }: any) => {
        this.active = company.status;
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
      initialBreakpoint: 1,
      breakpoints: [0, .5, .85, 1],
      component: MemberPage.PaidPage,
    });
  };

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
      message: 'Delete User info...',
      duration: 2500
    });
    await this.auth.signOut();
  }
}
