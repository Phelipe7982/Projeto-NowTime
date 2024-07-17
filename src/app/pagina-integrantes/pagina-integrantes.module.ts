import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaIntegrantesPageRoutingModule } from './pagina-integrantes-routing.module';

import { PaginaIntegrantesPage } from './pagina-integrantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaIntegrantesPageRoutingModule
  ],
  declarations: [PaginaIntegrantesPage]
})
export class PaginaIntegrantesPageModule {}
