import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NavFooterService {
  constructor(private http: HttpClient) {}

  getNavbarLinks(): Observable<any> {
    return this.http.get<any>('data/site-data.json');
  }
}