import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarLink, LangOption } from '../../services/model/model';
import { NavFooterService } from '../../services/navFooter.service';
import { LanguageService } from '../../services/lang.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  navbarLinks: NavbarLink[] = [];
  langs: LangOption[] = [];
  currentLang: string = '';
  isDropdownOpen: boolean = false;

  constructor(
    private navFooterService: NavFooterService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    // Carico i link della navbar e le lingue disponibili
    this.navFooterService.getNavbarLinks().subscribe((response) => {
      this.navbarLinks = response.navbar;
      this.langs = response.lang;
    });

    // Ottengo la lingua corrente
    this.currentLang = this.languageService.getLanguage();
  }

  switchLang(lang: string) {
    this.languageService.setLanguage(lang);
    this.currentLang = lang;
    this.isDropdownOpen = false; // Chiudo il dropdown dopo la selezione
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  getCurrentFlag(): string {
    return this.getFlagFromCode(this.currentLang);
  }

  getFlagFromCode(langCode: string): string {
    // Mappa codici lingua a codici paese per le bandiere
    const langToCountry: { [key: string]: string } = {
      it: 'it',
      en: 'gb',
      fr: 'fr',
      de: 'de',
      es: 'es',
      pt: 'pt',
      ru: 'ru',
      zh: 'cn',
      ja: 'jp',
      ko: 'kr',
    };

    const countryCode = langToCountry[langCode] || langCode;

    // Usando FlagCDN
    return `https://flagcdn.com/w40/${countryCode}.png`;

    // Alternativa con CountryFlags.io:
    // return `https://countryflags.io/${countryCode}/flat/64.png`;
  }

  getCurrentLangName(): string {
    const currentLangObj = this.langs.find(
      (lang) => lang.code === this.currentLang
    );
    return currentLangObj?.name || '';
  }

  // Chiudo il dropdown se clicco fuori
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-switcher')) {
      this.isDropdownOpen = false;
    }
  }
}
