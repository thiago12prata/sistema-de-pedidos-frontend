import { CarrinhoService } from './../../services/domain/carrinho.service';
import { PedidoDTO } from './../../models/pedido.dto';
import { EnderecoDTO } from './../../models/endereco.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-escolha-end',
  templateUrl: 'escolha-end.html',
})
export class EscolhaEndPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public carrinhoService: CarrinhoService) {
  }

  itens: EnderecoDTO[];

  pedido : PedidoDTO;

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
        this.itens = response['enderecos'];

        let carrinho = this.carrinhoService.getCarrinho();

        this.pedido = {
          cliente: {id: response['id']},
          enderecoEntrega: null,
          pagamento: null,
          itens: carrinho.itens.map(x =>{ return {quantidade: x.quantidade , produto: {id: x.produto.id}}})
        }
      },
      error => {
        if(error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
      });
    }
    else{
      this.navCtrl.setRoot('HomePage');
    }
  }

  nextPage(item: EnderecoDTO){
    this.pedido.enderecoEntrega = {id: item.id};
    this.navCtrl.push('PagamentoPage', { pedido:  this.pedido });
  }
}
