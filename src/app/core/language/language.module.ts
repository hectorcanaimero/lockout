import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';

import { TraslationService } from './traslation.service';

export const loaderTranslate = (httpClient: HttpClient) => new TranslateHttpLoader(httpClient);

@NgModule({
  declarations: [],
  imports: [
    TranslateModule.forRoot({
      loader: {
        deps: [HttpClient],
        provide: TranslateLoader,
        useFactory: loaderTranslate,
      }
    })
  ],
  providers: [TraslationService],
})
export class LanguageModule { }
