import { Injectable } from '@angular/core';
import { NavController, AlertController, ModalController, LoadingController,
  AlertOptions, ModalOptions, LoadingOptions, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({   providedIn: 'root' })
export class UtilsService {

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadCtrl: LoadingController,
  ) {}

  navigate(url) {
    return this.navCtrl.navigateRoot(url);
  }

  alert = async (opts: AlertOptions): Promise<void> => {
    const item: HTMLIonAlertElement = await this.alertCtrl.create(opts);
    item.present();
  };

  modal = async (opts: ModalOptions): Promise<void> => {
    const item: HTMLIonModalElement = await this.modalCtrl.create(opts);
    item.present();
  };

  modalDimiss = () => this.modalCtrl.dismiss();

  load = async (opts: LoadingOptions): Promise<void> => {
    const item: HTMLIonLoadingElement = await this.loadCtrl.create(opts);
    item.present();
  };

  loadDimiss = () => this.loadCtrl.dismiss();

  toast = async (opts: ToastOptions): Promise<void> => {
    const item: HTMLIonToastElement = await this.toastCtrl.create(opts);
    item.present();
  };

  toastDimiss = () => this.toastCtrl.dismiss();

}
