import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';
import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  items$: Observable<any[]>;

  constructor(
    private db: DbCategoriesService,
    private modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
    this.items$ = this.db.getServices().pipe( map((res: any) => res.search) );
  }

  doRefresh(ev: any) {
    timer(2000).subscribe(() => {
      this.items$ = this.db.getServices().pipe( map((res: any) => res.search) );
      ev.target.complete();
    });
  }

  onModal = async (res: any) => {
    const modal = await this.modalCtrl.create({
      component: WaitingComponent,
      componentProps: { res }
    });
    await modal.present();
  };
}
