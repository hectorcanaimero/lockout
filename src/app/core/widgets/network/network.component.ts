import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ConnectionStatus, Network } from '@capacitor/network';
import { PluginListenerHandle } from '@capacitor/core';
import { StorageService } from '@core/services/storage.service';

@Component({
  selector: 'app-network-widget',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss'],
})

export class NetworkWidgetComponent implements OnInit, OnDestroy {
  @ViewChild(IonModal) modal: IonModal;
  networkStatus: ConnectionStatus;
  networkListener: PluginListenerHandle;
  language: DataNetwork = {
    lang: 'en',
    title: 'Something is wrong!',
    text1: 'Sorry, there seems to be no internet connection available at the moment.',
    text2: 'Please check your Internet connection and try again later.'
  };

  constructor(
    public storage: StorageService,

  ) {}


  async ngOnInit(): Promise<void> {
    this.networkListener = Network.addListener('networkStatusChange', async (status) => {
      await this.getLanguage();
      console.log(status);
      this.networkStatus = status;
    });
    this.networkStatus = await Network.getStatus();
  }
  ngOnDestroy(): void {
    this.networkListener.remove();
  }

  async getLanguage(): Promise<void> {
    const user = await this.storage.getStorage('oUser');
    if (user) {

    } else {
      this.data('en');
    }
  };

  data(lang: string = 'en') {
    return data.filter((row: any) => row.lang === lang)[0];
  }
}

export const data: DataNetwork[] = [
  {
    lang: 'es',
    title: 'Algo esta mal!',
    text1: 'Lo siento, parece que no hay conexión a Internet disponible en este momento.',
    text2: 'Por favor, verifica tu conexión a Internet e inténtalo de nuevo más tarde.'
  },
  {
    lang: 'pt',
    title: 'Algo esta mal!',
    text1: 'Lo siento, parece que no hay conexión a Internet disponible en este momento.',
    text2: 'Por favor, verifica tu conexión a Internet e inténtalo de nuevo más tarde.'
  },
  {
    lang: 'en',
    title: 'Algo esta mal!',
    text1: 'Lo siento, parece que no hay conexión a Internet disponible en este momento.',
    text2: 'Por favor, verifica tu conexión a Internet e inténtalo de nuevo más tarde.'
  }
];

export interface DataNetwork {
  lang: string;
  title: string;
  text1: string;
  text2: string;
}
