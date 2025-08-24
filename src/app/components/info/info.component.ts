import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InfoData } from '../../services/model/model';
import { InfoService } from '../../services/info.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  imports: [CommonModule]
})
export class InfoComponent implements OnInit {

  infoData!: InfoData; // uso "!" perché sarà popolato dopo
  safeMapUrl!: SafeResourceUrl;

  constructor(
    private infoService: InfoService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    // Recupero i dati dal servizio
    this.infoService.getInfoLinks().subscribe((data: InfoData) => {
      this.infoData = data;
      this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.infoData.mappa.embedUrl);
    });
  }

  // Funzione per aprire WhatsApp
  prenotaWhatsApp() {
    if (this.infoData && this.infoData.whatsApp) {

      // Numero WhatsApp in formato internazionale
      const numero = this.infoData.whatsApp.replace(/\D/g, ''); // rimuove spazi e simboli
      // Link WhatsApp (funziona sia da desktop che da mobile)
      const url = `https://wa.me/${numero}`;

      // Apre la pagina
      window.open(url, '_blank');
    } else {
      console.warn('Numero WhatsApp non disponibile.');
    }
  }

  ordinaGiorni = (a: any, b: any): number => {
  const ordine = [
    "Lunedì", "Martedì", "Mercoledì",
    "Giovedì", "Venerdì", "Sabato", "Domenica"
  ];
  return ordine.indexOf(a.key) - ordine.indexOf(b.key);
}
}


