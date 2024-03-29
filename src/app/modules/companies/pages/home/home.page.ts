import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AppState } from '@store/app.state';
import { RegisterPage } from './../register/register.page';
import { DbCompaniesService } from './../../services/db-companies.service';

import { StorageService } from '@core/services/storage.service';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

  company$: Observable<any>;
  load: boolean = true;

  constructor(
    private store: Store<AppState>,
    private navCtrl: NavController,
  ) {}

  ngAfterViewInit() {
    this.company$ = this.store.select('company').pipe(
      filter(row => !row.loading),
      map((res: any) => res.company)
    );
    this.company$.subscribe((res) => console.log(res));
  }

  onEdit =  (item?: any) => {
    this.navCtrl.navigateRoot('/pages/companies/add');
  };
}
