import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaIntegrantesPage } from './pagina-integrantes.page';

describe('PaginaIntegrantesPage', () => {
  let component: PaginaIntegrantesPage;
  let fixture: ComponentFixture<PaginaIntegrantesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaginaIntegrantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
