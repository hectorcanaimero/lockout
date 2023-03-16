import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs/src/entries/main';


if (environment.production) {
  enableProdMode();
  datadogRum.init({
    applicationId: environment.datadog.applicationId,
    clientToken: environment.datadog.clientToken,
    site: environment.datadog.site,
    service: environment.datadog.service,
    env:'environments.prod',
    // Specify a version number to identify the deployed version of your application in Datadog 
    // version: '1.0.0',
    sessionSampleRate: 100,
    premiumSampleRate: 100,
    trackUserInteractions: true,
    defaultPrivacyLevel:'mask-user-input',
  });
  datadogRum.startSessionReplayRecording();
  datadogLogs.init({
    clientToken: environment.datadog.clientToken,
    site: environment.datadog.site,
    service: environment.datadog.service,
    forwardErrorsToLogs: true,
    sampleRate: 100,
  });
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));



    