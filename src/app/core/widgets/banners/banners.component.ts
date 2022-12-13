import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Browser } from '@capacitor/browser';

import { UtilsService } from '@core/services/utils.service';
import { MasterService } from '@core/services/master.service';
import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'app-widget-banner',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
})
export class BannersWidgetComponent implements OnInit {

  options = {
    speed: 600,
    autoplay: true,
    loop: true,
  };

  banners$!: Observable<any>;

  constructor(
    private ms: MasterService,
    private uService: UtilsService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData(): Promise<void> {
    const geo: Position = await Geolocation.getCurrentPosition();
    if (geo) {
      const { coords } = geo;
      const data = {
        latitude: coords.latitude,
        longitude: coords.longitude
      }
      this.banners$ = this.ms.postMaster('banners/company', data);
    }
  }

  async openProfile(uid: string): Promise<void> {
    await this.uService.modal({
      mode: 'ios',
      initialBreakpoint: .95,
      breakpoints: [0, .7, 1],
      componentProps: { uid },
      component: ProfileComponent,
    });
  }

  async openUrl(url: string): Promise<void> {
    await Browser.open({ url });
  }
}
