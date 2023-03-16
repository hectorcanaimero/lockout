import { Component, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
import { UtilsService } from '@core/services/utils.service';
import { MasterService } from '@core/services/master.service';
import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
})

export class ServicesListComponent implements AfterViewInit, OnChanges {

  @Input() type = 'accepted';
  offline: boolean;
  items$: Observable<any[]>;

  options: AnimationOptions = {
    path: './assets/lotties/not-found.json',
  };

  constructor(
    private ms: MasterService,
    private store: Store<AppState>,
    private uService: UtilsService,
  ) { }

  ngAfterViewInit() {
    this.getServices(this.type);
    this.getStatusOffOnLine();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getServices(changes.type.currentValue);
  }

  animationCreated(animationItem: AnimationItem): void { }

  getServices = (type: any) => {
    this.store.select('company')
    .pipe(
      filter(row => !row.loading),
      map((res: any) => res.company)
    )
    .subscribe((res: any) => {
      if (type === 'in_process') {
        this.items$ = this.ms.getMaster(`services/${res._id}/status/in_process`);
      } else {
        this.items$ = this.ms.getMaster(`services/${res._id}/status/accepted`);
      }
    })
  }

  async openService (res: any): Promise<void> {
    await this.uService.modal({
      component: WaitingComponent,
      componentProps: { res }
    });
  };

  async cancelService (item: any): Promise<void> {
    await this.uService.alert({
      header: 'Info',
      message: 'Do you want to cancel the service?',
      mode: 'ios',
      buttons: [
        { text: 'Cancel', role: 'cancel', cssClass: 'secondary' },
        {
          text: 'OK', handler: async() => {
            await this.uService.load({message: 'Procesando...', duration: 1000});
            this.ms.patchMaster(`services/company/${item._id}`, { status: 'cancelled' })
            .subscribe((res: any) => {
              this.store.dispatch(actions.acceptedInit({ id: item._id }));
              this.store.dispatch(actions.inProcessInit({ id: item._id }));
            })
            this.uService.navigate('/pages/home');
          }
        }
      ]
    });
  };

  async finishService (item: any): Promise<void> {
    await this.uService.alert({
      mode: 'ios',
      header: 'Info',
      message: 'Do you finish to the service?',
      buttons: [
        { text: 'Cancel', role: 'cancel', cssClass: 'secondary' },
        { text: 'Finish', handler: async() => {
          await this.uService.load({message: 'Procesando...', duration: 1000});
          this.ms.patchMaster(`services/company/${item._id}`, { status: 'finished' })
          .subscribe((res: any) => {
            this.store.dispatch(actions.acceptedInit({ id: item._id }));
            this.store.dispatch(actions.inProcessInit({ id: item._id }));
          })
          this.uService.navigate('/pages/home');
        } }
      ]
    });
  };

  async acceptedService (item: any): Promise<void> {
    await this.uService.load({message: 'Procesando...', duration: 1500});
    this.ms.patchMaster(`services/company/${item._id}`, { status: 'accepted' })
    .subscribe((res: any) => {
      console.log(res);
      this.store.dispatch(actions.acceptedInit({ id: item._id }));
      this.store.dispatch(actions.inProcessInit({ id: item._id }));
    })
    this.uService.navigate('/pages/home');
  };

  chat(item: any) {
    this.uService.navigate(`/chat/service/${item}`);
  }

  identify(index: number, item: any) {
    return item[index];
  };

  getStatusOffOnLine() {
    this.store.select('company')
    .pipe(filter(row => !row.loading), map((res: any) => res.company))
    .subscribe((res: any) => {
      this.offline = res.status;
    });
  }
}
