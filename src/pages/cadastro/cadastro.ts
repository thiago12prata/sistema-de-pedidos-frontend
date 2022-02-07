import { ClienteService } from './../../services/domain/cliente.service';
import { CidadeDTO } from './../../models/cidade.dto';
import { EstadosService } from './../../services/domain/estado.service';
import { CidadeService } from './../../services/domain/cidade.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { EstadoDTO } from '../../models/estado.dto';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  formGroup : FormGroup;

  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadosService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {
      this.formGroup = this.formBuilder.group({
        nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
        tipo : ['1', [Validators.required]],
        cpfOuCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha : ['123', [Validators.required]],
        logradouro : ['Rua Via', [Validators.required]],
        numero : ['25', [Validators.required]],
        complemento : ['Apto 3', []],
        bairro : ['Copacabana', []],
        cep : ['10828333', [Validators.required]],
        telefone1 : ['977261827', [Validators.required]],
        telefone2 : ['', []],
        telefone3 : ['', []],
        estadoId : [null, [Validators.required]],
        cidadeId : [null, [Validators.required]]
      });
  }

  ionViewDidLoad(){
    this.estadoService.findAll()
    .subscribe(response => {
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id)
      this.atualizarCidades();
    },
    error => {})
  }

  cadastrarUsuario(){
    this.clienteService.insert(this.formGroup.value)
    .subscribe(response => {
      this.MostrarMsgOk();
    },
    error => {});
  }

  atualizarCidades(){
    let estado_Id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_Id)
    .subscribe(response => {
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    },
    error => {});
  }

  MostrarMsgOk(){
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
