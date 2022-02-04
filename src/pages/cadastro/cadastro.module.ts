import { EstadosService } from './../../services/domain/estado.service';
import { CidadeService } from './../../services/domain/cidade.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroPage } from './cadastro';

@NgModule({
  declarations: [
    CadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroPage),
  ],
  providers: [
    CidadeService,
    EstadosService
  ]
})
export class CadastroPageModule {}
