import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '@core/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class TraslationService {

  constructor(
    private storage: StorageService,
    private translate: TranslateService,
  ) {
    translate.addLangs(['en', 'es', 'pt']);
    this.definedLang();
  }

  async definedLang() {
    const user = await this.storage.getStorage('oUser');
    if (user) {
      this.translate.use(user.language);
    }
  }

  use = (lang: string) => this.translate.use(lang);
  getDefaultLang = () => this.translate.getDefaultLang();
}
