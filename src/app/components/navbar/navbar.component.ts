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

  constructor(
    private navFooterService: NavFooterService,
    private LanguageService: LanguageService
  ) {}

  ngOnInit(): void {
    // carico i link della navbar e le lingue disponibili
    this.navFooterService.getNavbarLinks().subscribe((response) => {
      this.navbarLinks = response.navbar;
      this.langs = response.lang;
    });
  }

  switchLang(lang: string) {
    this.LanguageService.setLanguage(lang);
    this.currentLang = lang;
  }
}
