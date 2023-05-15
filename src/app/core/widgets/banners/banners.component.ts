import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Observable } from 'rxjs';
import { delay, filter, map, tap } from 'rxjs/operators';
import { UtilsService } from '@core/services/utils.service';
import { ProfileComponent } from './profile/profile.component';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';

@Component({
  selector: 'app-widget-banner',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
})
export class BannersWidgetComponent implements OnInit, AfterViewInit {
  loading: boolean = true;
  options = {
    speed: 600,
    freeMode: true,
    autoplay: true,
    spaceBetween: 30,
  };

  banners$!: Observable<any>;

  constructor(
    private store: Store<AppState>,
    private uService: UtilsService,
  ) { }

    ngOnInit() {
      this.getData();
    }

  ngAfterViewInit() {
    this.getData();
  }

  getData(): void {
    this.banners$ = this.store.select('banner')
    .pipe(
      delay(500),
      filter(({ loading }) => !loading),
      tap(({ loading }) => this.loading = loading),
      map(({ items }) => items)
    );
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

  isInternal(url: string) {
    return url.includes('http') ? false : true;
  }

  async openUrl(url: string): Promise<void> {
    await Browser.open({ url });
  }
}
