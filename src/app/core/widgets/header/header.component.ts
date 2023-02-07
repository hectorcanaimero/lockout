import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { NotificationsComponent } from '@core/widgets/notifications/notifications.component';
import { SolicitudModalComponent } from '@core/widgets/solicitud-modal/solicitud-modal.component';
import { Observable } from 'rxjs';
import { AppState } from '@store/app.state';
import { Store } from '@ngrx/store';
import { map, filter, switchMap, tap } from 'rxjs/operators';
import { UtilsService } from '@core/services/utils.service';

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

  total = 0;
  total$: Observable<any[]>;

  count: number = 0;

  constructor(
    private store: Store<AppState>,
    private uService: UtilsService,
  ) { }

  ngAfterViewInit(){
    this.getData();
  }

  getData = (): void => {
    this.total$ = this.store.select('serviceActive')
    .pipe(
      filter(row => !row.loading),
      map((res: any) => res.total)    
    );
  };


  async onViewServicesActive(): Promise<void> {
    await this.uService.modal({
      mode: 'ios',
      initialBreakpoint: .95,
      breakpoints: [0, .65, 1],
      component: SolicitudModalComponent
    });
  };

  onMenu = (item: string) => this.uService.navigate(item);
}
