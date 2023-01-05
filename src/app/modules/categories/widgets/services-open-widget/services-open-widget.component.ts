import { Component, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';
import { SocketService } from '@core/services/socket.service';

@Component({
  selector: 'app-services-open-widget',
  templateUrl: './services-open-widget.component.html',
  styleUrls: ['./services-open-widget.component.scss'],
})

export class ServicesOpenWidgetComponent implements AfterViewInit {

  service$: Observable<any>;
  options = { freeMode: true, spaceBetween: 10, slidesPerView: 2.1,  };
  items$: Observable<any>;
  loading = true;
  company: number;

  constructor(
    private modalCtrl: ModalController,
    private socketService: SocketService,
    ) { }

    ngAfterViewInit(): void {
    this.service$ = this.getFetchService();
    this.service$.subscribe(res => console.log(res));
  }

  getFetchService() {
    return this.socketService.onFetchService().pipe(
      map((res: any) => {
        console.log(res);
        if (res && res.length) {
          return res.filter((row: any) => row.status === 'in_process');
        } else if (res.status === 'in_process') {
          return res;
        }
      })
    );
  }

  openModal = async (res: any, company: number) => {
    const modal = await this.modalCtrl.create({
      component: WaitingComponent,
      componentProps: { res, company },
      mode: 'ios',
      initialBreakpoint: 1,
      breakpoints: [0, 1]
    });
    await modal.present();
  };
}
