import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterData } from '../../services/model/model';
import { NavFooterService } from '../../services/navFooter.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [CommonModule],
})
export class FooterComponent implements OnInit {
  footerData: FooterData | null = null;

  constructor(private navFooterService: NavFooterService) {}

  ngOnInit(): void {
    this.navFooterService.getNavbarLinks().subscribe((response) => {
      this.footerData = response.footer;
    });
  }
}

