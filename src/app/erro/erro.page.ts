import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-erro',
  templateUrl: './erro.page.html',
  styleUrls: ['./erro.page.scss'],
})
export class ErroPage {

  constructor(private router:Router) { }

  voltarLogin() {
    this.router.navigate(['/login']);
  }
}
