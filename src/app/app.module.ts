import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { appRoute } from './app.routes';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { MekaSdkModule } from '@core/meka-sdk.module';
import { StoreConfigModule } from '@store/store.module';
import { CoreConfigModule } from '@core/core-config.module';
import { LanguageModule } from '@core/language/language.module';
import { CommonModule } from '@angular/common';
import { NetworkWidgetModule } from '@core/widgets/network/network.module';
import { AppService } from './app.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    appRoute,
    CoreModule,
    CommonModule,
    BrowserModule,
    MekaSdkModule,
    LanguageModule,
    CoreConfigModule,
    StoreConfigModule,
    NetworkWidgetModule,
    IonicModule.forRoot({ hardwareBackButton: false }),
  ],
  providers: [
    AppService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
