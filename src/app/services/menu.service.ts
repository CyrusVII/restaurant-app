import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { MenuData } from './model/model';
import { LanguageService } from './lang.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuUrl = 'data/menu-data/menu-ita.json';

  constructor(
    private http: HttpClient,
    private LanguageService: LanguageService
  ) {}

  getMenu(): Observable<MenuData> {
    return this.LanguageService.lang$.pipe(
      switchMap((lang) =>
        this.http.get<any>(`assets/data/menu-data/menu-${lang}.json`)
      )
    );
  }
}
