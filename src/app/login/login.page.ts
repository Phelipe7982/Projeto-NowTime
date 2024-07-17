import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string='';
  password: string='';

  constructor(private authService: AuthService, private router: Router, private toastController: ToastController) { }

   login() {
    if(this.email == '' || this.password == '' || this.password.length < 6) {
      this.presentToast('Valores inválidos nos campos.');
    } else {
      this.authService.signIn(this.email, this.password);
    }
    }

  async loginWithGoogle() {
    try {
      await this.authService.signInWithGoogle();
      this.router.navigate(['/tabs/tab2']);
      this.presentToast('Login efetuado com sucesso.');
    } catch (error) {
      this.router.navigate(['/erro']);
    }
  }

  irPagCad() {
    this.router.navigate(['/cadastro']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
