import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { LanguageService } from './lang.service';

@Injectable({
  providedIn: 'root',
})
export class NavFooterService {
  constructor(
    private http: HttpClient,
    private LanguageService: LanguageService
  ) {}

  getNavbarLinks(): Observable<any> {
    return this.LanguageService.lang$.pipe(
      switchMap((lang) =>
        this.http.get<any>(`assets/data/site-data/site-data-${lang}.json`)
      )
    );
  }
}
