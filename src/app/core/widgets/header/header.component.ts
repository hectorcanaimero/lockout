import { Component, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { SolicitudModalComponent } from '@core/widgets/solicitud-modal/solicitud-modal.component';
import { Observable } from 'rxjs';
import { AppState } from '@store/app.state';
import { Store } from '@ngrx/store';
import { map, filter } from 'rxjs/operators';
import { UtilsService } from '@core/services/utils.service';
import { ConnectionStatus, Network } from '@capacitor/network';
import { StatusBar, Style } from '@capacitor/status-bar';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit, AfterContentInit {
  @Input() title: any;
  @Input() link: string;
  @Input() position = 'end';
  @Input() services = [];

  total: number = 0;
  count: number = 0;
  content: number = 0;
  total$: Observable<any[]>;
  statusNetwork: boolean = true;

  constructor(
    private store: Store<AppState>,
    private uService: UtilsService,
  ) {}

  async ngAfterContentInit(): Promise<any> {
    const status: ConnectionStatus  = await Network.getStatus();
    if (!status.connected) {
      this.statusNetwork = false;
      await StatusBar.setBackgroundColor({ color: '#eb445a' });
    }
  }

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
