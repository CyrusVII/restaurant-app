import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { HomeService } from '../../services/home.service';
import { HomeData } from '../../services/model/model';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';



@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule,
    ScrollAnimateDirective
  ] 
})
export class HomeComponent implements OnInit {
  homeData: HomeData[] = [];

  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.homeService.getHomeLinks().subscribe((response) => {
      this.homeData = response.sections; 
    }, (error) => {
      console.error('Error fetching home data:', error);
    });
  }
}

