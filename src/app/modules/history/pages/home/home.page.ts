import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { AppState } from '@store/app.state';
import { UtilsService } from '@core/services/utils.service';
import { MasterService } from '@core/services/master.service';
import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements AfterViewInit {
  expert: any = [];
  items$: Observable<any[]>;
  loading = false;

  constructor(
    private ms: MasterService,
    private store: Store<AppState>,
    private uService: UtilsService,
  ) {}

  ngAfterViewInit(): void {
    this.getData();
  }

  getData() {
    this.items$ = this.store.select('history')
    .pipe(
      filter(row => !row.loading),
      map((res: any) => res.history)
    );
  }

  async openService (res: any): Promise<void> {
    await this.uService.modal({
      mode: 'ios',
      componentProps: { res },
      component: WaitingComponent,
      initialBreakpoint: 1,
      breakpoints: [0, .65, 1],
    });
  };
}
