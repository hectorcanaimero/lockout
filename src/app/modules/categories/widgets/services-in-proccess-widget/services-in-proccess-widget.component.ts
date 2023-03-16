import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AppState } from '@store/app.state';
import { UtilsService } from '@core/services/utils.service';
import { SocketService } from '@core/services/socket.service';
import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';
import { StorageService } from '@core/services/storage.service';

@Component({
  selector: 'app-services-in-proccess-widget',
  templateUrl: './services-in-proccess-widget.component.html',
  styleUrls: ['./services-in-proccess-widget.component.scss'],
})

export class ServicesInProccessWidgetComponent implements OnInit, AfterViewInit {
  unread: any;
  companyId = 0;
  ids: any = [];
  company: string;
  offline: boolean;
  language: string;
  services$: Observable<any>;
  total$: Observable<number>;
  items$: Observable<[] | any>;


  constructor(
    private store: Store<AppState>,
    private uService: UtilsService,
    private storage: StorageService,
    private socketService: SocketService,
  ) { }

  async ngOnInit(): Promise<void> {
    const { language } = await this.storage.getStorage('oUser');
    console.log(language);
    this.language = language;
  }
  
  ngAfterViewInit(): void {
    this.getData();
    this.getServices();
  }

  getServices() {
    this.services$ = this.store.select('serviceAccepted')
    .pipe(
      filter(row => !row.loading), 
      map((res: any) => res.items)
    )
  }

  getData(): void {
    this.items$ = this.socketService.onFetchService()
    .pipe(
      map((res: any) => {
        if (res && res.length) {
          return res.filter((row: any) => row.status === 'accepted');
        } else if (res.status === 'accepted') {
          return res;
        }
      })
    );
  }

  async openServiceModal(res: any): Promise<void> {
    await this.uService.modal({
      mode: 'ios',
      breakpoints: [0, .65, 1],
      initialBreakpoint: 1,
      component: WaitingComponent,
      componentProps: { res }
    });
  };

  openChat(code: any): void {
    this.uService.navigate(`/chat/service/${code}`);
  };
}
