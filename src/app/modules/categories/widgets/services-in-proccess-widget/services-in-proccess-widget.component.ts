import { Component, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AppState } from '@store/app.state';
import { UtilsService } from '@core/services/utils.service';
import { ConnectService } from '@modules/chat/services/connect.service';
import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';
import { SocketService } from '@core/services/socket.service';

@Component({
  selector: 'app-services-in-proccess-widget',
  templateUrl: './services-in-proccess-widget.component.html',
  styleUrls: ['./services-in-proccess-widget.component.scss'],
})

export class ServicesInProccessWidgetComponent implements AfterViewInit {
  unread: any;
  company: string;
  offline: boolean;
  companyId = 0;
  items$: Observable<[] | any>;

  constructor(
    private store: Store<AppState>,
    private uService: UtilsService,
    private chatService: ConnectService,
    private socketService: SocketService,
  ) { }

  ngAfterViewInit(): void {
    this.getData();
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
    this.items$.subscribe(res => console.log(res));
    // this.items$ = this.store.select('serviceAccepted').pipe(
    //   filter((row) => !row.loading),
    //   map(({ items }) => items)
    // );
  }
  // getServiceAcceptedWithChat = () => {
  //   this.items$ = this.store.select('accepted')
  //   .pipe(
  //     filter(row => !row.loading),
  //     map((res: any) => res.accepted),
  //     map((res: any) => {
  //       const data = this.chatService.unReadMessageServiceChat(this.code, res).slice(0,3);
  //       return data;
  //     })
  //   );
  // }

  async openServiceModal(res: any): Promise<void> {
    await this.uService.modal({
      mode: 'ios',
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      component: WaitingComponent,
      componentProps: { res }
    });
  };

  openChat(code: any): void {
    this.uService.navigate(`/chat/room/${code}`);
  };
}
