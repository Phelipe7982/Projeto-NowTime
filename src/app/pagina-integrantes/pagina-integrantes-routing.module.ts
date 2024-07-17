import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaIntegrantesPage } from './pagina-integrantes.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaIntegrantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaIntegrantesPageRoutingModule {}
