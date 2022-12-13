import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { DbCompaniesService } from '@modules/companies/services/db-companies.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  offline: boolean;
  company: any = [];
  code$: Observable<number>;
  company$: Observable<any> = new Observable();

  constructor(
    private store: Store<AppState>,
    private db: DbCompaniesService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData = () => {
    this.code$ = this.store.select('company')
    .pipe( filter(row => !row.loading), map((res: any) => res.company?.id) );
  }

  loadServices = () => {
    this.store.select('company').pipe().subscribe((res: any) => {
      this.company = res.company.length;
      if (this.company === 0) {
        this.db.getExistCompany();
      }
    });
  };
  doRefresh = (event: any) => {
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1500);
  };
}
