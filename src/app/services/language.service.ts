import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translate: TranslateService) { }

  setDefaultLang() {
    this.translate.addLangs(['zh', 'en']);

    this.translate.setDefaultLang('zh');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|zh/) ?  browserLang : 'zh')
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }
}
