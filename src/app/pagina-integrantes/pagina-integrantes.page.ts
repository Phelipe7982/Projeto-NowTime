import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-integrantes',
  templateUrl: './pagina-integrantes.page.html',
  styleUrls: ['./pagina-integrantes.page.scss'],
})
export class PaginaIntegrantesPage {
  currentCardIndex: number = 0;

  cards = [
    { title: 'Caio Alexandre', subtitle: 'Integrante 1 do grupo', text: 'Membro do grupo de desenvolvimento do app de notícias denominado até então de "NowTime".' },
    { title: 'Kauã Bonfim', subtitle: 'Integrante 2 do grupo', text: 'Membro do grupo de desenvolvimento do app de notícias denominado até então de "NowTime".' },
    { title: 'Phelipe Alves', subtitle: 'Integrante 3 do grupo', text: 'Membro do grupo de desenvolvimento do app de notícias denominado até então de "NowTime".' }
  ];

  constructor(private router: Router) { }

  voltarTab4() {
    this.router.navigate(['/tabs/tab4']);
  }


  // Navegação entre os Cards de Membros do grupo
  proximoCard() {
    if (this.currentCardIndex < this.cards.length - 1) {
      this.currentCardIndex++;
    }
  }

  anteriorCard() {
    if (this.currentCardIndex > 0) {
      this.currentCardIndex--;
    }
  }
}
