import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { NgxStripeModule } from 'ngx-stripe';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';

export function playerFactory() { return player; }
const config: SocketIoConfig = { url: environment.api.url, options: {} };

@NgModule({
  imports:[
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    SocketIoModule.forRoot(config),
    LottieModule.forRoot({ player: playerFactory }),
    NgxStripeModule.forRoot(environment.apiKeyStripe),
    AgmCoreModule.forRoot({ apiKey: environment.maps, libraries: ['places'] }),
  ]
})
export class MekaSdkModule {}
