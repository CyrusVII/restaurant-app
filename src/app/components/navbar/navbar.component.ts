import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavbarLink } from '../../services/model/model';
import { NavFooterService } from '../../services/navFooter.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {
  navbarLinks: NavbarLink[] = [];

  constructor(private navFooterService: NavFooterService) {
  }

  ngOnInit(): void {
    this.navFooterService.getNavbarLinks().subscribe((response) => {
      this.navbarLinks = response.navbar;
    });
  }

}


