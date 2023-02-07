import { Component, AfterViewInit, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, zip } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { AppState } from '@store/app.state';
import { MasterService } from '@core/services/master.service';
import { SolicitudModel } from '@core/model/solicitud.interfaces';
import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';
import { UtilsService } from '@core/services/utils.service';


@Component({
  selector: 'app-solicitud-modal',
  templateUrl: './solicitud-modal.component.html',
  styleUrls: ['./solicitud-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolicitudModalComponent implements OnInit {

  services$: Observable<any[]>;
  items: any = [];

  constructor(
    private store: Store<AppState>,
    private uService: UtilsService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  async openService(res: any): Promise<void> {
    this.onClose();
    await this.uService.modal({
      mode: 'ios',
      componentProps: { res },
      initialBreakpoint: 1,
      breakpoints: [0, .65, 1],
      component: WaitingComponent,
    });
  };


  getData = () => {
    this.services$ = this.store.select('serviceActive').pipe(
      filter(row => !row.loading),
      map((res: any) => res.items),
    );
  }

  onClose = () => this.uService.modalDimiss();

  identify = (index: number, item: any) => item[index];
}
