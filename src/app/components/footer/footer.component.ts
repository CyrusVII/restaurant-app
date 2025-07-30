import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [CommonModule],
})
export class FooterComponent implements OnInit {
  footerData: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('data/site-data.json').subscribe(data => {
      this.footerData = data.footer;
    });
  }
}

