import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getHomeLinks(): Observable<any> {
    return this.http.get<any>('data/home-content.json');
  }
}
