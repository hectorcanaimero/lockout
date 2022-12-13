import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-get-profile',
  templateUrl: './get-profile.page.html',
  styleUrls: ['./get-profile.page.scss'],
})
export class GetProfilePage implements OnInit {

  user: any = [];
  countries: any = [];
  segment = 'editar';

  constructor(
    private navCtrl: NavController,
    private storage: StorageService,
  ) { }

  async ngOnInit() {
    this.user = await this.storage.getStorage('oUser');
  }

  segmentChanged = (ev: any) => {
    this.segment = ev.detail.value;
  };

  onBack = () => this.navCtrl.navigateRoot('');
}
