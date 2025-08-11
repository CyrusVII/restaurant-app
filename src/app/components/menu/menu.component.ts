import { Component, HostListener, OnInit } from '@angular/core';
import { CategoriaMenu, MenuData, Piatto } from '../../services/model/model';

import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu', // Nome del componente da usare nell'HTML <app-menu>
  standalone: true, // Dichiarazione come componente standalone
  imports: [
    CommonModule // Importa le direttive Angular base (ngIf, ngFor, ecc.)
  ],
  templateUrl: './menu.component.html', // File HTML associato
  styleUrl: './menu.component.css' // File CSS associato
})
export class MenuComponent implements OnInit {
  
  // Array che conterrà le categorie e i piatti del menu
  menuData: CategoriaMenu[] = [];

  // Flag per capire se siamo su mobile o desktop
  isMobile = false;

  // Salva la categoria selezionata (solo in modalità mobile)
  selectedCategoria: CategoriaMenu | null = null;

  // Iniettiamo il servizio che recupera i dati del menu
  constructor(private menuService: MenuService) { }

  // Metodo chiamato quando il componente viene inizializzato
  ngOnInit() {
    // Verifica subito se siamo su mobile
    this.checkIfMobile();

    // Recupera i dati del menu dal servizio
    this.menuService.getMenu().subscribe((data: MenuData) => {
      this.menuData = data.menu; // Salva i dati nel nostro array
    });
  }

  // Listener sugli eventi di resize della finestra
  // Ogni volta che cambia la larghezza della finestra viene richiamato
  @HostListener('window:resize')
  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768; // Se la larghezza è <= 768px consideriamo "mobile"
  }

  // Mostra/nasconde l'immagine di un piatto quando si clicca sul titolo
  toggleImage(piatto: Piatto) {
    piatto.showImage = !piatto.showImage; // Inverte lo stato di visibilità dell'immagine
  }

  // Gestisce la selezione di una categoria
  selectCategoria(categoria: CategoriaMenu) {
    if (this.isMobile) {
      // Su mobile: mostriamo solo la categoria selezionata
      this.selectedCategoria = categoria;
    } else {
      // Su desktop: facciamo lo scroll fluido fino alla sezione corrispondente
      document.getElementById(categoria.categoria)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Torna alla lista delle categorie (solo su mobile)
  goBack() {
    this.selectedCategoria = null;
    
    // Ritorna ai bottoni delle categorie quando si clicca su "Indietro" dal browser
    if (this.isMobile) {
      window.history.pushState(null, '', window.location.href); // Aggiorna l'URL senza ricaricare la pagina
    }
  }
}

