import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutoDetalhesPage } from './produto-detalhes';

@NgModule({
  declarations: [
    ProdutoDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutoDetalhesPage),
  ],
})
export class ProdutoDetalhesPageModule {}
