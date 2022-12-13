import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MomentModule } from 'ngx-moment';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import ApiInterceptor from '@core/services/http.interceptor';
import { NotificationsComponent } from '@core/widgets/notifications/notifications.component';
import { SolicitudModalComponent } from '@core/widgets/solicitud-modal/solicitud-modal.component';

@NgModule({
  exports: [NotificationsComponent, SolicitudModalComponent],
  declarations: [NotificationsComponent, SolicitudModalComponent],
  entryComponents: [NotificationsComponent, SolicitudModalComponent],
  imports: [
    IonicModule,
    CommonModule,
    MomentModule,
    TranslateModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
})
export class CoreModule {
  constructor(library: FaIconLibrary) {  library.addIconPacks(fas, fab, far); 	}
}
