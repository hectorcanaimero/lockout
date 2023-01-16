import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { NotificationsComponent } from '@core/widgets/notifications/notifications.component';
import { SolicitudModalComponent } from '@core/widgets/solicitud-modal/solicitud-modal.component';
import { Observable } from 'rxjs';
import { AppState } from '@store/app.state';
import { Store } from '@ngrx/store';
import { map, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {

  @Input() title: any;
  @Input() link: string;
  @Input() position = 'end';
  @Input() services = [];
  content = 0;

  count: number = 0;

  constructor(
    private nav: NavController,
    private store: Store<AppState>,
    private modalCtrl: ModalController,
  ) { }

  ngAfterViewInit(){
    this.getData();
  }

  getData = (): void => {
    const openedCount$ =  this.store.select('serviceInProcess').pipe(
      filter(row => !row.loading ), map(({ items }: any) => items) );
    const acceptedCount$ =  this.store.select('serviceAccepted').pipe(
      filter(row => !row.loading ), map(({ items }: any) => items) );
    openedCount$.subscribe(res => this.count = res ? res.length : 0);
    acceptedCount$.subscribe(res => {
      const a = res ? res.length : 0;
      this.count = this.count + a;
    });
    console.log('COUNT ', this.count);
  };


  onNotification = async () => {
    const modal = await this.modalCtrl.create({ component: NotificationsComponent });
    await modal.present();
  };

  onSolicitud = async () => {
    const modal = await this.modalCtrl.create({
      mode: 'ios',
      initialBreakpoint: .85,
      breakpoints: [0, .85, 1],
      component: SolicitudModalComponent });
    await modal.present();
  };

  onMenu = (item: string) => this.nav.navigateRoot(item);
}
