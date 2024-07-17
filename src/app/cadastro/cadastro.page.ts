import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {

  cadForm: FormGroup;

  constructor(
    private router: Router,
    private toastController: ToastController,
    public fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {
    this.cadForm = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(6)]],
      telefone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(8)]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  async cadastrar() {
    const { nome, telefone, email, password } = this.cadForm.value;
    try {
      // Cria o usuário no Firebase Authentication
      const userCredential = await this.firebaseService.createUser(email, password);
      const uid = userCredential.user?.uid;

      if (uid) {
        // Salva dados adicionais no Firestore
        console.log("Cadastrou");
        this.presentToast('Cadastro realizado com sucesso.');
        this.router.navigate(['/login']);
      } else {
        throw new Error('UID não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar os dados: ', error);
      this.presentToast('Erro ao cadastrar os dados.');
      console.log('Erro no bloco try:', error);
    }
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  irPagLogin() {
    this.router.navigate(['/login']);
  }
}
