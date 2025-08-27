import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { LanguageService } from './lang.service';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  constructor(
    private http: HttpClient,
    private LanguageService: LanguageService
  ) {}

  getInfoLinks(): Observable<any> {
    return this.LanguageService.lang$.pipe(
      switchMap((lang) =>
        this.http.get<any>(`assets/data/info-data/info-${lang}.json`)
      )
    );
  }
}
