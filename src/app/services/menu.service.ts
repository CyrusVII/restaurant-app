import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuData } from './model/model';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuUrl = 'data/menu-data/menu-ita.json';

  constructor(private http: HttpClient) {}

  getMenu(): Observable<MenuData> {
    return this.http.get<MenuData>(this.menuUrl);
  }
}

