import { Component, OnInit } from '@angular/core';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  title = 'pi-plugin';
  constructor(private lang: LanguageService) {}


  ngOnInit(): void {
    this.lang.setDefaultLang();
  }

}
