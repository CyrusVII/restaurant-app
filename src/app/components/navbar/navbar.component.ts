import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarLink, LangOption, HeaderData } from '../../services/model/model';
import { NavFooterService } from '../../services/navFooter.service';
import { LanguageService } from '../../services/lang.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  navbarLinks: NavbarLink[] = [];
  HeaderData!: HeaderData;
  langs: LangOption[] = [];
  currentLang: string = '';

  // Dropdown states separati
  isHeaderDropdownOpen: boolean = false;
  isStickyDropdownOpen: boolean = false;

  // Slider background
  currentBgIndex = 0;
  bgIntervalId: any;

  // Sticky navigation
  isNavSticky: boolean = false;
  headerHeight: number = 0;

  constructor(
    private navFooterService: NavFooterService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.navFooterService.getNavbarLinks().subscribe((response) => {
      this.navbarLinks = response.navbar;
      this.HeaderData = response.header;
      this.langs = response.lang;

      // Avvia lo slider solo se ci sono immagini
      if (
        this.HeaderData.backGroundImg &&
        this.HeaderData.backGroundImg.length > 1
      ) {
        this.startBgSlider();
      }
    });

    this.currentLang = this.languageService.getLanguage();

    // Calcola l'altezza dell'header dopo che la vista è stata inizializzata
    setTimeout(() => {
      this.calculateHeaderHeight();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.bgIntervalId) {
      clearInterval(this.bgIntervalId);
    }
  }

  calculateHeaderHeight(): void {
    const headerElement = document.querySelector('header');
    if (headerElement) {
      this.headerHeight = headerElement.offsetHeight;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Attiva sticky quando si scrolla oltre l'80% dell'header
    this.isNavSticky = scrollTop > this.headerHeight * 0.8;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    // Ricalcola l'altezza dell'header in caso di resize
    this.calculateHeaderHeight();
  }

  startBgSlider(): void {
    this.bgIntervalId = setInterval(() => {
      if (
        this.HeaderData.backGroundImg &&
        this.HeaderData.backGroundImg.length > 0
      ) {
        this.currentBgIndex =
          (this.currentBgIndex + 1) % this.HeaderData.backGroundImg.length;
      }
    }, 4000);
  }

  switchLang(lang: string): void {
    this.languageService.setLanguage(lang);
    this.currentLang = lang;
    this.closeAllDropdowns();
  }

  // Header dropdown methods
  toggleHeaderDropdown(): void {
    this.isHeaderDropdownOpen = !this.isHeaderDropdownOpen;
    this.isStickyDropdownOpen = false; // Chiudi l'altro dropdown
  }

  // Sticky dropdown methods
  toggleStickyDropdown(): void {
    this.isStickyDropdownOpen = !this.isStickyDropdownOpen;
    this.isHeaderDropdownOpen = false; // Chiudi l'altro dropdown
  }

  closeAllDropdowns(): void {
    this.isHeaderDropdownOpen = false;
    this.isStickyDropdownOpen = false;
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
  }

  getCurrentLangName(): string {
    const currentLangObj = this.langs.find(
      (lang) => lang.code === this.currentLang
    );
    return currentLangObj?.name || '';
  }

  // HostListener per chiudere i dropdown quando si clicca fuori
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-switcher')) {
      this.closeAllDropdowns();
    }
  }

  // Gestione dei tasti per accessibilità
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    this.closeAllDropdowns();
  }
}
