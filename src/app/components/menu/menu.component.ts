import { Component, HostListener, OnInit } from '@angular/core';
import { CategoriaMenu, MenuData, Piatto } from '../../services/model/model';

import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  imports: [
    CommonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})

export class MenuComponent implements OnInit {
  menuData: CategoriaMenu[] = [];
  isMobile = false;
  selectedCategoria: CategoriaMenu | null = null;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.checkIfMobile();
    this.menuService.getMenu().subscribe((data: MenuData) => {
      this.menuData = data.menu;
    });
  }

  @HostListener('window:resize')
  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleImage(piatto: Piatto) {
    piatto.showImage = !piatto.showImage;
  }

  selectCategoria(categoria: CategoriaMenu) {
    if (this.isMobile) {
      this.selectedCategoria = categoria;
    } else {
      document.getElementById(categoria.categoria)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  goBack() {
    this.selectedCategoria = null;
  }
}
