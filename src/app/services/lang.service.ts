import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLang = new BehaviorSubject<string>(
    localStorage.getItem('lang') || 'it'
  ); // default
  lang$ = this.currentLang.asObservable();

  setLanguage(lang: string) {
    this.currentLang.next(lang);
    localStorage.setItem('lang', lang);
  }

  getLanguage(): string {
    return localStorage.getItem('lang') || this.currentLang.value;
  }

  // getter per template
  get current(): string {
    return this.getLanguage();
  }
}
