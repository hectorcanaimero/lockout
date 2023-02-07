import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AppState } from '@store/app.state';
import { UtilsService } from '@core/services/utils.service';
import { SocketService } from '@core/services/socket.service';
import { ChatFireService } from '@core/services/chat-fire.service';
import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';

@Component({
  selector: 'app-services-in-proccess-widget',
  templateUrl: './services-in-proccess-widget.component.html',
  styleUrls: ['./services-in-proccess-widget.component.scss'],
})

export class ServicesInProccessWidgetComponent implements OnInit, AfterViewInit {
  unread: any;
  company: string;
  offline: boolean;
  companyId = 0;
  items$: Observable<[] | any>;
  services$: Observable<any>;
  total$: Observable<number>;
  ids: any = [];


  constructor(
    private store: Store<AppState>,
    private uService: UtilsService,
    private chatFire: ChatFireService,
    private socketService: SocketService,
  ) { }

  ngOnInit(): void {
    this.getServices();
  }

  ngAfterViewInit(): void {
    this.getData();
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
