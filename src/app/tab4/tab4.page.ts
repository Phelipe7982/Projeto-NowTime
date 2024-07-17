import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  constructor(private router:Router, private alertController: AlertController) { }

  irPagIntegrantes() {
    console.log('Indo para a página de integrantes...');
    this.router.navigate(['/pagina-integrantes']);
  }

  async mostrarAlert() {
    const alert = await this.alertController.create({
      header: 'Ops!',
      message: 'Parece que a função para este botão ainda não foi criada.',
      buttons: ['Ok'],
    });

    await alert.present();
  }
}
