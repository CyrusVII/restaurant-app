import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgClass } from '@angular/common';

interface Section {
  id?: string;
  title: string;
  paragraphs: string[];
  image: {
    src: string;
    alt: string;
    overlayTitle: string;
    overlayText: string;
  };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule,
    NgClass
  ] 
})
export class HomeComponent implements OnInit {
  hero: any;
  sections: Section[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('data/home-content.json').subscribe(data => {
      this.hero = data.hero;
      this.sections = data.sections;
    });
  }
}

