import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';
import { SocketService } from '@core/services/socket.service';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { UtilsService } from '@core/services/utils.service';
import { StorageService } from '@core/services/storage.service';

@Component({
  selector: 'app-services-open-widget',
  templateUrl: './services-open-widget.component.html',
  styleUrls: ['./services-open-widget.component.scss'],
})

export class ServicesOpenWidgetComponent implements OnInit, AfterViewInit {

  loading = true;
  company: number;
  language: string;
  items$: Observable<any>;
  service$: Observable<any>;
  options = { freeMode: true, spaceBetween: 10, slidesPerView: 1.9,  };
  constructor(
    private store: Store<AppState>,
    private uService: UtilsService,
    private storage: StorageService,
    private socketService: SocketService,
    ) { }
  
  async ngOnInit(): Promise<void> {
    const { language } = await this.storage.getStorage('oUser');
    this.language = language;
  }

  ngAfterViewInit(): void {
    this.getServices();
    this.getFetchService();
  }

  getFetchService() {
    return this.socketService.onFetchService().pipe(
      map((res: any) => {
        console.log('SOCKET', res);
        if (res && res.length) {
          return res.filter((row: any) => row.status === 'in_process');
        } else if (res.status === 'in_process') {
          return res;
        }
      })
    );
  }

  getServices() {
    this.service$ = this.store.select('serviceInProcess').pipe(
      filter(row => !row.loading),
      map((res: any) => res.items)
    );
  }

  async openModal (res: any, company: number): Promise<void> {
    await this.uService.modal({
      mode: 'ios',
      breakpoints: [0, .65, 1],
      initialBreakpoint: 1,
      component: WaitingComponent,
      componentProps: { res, company },
    });
  };
}
