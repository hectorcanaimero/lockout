import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { AppState } from '@store/app.state';
import { UtilsService } from '@core/services/utils.service';
import { MasterService } from '@core/services/master.service';
import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  expert: any = [];
  items$: Observable<any[]>;
  loading = false;

  constructor(
    private ms: MasterService,
    private store: Store<AppState>,
    private uService: UtilsService,
  ) {}
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.items$ = this.store.select('company')
    .pipe(
      filter(row => !row.loading),
      switchMap(({ company }: any) =>
        this.ms.getMaster(`services/company/history/${company._id}`))
    );
    this.items$.subscribe(res => console.log(res));
  }

  async openService (res: any): Promise<void> {
    await this.uService.modal({
      mode: 'ios',
      componentProps: { res },
      component: WaitingComponent,
    });
  };
}
