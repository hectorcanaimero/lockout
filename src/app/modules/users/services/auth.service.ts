import { Injectable } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { take, map } from 'rxjs/operators';
import { Observable, timer } from 'rxjs';
import { Store } from '@ngrx/store';

import { Login } from './interfaces';
import { AppState } from '@store/app.state';
import { MasterService } from '@core/services/master.service';
import { StorageService } from 'src/app/core/services/storage.service';

import * as actions from '@store/actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private ms: MasterService,
    private store: Store<AppState>,
    private navCtrl: NavController,
    private storage: StorageService,
    private alertCtrl: AlertController,
    private loadCtrl: LoadingController,
  ) { }

  //TODO: Autoriza el accesso
  signIn(data: Login): Observable<any> {
    return this.ms.postMaster('users/login-company', data);
  }

  // TODO: Crea un usuario
  signUp(data: any): Observable<Promise<boolean>> {
    return this.ms.postMaster( 'users', data).pipe(
      map(async (res: any): Promise<boolean> => {
        console.log(res);
        await this.storage.setStorage('oProfile', res);
        return this.navCtrl.navigateRoot('/user/signIn');
      })
    );
  }

  // TODO: Desloga la app
  async signOut(): Promise<boolean> {
    await this.storage.clearStorages();
    return this.navCtrl.navigateRoot('/user/signIn');
  };

  getCountries = () => this.ms.getMaster('/tables/countries');

  changePassword(data: any): Observable<any> {
    return this.ms.postMaster('auth/change-password', data);
  }

  forgotSenha(data: any): Observable<any> {
    return this.ms.postMaster('auth/forgot-password', data);
  }
}
