import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router:Router, private ToastController: ToastController) { }

  // Logar com o Email
  async signIn(email:string, password:string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log("Logou!");
      this.presentToast('Login efetuado com sucesso.');
      this.router.navigate(['/tabs/tab2']);
    }
    catch(error) {
      console.error("Erro ao fazer o login.");
      this.router.navigate(['/erro']);
    }
  }

  // Toast
  async presentToast(message: string) {
    const toast = await this.ToastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  // Logar com o Google
  async signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return await this.afAuth.signInWithPopup(provider);
  }

  // Criar uma conta
  async createSign(email:string, password:string) {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password)
      console.log("Registrou!")
      return true;
    }
    catch(error) {
      console.error("Erro ao criar o usuário.")
      return false;
    }
  }

  // Deslogar
  async signOut() {
    return await this.afAuth.signOut();
  }
}
