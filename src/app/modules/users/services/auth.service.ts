import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ReducerManager } from '@ngrx/store';

import { Login } from './interfaces';
import { MasterService } from '@core/services/master.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private ms: MasterService,
    private navCtrl: NavController,
    private storage: StorageService,
    private reducers: ReducerManager,
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
    this.reducers.removeReducers([
      'user', 'closed', 'status',
      'expert', 'stripe', 'company',
      'history', 'customer', 'position',
      'solicitud', 'serviceActive', 'serviceAccepted',
      'serviceFinished', 'serviceInProcess', 'score',
    ]);
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
