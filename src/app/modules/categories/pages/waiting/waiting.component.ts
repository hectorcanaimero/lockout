import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, timer } from 'rxjs';
import { filter, map, } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
import { RatingModalComponent } from '@modules/rate/pages/rating-modal/rating-modal.component';

import { UtilsService } from '@core/services/utils.service';
import { ChatFireService } from '@core/services/chat-fire.service';
import { SocketService } from '@core/services/socket.service';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss'],
})
export class WaitingComponent implements OnInit {

  @Input() res: any;
  @Input() company: number;
  room$: Observable<any>;
  total$: Observable<number>;
  offline: boolean;
  openImage = false;
  slideOpts = {
    freeMode: true,
    spaceBetween: 10,
    slidesPerView: 2.3,
    allowTouchMove: true,
  };

  constructor(
    private uService: UtilsService,
    private store: Store<AppState>,
    private translate: TranslateService,
    private socketService: SocketService,
    private chatFireService: ChatFireService,
    ) { }
  ngOnInit(): void {
    // timer(500).subscribe(() => this.unreadMessage(this.res._id));
  }

  unreadMessage(service: string) {
    this.total$ = this.chatFireService.unReadMessages(0, service);
  }


  async onCancel(): Promise<void> {
    await this.uService.alert({
      header: 'INFO',
      message: this.translate.instant('MESSAGES.CANCEL_SERVICE'),
      buttons: [
        { text: this.translate.instant('ALERT.CANCEL'), role: 'cancel', cssClass: 'secondary', handler: () => {} },
        { text: 'Ok', handler: () => console.log('Confirm Okay') }
      ]
    });
  };

  async onAceptService (item: any): Promise<void> {
    item.status = 'accepted';
    await this.uService.load({ duration: 750, message: 'Proccesing...', });
    await this.chatFireService.createRoom(item);
    this.socketService.changeStatus(item);
    this.loadServiceInStore(item.company._id);
    this.uService.modalDimiss();
    this.uService.navigate('/pages/home');
  };

  async onCancelService (item: any): Promise<void>{
    item.status = 'open';
    delete item.company;
    await this.uService.alert({
      header: 'Info', message: this.translate.instant('MESSAGES.CANCEL_SERVICE'),
      buttons: [
        { text: this.translate.instant('ALERT.CANCEL'), role: 'cancel', handler: () => {} },
        {
          text: 'OK', handler: async() => {
            await this.uService.load({ message: 'Processing...', duration: 750, });
            this.socketService.changeStatus(item);
            this.loadServiceInStore(item.company._id);
          }
        }
      ],
    });
    this.uService.modalDimiss();
    this.uService.navigate('/pages/home');
  };

  async onFinishedService (item: any): Promise<void>{
    console.log(item);
    await this.uService.alert({
      header: 'Info',
      message: this.translate.instant('MESSAGES.CLOSED_SERVICE'),
      buttons: [
        { text: this.translate.instant('ALERT.CANCEL'), role: 'cancel' },
        {
          text: 'OK',
          handler: async() => {
            await this.uService.load({ message: this.translate.instant('PROCCESSING'), duration: 1500,  });
            timer(500).subscribe(async () => {
              await this.uService.modal({
                mode: 'ios',
                initialBreakpoint: .85,
                breakpoints: [0, .85,1],
                componentProps: { item },
                component: RatingModalComponent,
              });
            });
          }
        }
      ]
    });
    this.uService.modalDimiss();
    this.uService.navigate('/pages/home');
  };

  toogle (): void {
    this.openImage = !this.openImage;
  }

  onClose(): void {
    this.uService.modalDimiss();
  }

  goToChat(id: string) {
    this.uService.modalDimiss();
    this.uService.navigate(`/chat/service/${id}`)
  }

  private loadServiceInStore(id: string) {
    timer(300).subscribe(() => {
      console.log(id);
      this.store.dispatch(actions.inProcessInit({ id }));
      this.store.dispatch(actions.acceptedInit({ id }));
      this.store.dispatch(actions.load({ company: id }));
    });
  }
}
